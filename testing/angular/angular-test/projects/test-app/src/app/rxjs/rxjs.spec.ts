import { TestScheduler } from "rxjs/testing";
import { Observable } from "rxjs";
import { map, filter, throttleTime } from "rxjs/operators";

describe("RxJS testing with TestCheduler", () => {
  let testScheduler: TestScheduler;
  beforeEach(() => {
    testScheduler = new TestScheduler((expected, actual) => {
      expect(actual).toEqual(expected);
      //expect(actual).deep.equal(expected);
    });
  });
  const evenTimesTen = (source$: Observable<number>): Observable<number> => {
    return source$.pipe(
      filter(n => n % 2 == 0),
      map(n => n * 10)
    );
  };

  it("Even times 10", () => {
    testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
      const values = {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
        e: 5,
        f: 6,
        g: 7,
        h: 8,
        i: 9,
        j: 10
      };
      const source$ = cold("-a-b-c-d-e-f-g-h-i-j|", values);
      const expectedMarble = "---a---b---c---d---e|";
      const subs = "^-------------------!";
      const expectedValues = {
        a: 20,
        b: 40,
        c: 60,
        d: 80,
        e: 100
      };
      const result$ = evenTimesTen(source$);
      expectObservable(result$).toBe(expectedMarble, expectedValues);
      expectSubscriptions(source$.subscriptions).toBe(subs);
    });
  });

  // This test runs synchronously.
  it("generates the stream correctly", () => {
    testScheduler.run(helpers => {
      const { cold, expectObservable, expectSubscriptions } = helpers;
      const e1 = cold("-a--b--c---|");
      const subs = "^----------!";
      const expected = "-a-----c---|";

      expectObservable(e1.pipe(throttleTime(3, testScheduler))).toBe(expected);
      expectSubscriptions(e1.subscriptions).toBe(subs);
    });
  });
  it('should multiply by "2" each value emitted', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const values = {
        a: 1,
        b: 2,
        c: 3
      };
      const source = cold("-a-b-c-|", values);
      const expectedMarble = "-a-b-c-|";
      const expectedValue = {
        a: 2,
        b: 4,
        c: 6
      };
      const result = source.pipe(map(x => x * 2));
      expectObservable(result).toBe(expectedMarble, expectedValue);
    });
  });
  it('should multiply by "10" each value emitted', () => {
    testScheduler.run(helper => {
      const values = {
        a: 1,
        b: 2,
        c: 3
      };
      const source = helper.cold("-a-b-c-|", values);
      const result = source.pipe(map(x => x * 10));
      const expectedMarble = "-a-b-c-|";
      const expectedValue = {
        a: 10,
        b: 20,
        c: 30
      };
      helper.expectObservable(result).toBe(expectedMarble, expectedValue);
    });
  });
});
