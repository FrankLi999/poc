# Protractor API
http://angular.github.io/protractor/#/api

Note: Most commands return promises, so you only resolve their values through using jasmine expect API or using .then(function()) structure

Based on this post: https://spagettikoodi.wordpress.com/2015/01/14/angular-testing-cheat-sheet/ by @crystoll

#### Control browser
```javascript
browser.get('yoururl'); // Load address, can also use '#yourpage'

browser.navigate().back();

browser.navigate().forward();

browser.sleep(10000); // if your test is outrunning the browser

browser.waitForAngular(); // if your test is outrunning the browser

browser.getLocationAbsUrl() // get the current address

browser.ignoreSynchronization = true; // If true, Protractor will not attempt to synchronize with the page before performing actions

   
```

Here's a trick how to wait for something to become present/visible:

```javascript

browser.wait(function() {
   return element(by.id('create')).isPresent();
}, 5000);
   
element(by.id('create')).click();
```

#### Check visibility 

```javascript
element(by.id('create')).isPresent() // Be careful with this: element is often present while it's not displayed...

element(by.id('create')).isEnabled() //Enabled/disabled, as in ng-disabled...

element(by.id('create')).isDisplayed() //Is element currently visible/displayed?
```

#### Find an element by id, model, binding, ...

```javascript
element(by.id('user_name'))

element(by.css('#myItem'))

element(by.model('person.name')) // refers to ng-model directive

element(by.binding('person.concatName')); // refers to ng-bind directive

element(by.textarea('person.extraDetails'));

element (by.input( 'username' ));

element (by.input( 'username' )).clear();

element(by.buttonText('Save'));

element(by.partialButtonText('Save'));

element(by.linkText('Save'));

element(by.partialLinkText('Save'));

element(by.css('[ng-click="cancel()"]')); 

var dog = element(by.cssContainingText('.pet', 'Dog'));

var allOptions = element.all(by.options('c c in colors')); //When ng-options is used with selectbox
```

#### Find collection of elements by css, repeater, xpath..

```javascript
var list = element.all(by.css('.items));

var list2 = element.all(by.repeater('personhome.results'));

var list3 = element.all(by.xpath('//div

expect(list.count()).toBe(3);

expect(list.get(0).getText()).toBe('First’)

expect(list.get(1).getText()).toBe('Second’)

expect(list.first().getText()).toBe('First’)

expect(list.last().getText()).toBe('Last’)
```

#### Send keystrokes, clear

```javascript
element(by.id('user_name').sendKeys("user1");

sendKeys(protractor.Key.ENTER);

sendKeys(protractor.Key.TAB);

element(by.id('user_name')).clear()
```

#### Position and size, also how to deal with promises:

```javascript
element(by.id('item1')).getLocation().then(function(location) {
  var x = location.x;
  var y = location.y;
});

element(by.id('item1')).getSize().then(function(size) {
  var width = size.width;
  var height = size.height;
});
```

#### Jasmine Matchers

```javascript
to(N­ot)­Be( null | true | false )
to(N­ot)­Equ­al( value )
to(N­ot)­Mat­ch( regex | string )
toBe­Def­ine­d()
toBe­Und­efi­ned()
toBe­Nul­l()
toBe­Tru­thy()
toBe­Fal­sy()
to(N­ot)­Con­tain( string )
toBe­Les­sTh­an( number )
toBe­Gre­ate­rTh­an( number )
toBe­NaN()
toBe­Clo­seTo( number, precision )
toTh­row()
```
