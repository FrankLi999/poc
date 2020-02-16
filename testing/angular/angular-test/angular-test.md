## Testing tools and frameworks

    Karma
    Protractor
    Jasmine
    Mocha
    QUnit
    Selenium
    PhantomJS

run test:

> ng test <project> --codeCoverage=true|false

## Jasmine

https://jasmine.github.io/
beforeEach, afterEach, beforeAll, beforeEach, it, describe, and matcher functions

> describe: group of tests - test suite that takes a string and a callback function.

     describe can nested.

> it: function to create a test that take a string and a callback function.
> expect/matcher: expect(value).toBe, toContain(), toThrow(), toEqual(), toBeTrue,

       toThrow(), toThrowMatch()
       toBeNull(), toBeNull(), toBeDefined(), toBeFalse(), toBeGreaterThan(),
       toMatch('another string or regexp')
       toBeGreaterThanOrEqual(), toBeInstanceOf(), expect(spy).toHaveBeenCalled(),

       expect(spy1).toHaveBeenCalledBefore(spy2)
       expect(spy).toHaveBeenCalledWith()
       export(domElement).toHaveClass('bar')
       expect(value).not.toBe(),...
       export().nothing()
       export().withContext(msg).

> this keyword
> Another way to share variables between a beforeEach, it, and afterEach is through the this keyword.

add custom matcher:
beforeEach(function() {
jasmine.addMatchers(customMatchers);
});

> fail('msg')
> xdescribe() -- diable the test
> xit -- pending spec

> spies

A spy only exists in the describe or it block in which it is defined, and will be removed after each spec. There
are special matchers for interacting with spies.

> jamine.any, jamine.anything, jasmine.objectContainer, jasmine.arrayContainer, jasmine.stringMatch, Custom asymmetric equality tester

jasmine.any takes a constructor or "class" name as an expected value.It returns true if the constructor matches
the constructor of the actual value.

jamine.anything: return true if not null or undefined.

> jasmine.clock().install/jasmine.clock().uninstall/jasmine.clock().tick: test time dependent code

> Asynchronous Support Using callbacks

Calls to beforeAll, afterAll, beforeEach, afterEach, and it can take an optional single argument that should be called when the async work is complete.
This spec will not start until the done function is called in the call to beforeEach above. And this spec will not complete until its done is called.
The done.fail function fails the spec and indicates that it has completed.

> Asynchronous Support Using Ppromise

Functions passed to beforeAll, afterAll, beforeEach, afterEach, and it can return a promise that should be resolved when the async work is complete. If the promise is rejected, all specs in the enclosing describe will fail.
This spec will not start until the promise returned from the call to beforeEach above is settled. And this spec will not complete until the promise that it returns is settled. If the promise is rejected, the spec will fail.

> Asynchronous Support Using async/wait

## unit tests for components, directives, pipes, services, routing, rxjs, ngrx

use TestBed to set up the test such as creareComponent fixture
ComponentFixture - resolve component instance
fakeAsync — Using fakeAsync ensure that all asynchronous tasks are completed before executing the assertions.
by- all, css, directive
import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';

### components,

TestBed, ComponentFixture, and fakeAsync

component.saveContact(contact);
fixture.detectChanges();
const nameInput = rootElement.query(By.css(".contact-name"));
tick();
expect(nameInput.nativeElement.value).toBe("lorace");

### directives,

directives modify elements it attached to.
both directives and components allow you to add behavior to the HTML in your application.

three types of directives:
o Components: create a view with template, visible on the browser.
o Structural directives: add or remove elements from the DOM—to change the structure of the page.

The asterisk transforms the element the directive is attached to into a template. The directive then
controls how that template is rendered to the DOM, which is how it can alter the structure of the page.
o Attribute directives: change the appearance of a DOM element.

### pipes,

create the pipe object and test the transform method

### services

Create a stub, which is a barebones class that defines its properties and methods but doesn’t contain any logic. Becasue Angular uses tokens for resolving dependencies and TypeScript interfaces don’t get translated into JavaScript, so there’s no way for Angular to resolve the token. To tell Angular what to inject, you’ll need to create a class that fills in like it’s an interface. For more on this issue, see the Angular documentation, https://angular.io/guide/dependency-injection#typescript-interfaces-arent-valid-tokens.

### routing

Testing router navigation with RouterTestingModule. This module intercepts navigation attempts and allows you to check their parameters.

# RxJS - marble test

During the tests, the sense of time (when values are emitted) is handle by the RxJS TestScheduler

> - (dash): simulate the passage of time, one dash correspond to a frame which can be perceived as 10ms in our tests, —--- is 40 ms
>   a-z (a to z): represent an emission, -a--b---c stands for “emit a at 20ms, b at 50ms, c at 90ms”
>   | (pipe): emit a completed (end of the stream), ---a-| stands for emit ‘a’ at 40ms then complete (60ms)
>   \# (pound sign): indicate an error (end of the stream), —--a--# emit a at 40ms then an error at 70ms
>   ( ) (parenthesis): multiple values together in the same unit of time, —--(ab|) stands for emit a b at 40ms then complete (40ms)
>   ^ (caret): indicate a subscription point, —^-- subscription starting at ^
>   ! (exclamation point): indicate the end of a subscription point, —^--! subscription starting at ^ and ending at !

'-' or '------': Equivalent to Observable.never(), or an observable that never emits or completes

|: Equivalent to Observable.empty()

#: Equivalent to Observable.throw()

https://stackblitz.com/edit/jasmine-marbles-testing?embed=1&file=src/operators.spec.ts&hideExplorer=1
npm install --save-dev jasmine-marbles
cold: Subscription starts when test begins:
cold(--a--b--|, { a: 'Hello', b: 'World' })
hot: Behaves like subscription starts at point of caret:
hot(--^--a--b--|, { a: 'Hello', b: 'World' })
flush:
expectObservable: used to assert that an Observable meets a marble diagram.
expectSubscription(): used to assert that an Observable has the expected subscriptions.
Without third party lib, via Rx’s TestScheduler and RunHelpers.
Runhelper interface:

## End to end test - Protractor, timeouts,

### Protractor - Run chrome in headless mode with

https://github.com/angular/protractor/blob/master/docs/browser-setup.md
To start Chrome in headless mode, start Chrome with the --headless flag.

As of Chrome 58 you also need to set --disable-gpu, though this may change in future versions.
Also, changing the window size during a test will not work in headless mode, but you can set it on
the commandline like this --window-size=800,600.

capabilities: {
browserName: 'chrome',

chromeOptions: {
args: [ "--headless", "--disable-gpu", "--window-size=800,600" ]
}
}

### Protractor

npm run e2e protractor-first-test.conf.js
One potential cause of flakiness is having a test read the DOM of a page while Angular is in the middle of updating it.
You could avoid this issue by adding sleep commands after every step in your tests that might cause Angular to update the page, but that would slow down your test runs, and it’s not guaranteed to work. Protractor takes a more efficient route and syncs your tests with Angular to help prevent flaky test failures.

o browser.waitForAngularEnabled(true);
o Waiting with ExpectedConditions

let EC = browser.ExpectedConditions;
browser.wait(EC.visibilityOf(\$('.popup-title')), 2000, 'Wait for popup title to be visible.');

let EC = browser.ExpectedConditions;
let titleCondition = EC.and(EC.titleContains('foo'), EC.not(EC.titleContains('bar'));
browser.wait(titleCondition, 5000, 'Waiting for title to contain foo and not bar');

EC. alertIsPresent, elementToBeClickable, textToBePresentInElement, textToBePresentInElementValue (value attr),
titleContains, titleIs, urlContains, urlIs, presenceOf, stalenessOf, visibilityOf, invisibilityOf, elementToBeSelected

it('should be able to login', () => {

let EC = browser.ExpectedConditions;
browser.waitForAngularEnabled(false);
browser.get('/assets/login.html');
element(by.css('input.user')).sendKeys('username');
element(by.css('input.password')).sendKeys('password');
element(by.id('login')).click();

const list = element(by.css('app-contact-list'));
const listReady = EC.not(
EC.textToBePresentInElement(list, 'Loading contacts')); ①
browser.wait(listReady, 5000, 'Wait for list to load'); ②
expect(list.getText()).toContain('Jeff Pipe');

});
// ------------------------------
describe('feed dialog', () => {
let EC;

beforeEach(() => {
browser.get('/contact/4');
EC = browser.ExpectedConditions;
});

it('should open the dialog with expected conditions', () => {
browser.waitForAngularEnabled(false);

    let feedButton = element(by.css('button.feed-button'));
    browser.wait(EC.elementToBeClickable(feedButton),
      3000, 'waiting for feed button to be clickable');    ①
    feedButton.click();

    let dialogTitle = element(
      by.css('app-contact-feed h2.mat-dialog-title'))
    browser.wait(EC.visibilityOf(dialogTitle),
      1000, 'waiting for the dialog title to appear');    ②
    expect(dialogTitle.getText())
      .toContain('Latest posts from Craig Service');

    let closeButton = element(by.css('button[mat-dialog-close]'))
    closeButton.click();
    browser.wait(EC.stalenessOf(dialogTitle),
      3000, 'wait for dialog to close');    ③
    expect(dialogTitle.isPresent()).toBeFalsy();

});
});

---

When you enable waitForAngular, Protractor will cause all of your WebDriver commands to wait
until there are no more tasks pending in the Angular zone.

if there is code pollForever() in Angular Zone, then Protractor would wait forever.
If you want to avoid this fate of waiting forever, you can move that code inside a call to NgZone.runOutsideAngular()

---

ngOnInit() {
this.closeDisabled = false;

this.zone.runOutsideAngular(() => {
this.sub = this.feed.getFeed().subscribe((x) => {
this.zone.run(() => {
this.updates.push(x);
if (this.updates.length > 4) {
this.updates.shift();
}
});
});
});
}

    ngOnDestroy() {
      this.sub.unsubscribe();
    }

### rxjs

### ngrx

## Integration

browsers: ['ChromeHeadless'],
autoWatch: false,
singleRun: true
