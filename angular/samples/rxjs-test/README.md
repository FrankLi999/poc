# RxjsTest

describe('Adding numbers', function () {
  it('Should add numbers together', function () {

    const adder = (total, delta) => total + delta;

    Rx.Observable.from([1, 2, 3, 4, 5, 6, 7, 8, 9])
      .reduce(adder)
      .subscribe(total => {
          expect(total).to.equal(45);
      });
   });
});

It’s clear that testing synchronous observables is as simple as testing regular pure functions. —you expect cold observables to behave like this.

it('Should add numbers together with delay', function () {
     Rx.Observable.from([1, 2, 3, 4, 5, 6, 7, 8, 9])
        .reduce((total, delta) => total + delta)
        .delay(1000)
        .subscribe(total => {
            expect(total).to.equal(45);
        });
});

For the test above, the delay operator introduces something into the test mixture that isn’t properly handled by the test. Because you’ve added an asynchronous time element that isn’t being handled by the test, the test reports completion before the asynchronous block has completed running and you get a false positive. 

it('Should add numbers together with delay', function (done) {
     Rx.Observable.from([1, 2, 3, 4, 5, 6, 7, 8, 9])
        .reduce((total, delta) => total + delta)
        .delay(1000)
        .subscribe(total => {
           expect(total).to.equal(45);
         }, null, done); 
});


it('Should fetch Wikipedia pages for search term "reactive programming" +
   `using an observable + promise', function (done) {                     

   const searchTerm = 'reactive+programming';
   const url = `https://en.wikipedia.org/w/api.php?action=query& +
               `format=json&list=search&utf8=1&srsearch=${searchTerm}`;

   const testFn = query => Rx.Observable.fromPromise(ajax(query))         
      .subscribe(data => {
            expect(data).to.have.property('query')
              .with.property('search')
              .with.length(10);
           }, null, done);                                               
   testFn(url);                                                           
});

it’s important to separate the observer from the pipeline and the subscription. Decoupling these main parts will allow you to inject any assertions that you need to make, depending on the stream under test. The goal is to not have to modify or rebuild the observable sequence in the application as well as in the unit test and have code duplicated in both areas.

you’ll split up your functions so that they can be tested independently from the stream, as well as decompose the stream into its three main parts: producer, pipeline, and consumer. This will allow you to separate the pure (testable) part of the stream from the impure. 

The impure sections involve writing to a database, making actual AJAX calls, or writing to the DOM, all of which should be outside of your scope of test.

Rx.Observable.interval(1000)
    .take(10)
    .filter(num => num % 2 === 0)
    .map(num => num * num)
    .reduce((total, delta) => total + delta)
    .subscribe(console.log);
In order to make this program testable you need to do a few things:

Split out the business logic from the observable pipeline.
Decouple the consumer and producer and isolate the stream pipeline. This will allow you to inject your assertion code.
Wrap the stream into a function that you can call with the proper observer.

By applying these steps to the previous code, this program becomes a more generic set of functions that you can test thoroughly:

const isEven = num => num % 2 === 0;
const square = num => num * num;
const add = (a, b) => a + b;

const runInterval = (source$) =>  //  Separates producer (source) and                                           // subscriber from the business logic by making an argument   
  source$
     .take(10)
     .filter(isEven)
     .map(square)
     .reduce(add);

it('Should square and add even numbers', function (done) {
     this.timeout(20000);                                    1
     runInterval(Rx.Observable.interval(1000))
       .subscribe({
         next: total => expect(total).to.equal(120),         
         err:  err   => assert.fail(err.message),
         complete: done
    });
});

So, separate the producer, pipeline and subscriber.

========================================

Scheduling values in RxJS
If you’re dealing with observable sequences that publish values over an extended period of time, unit testing them can be time consuming. 

 In RxJS, time is internally managed using an artifact called a scheduler.This abstraction allows work to run immediately or in the future without the calling code being aware of it. Remember that RxJS is used to abstract the notion of time? At the heart of all this is a scheduler.

 Generally speaking, a scheduler consists of three main parts:

A data structure that stores all the actions queued to be executed.
An execution context that knows where the action will be executed: timer, interval, immediately, callback, a different thread (for server-side Rx frameworks), and so on.
A virtual clock that provides a notion of time for itself. This point will become very important for testing.

RxJS has different types of schedulers, but all abide by the same interface:

interface Scheduler {
  now(): number;                           
  schedule(work, delay?, state?): Subscription;      
  flush(): void;     
  active: boolean;   
  actions: Action[]; 
  scheduledId: number;
}

it('Emits values on an asynchronous scheduler', function (done) {
      let temp = [];
      Rx.Observable.range(1, 5, Rx.Scheduler.async)              1
         .do([].push.bind(temp))
         .subscribe(value => {
            expect(temp).to.have.length(value);                  2
            expect(temp).to.contain(value);
         }, done, done);                                         3
    });

    Notice that, because it’s asynchronous, you need to use the done() resolution callback to let Mocha know to wait for all values to be emitted. 

 You can use the Rx.TestScheduler class, which is derived from VirtualTimeScheduler. This almighty artifact can actually create time!

    it('Create time from a marble diagram', function () {
        let scheduler = new Rx.TestScheduler();
        let time = scheduler.createTime('-----|');                1
        expect(time).to.equal(50);                                2
        });
1 An empty marble diagram with five time frames
2 Each time frame counts as 10 units of time (usually milliseconds), so 5 units amounts to 50.

In Rx parlance, you use marble diagrams to communicate how a particular operator works with respect to time. Every event that’s pushed onto the stream is internally wrapped using a Notification object, which transports all of the necessary metadata for a particular event. They’re more useful as testing artifacts because they make it easier to represent events that you can extend to add more behavior, such as timestamps or numerical ordering, that you’d want to assert.

it('Should parse a marble string into a series of notifications',
   function () {
      let result = Rx.TestScheduler.parseMarbles(
        '--a---b---|',                                                  1
         { a: 'A', b: 'B' });                                           2
      expect(result).deep.equal([
         { frame: 20, notification: Rx.Notification.createNext('A') },
         { frame: 60, notification: Rx.Notification.createNext('B') },
         { frame: 100, notification: Rx.Notification.createComplete() }
      ]);
});


Testing the map() operator
function square(x) {
  return x * x;
}

function assertDeepEqual(actual, expected) {                            1
  expect(actual).to.deep.equal(expected);
}

  describe('Map operator', function () {
      it('Should map multiple values', function () {
          let scheduler = new Rx.TestScheduler(assertDeepEqual);        2

          let source = scheduler.createColdObservable(                  3
                '--1--2--3--4--5--6--7--8--9--|');

          let expected = '--a--b--c--d--e--f--g--h--i--|';              4

          let r = source.map(square);                                   5

          scheduler.expectObservable(r).toBe(expected,                  6
                 { 'a': 1, 'b': 4, 'c': 9, 'd': 16, 'e': 25,
                   'f': 36, 'g':49, 'h': 64, 'i': 81});

          scheduler.flush();                                            7
    });
});


Marbels:

hot(marbles: string, values?: object, error?: any):  creates a "hot"    
    observable (a subject) that will behave as though it's already "running" when the test begins.

cold(marbles: string, values?: object, error?: any) - creates a "cold"  
    observable whose subscription starts when the test begins.   

 expectObservable(actual: Observable<T>).toBe(marbles: string, values?: 
    object, error?: any) - schedules an assertion for when the TestScheduler flushes. The TestScheduler will automatically flush at the end of your jasmine it block.   

expectSubscriptions(actualSubscriptionLogs: SubscriptionLog[]).toBe
    (subscriptionMarbles: string) - like expectObservable schedules an assertion for when the testScheduler flushes. Both cold() and hot() return an observable with a property subscriptions of type SubscriptionLog[]. Give subscriptions as parameter to expectSubscriptions to assert whether it matches the subscriptionsMarbles marble diagram given in toBe(). Subscription marble diagrams are slightly different than Observable marble diagrams. 


    it('Should square and add even numbers', function () {
        let scheduler = new Rx.TestScheduler(assertDeepEqual);

        let source = scheduler.createColdObservable(                     1
            '-1-2-3-4-5-6-7-8-9-|');

        let expected = '-------------------(s-|';                        2

        let r = runInterval(source);

        scheduler.expectObservable(r).toBe(expected, {'s': 120});        3

        scheduler.flush();
    });

    Just like before, refactoring your stream into a function changes the stream from the hardcoded

    const search$ = Rx.Observable.fromEvent(inputText, 'keyup')
        .pluck('target','value')
        .debounceTime(500)
        .filter(notEmpty)
        .do(term => console.log(`Searching with term ${term}`))
        .map(query => URL + query)
        .switchMap(query =>
            Rx.Observable.fromPromise(ajax(query)).pluck('query',
                'search').defaultIfEmpty([]))
        .subscribe(arr => {
            count.innerHTML = `${result.length} results`;
            if(arr.length === 0) {
            clearResults(results);
            }
            else {
            appendResults(results, arr);
            }
    });

    refactory it to:

    const search$ = (source$, fetchResult$, url = '', scheduler = null) =>
    source$
      .debounceTime(500, scheduler)
      .filter(notEmpty)
      .do(term => console.log(`Searching with term ${term}`))
      .map(query => url + query)
      .switchMap(fetchResult$);

    This way of encapsulating an observable sequence into its own function is known as an epic.

    search$(
    Rx.Observable.fromEvent(inputText, 'keyup')
      .pluck('target','value'),

    query =>
      Rx.Observable.fromPromise(ajax(query))
      .pluck('query', 'search')
      .defaultIfEmpty([])

    ).subscribe(arr => {
        if(arr.length === 0) {
            clearResults(results);
        } else {
            appendResults(results, arr);
        }
    });

This second version doesn’t look as fluent as the original, but it’s now a lot easier to test

    function frames(n = 1, unit = '-') {                            1
        return (n === 1) ? unit :
        unit + frames(n - 1, unit);
    }

    describe('Search component', function () {
        const results_1 = [                                         2
        'rxmarbles.com',
        'https://www.manning.com/books/rxjs-in-action'
        ];

        const results_2 =                                           3
            ['https://www.manning.com/books/rxjs-in-action'
        ];

        const searchFn = term => {                                  4
        let r = [];
        if(term.toLowerCase() === 'rx') {
            r = results_1;
        }
        else if (term.toLowerCase() === 'rxjs') {
            r =  results_2;
        }
        return Rx.Observable.of(r);
        };

        it('Should test the search stream with debouncing', function () {
        let searchTerms = {                                       5
            a: 'r',
            b: 'rx',
            c: 'rxjs',
        };

        let scheduler = new Rx.TestScheduler(assertDeepEqual);
        let source = scheduler.createHotObservable(
                '-(ab)-' + frames(50) +'-c|', searchTerms);          6

        let r = search$(source, searchFn, '', scheduler);         7

            let expected = frames(50) + '-f------(s|)';

            scheduler.expectObservable(r).toBe(expected,             8
            {
                'f': results_1,
                's': results_2
            });

            scheduler.flush();
        });
    });
========================================================
    Marble Syntax:

"-" time: 10 "frames" of time passage.
"|" complete
"#" error
"a" any character:
"()" sync groupings:
"^" subscription point

'-' or '------': Equivalent to Observable.never(), or an observable that never emits or completes

|: Equivalent to Observable.empty()

#: Equivalent to Observable.throw()

'-a-^-b--|: In a hot observable, on frame -20 emit a, then on frame 20 emit b, and on frame 50, complete.

'--(abc)-|': on frame 20, emit a, b, and c, then on frame 80 complete

'-----(a|)': on frame 50, emit a and complete.

Subscription Marble Syntax:
"-" time: 10 "frames" of the passage.
"^" subscription point: shows the point in time at which a subscription happen.
"!" unsubscription point: shows the point in time at which a subscription is unsubscribed.

'-' or '------': no subscription ever happened.

'--^--': a subscription happened after 20 "frames" of time passed, and the subscription was not unsubscribed.

'--^--!-: on frame 20 a subscription happened, and on frame 50 was unsubscribed.

A basic test might look as follows:

var e1 = hot('----a--^--b-------c--|');
var e2 = hot(  '---d-^--e---------f-----|');
var expected =      '---(be)----c-f-----|';

expectObservable(e1.merge(e2)).toBe(expected);
The ^ characters of hot observables should always be aligned.
The first character of cold observables or expected observables should always be aligned with each other, and with the ^ of hot observables.
Use default emission values when you can. Specify values when you have to.


var values = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  x: 1 + 3, // a + c
  y: 2 + 4, // b + d
}
var e1 =    hot('---a---b---|', values);
var e2 =    hot('-----c---d---|', values);
var expected =  '-----x---y---|';

expectObservable(e1.zip(e2, function(x, y) { return x + y; }))
  .toBe(expected, values);

A test example with subscription assertions:

var x = cold(        '--a---b---c--|');
var xsubs =    '------^-------!';
var y = cold(                '---d--e---f---|');
var ysubs =    '--------------^-------------!';
var e1 = hot(  '------x-------y------|', { x: x, y: y });
var expected = '--------a---b----d--e---f---|';

expectObservable(e1.switch()).toBe(expected);
expectSubscriptions(x.subscriptions).toBe(xsubs);
expectSubscriptions(y.subscriptions).toBe(ysubs);
Align the start of xsubs and ysubs diagrams with expected diagram.
Notice how the x cold observable is unsubscribed at the same time e1 emits y.


