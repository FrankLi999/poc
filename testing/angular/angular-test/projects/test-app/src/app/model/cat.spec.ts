import { Cat } from "./cat";
import { browser } from "protractor";

describe("unit test template", () => {
  let cat: Cat = null;
  let foo: number = 0;
  beforeAll(function() {
    //called once
    foo = 1;
  });

  beforeEach(() => {
    cat = new Cat();
  });
  it("true is true", () => {
    expect(true).toEqual(true);
  });
  it("The cat name should be Gracie", () => {
    cat.name = "Gracie";
    expect(cat.name).toEqual("Gracie");
  });
  // it("E2E - Title should be correct", () => {
  //   const appUrl = "https://testing-angular-applications.github.io/";
  //   const expectedTitle = "Contacts App Starter";

  //   browser.get(appUrl);
  //   browser.getTitle().then(actualTitle => {
  //     expect(actualTitle).toEqual(expectedTitle);
  //   });
  // });
  afterAll(function() {
    //called once
    foo = 0;
  });
  afterEach(() => {
    cat = null;
  });
});

describe("Matching with finesse", function() {
  describe("jasmine.any", function() {
    it("matches any value", function() {
      expect({}).toEqual(jasmine.any(Object));
      expect(12).toEqual(jasmine.any(Number));
    });

    describe("when used with a spy", function() {
      it("is useful for comparing arguments", function() {
        var foo = jasmine.createSpy("foo");
        foo(12, function() {
          return true;
        });

        expect(foo).toHaveBeenCalledWith(
          jasmine.any(Number),
          jasmine.any(Function)
        );
      });
    });
  });
  describe("jasmine.anything", function() {
    it("matches anything", function() {
      expect(1).toEqual(jasmine.anything());
    });

    describe("when used with a spy", function() {
      it("is useful when the argument can be ignored", function() {
        var foo = jasmine.createSpy("foo");
        foo(12, function() {
          return false;
        });

        expect(foo).toHaveBeenCalledWith(12, jasmine.anything());
      });
    });
  });
  describe("jasmine.objectContaining", function() {
    var foo;

    beforeEach(function() {
      foo = {
        a: 1,
        b: 2,
        bar: "baz"
      };
    });

    it("matches objects with the expect key/value pairs", function() {
      expect(foo).toEqual(
        jasmine.objectContaining({
          bar: "baz"
        })
      );
      expect(foo).not.toEqual(
        jasmine.objectContaining({
          c: 37
        })
      );
    });

    describe("when used with a spy", function() {
      it("is useful for comparing arguments", function() {
        var callback = jasmine.createSpy("callback");

        callback({
          bar: "baz"
        });

        expect(callback).toHaveBeenCalledWith(
          jasmine.objectContaining({
            bar: "baz"
          })
        );
      });
    });
  });
  describe("jasmine.arrayContaining", function() {
    var foo;

    beforeEach(function() {
      foo = [1, 2, 3, 4];
    });

    it("matches arrays with some of the values", function() {
      expect(foo).toEqual(jasmine.arrayContaining([3, 1]));
      expect(foo).not.toEqual(jasmine.arrayContaining([6]));
    });

    describe("when used with a spy", function() {
      it("is useful when comparing arguments", function() {
        var callback = jasmine.createSpy("callback");

        callback([1, 2, 3, 4]);

        expect(callback).toHaveBeenCalledWith(
          jasmine.arrayContaining([4, 2, 3])
        );
        expect(callback).not.toHaveBeenCalledWith(
          jasmine.arrayContaining([5, 2])
        );
      });
    });
  });
  describe("jasmine.stringMatching", function() {
    it("matches as a regexp", function() {
      expect({ foo: "bar" }).toEqual({ foo: jasmine.stringMatching(/^bar$/) });
      expect({ foo: "foobarbaz" }).toEqual({
        foo: jasmine.stringMatching("bar")
      });
    });

    describe("when used with a spy", function() {
      it("is useful for comparing arguments", function() {
        var callback = jasmine.createSpy("callback");

        callback("foobarbaz");

        expect(callback).toHaveBeenCalledWith(jasmine.stringMatching("bar"));
        expect(callback).not.toHaveBeenCalledWith(
          jasmine.stringMatching(/^bar$/)
        );
      });
    });
  });
  describe("custom asymmetry", function() {
    var tester = {
      asymmetricMatch: function(actual) {
        var secondValue = actual.split(",")[1];
        return secondValue === "bar";
      }
    };

    it("dives in deep", function() {
      expect("foo,bar,baz,quux").toEqual(tester);
    });

    describe("when used with a spy", function() {
      it("is useful for comparing arguments", function() {
        var callback = jasmine.createSpy("callback");

        callback("foo,bar,baz");

        expect(callback).toHaveBeenCalledWith(tester);
      });
    });
  });
});

describe("Manually ticking the Jasmine Clock", function() {
  var timerCallback;
  beforeEach(function() {
    timerCallback = jasmine.createSpy("timerCallback");
    jasmine.clock().install();
  });
  afterEach(function() {
    jasmine.clock().uninstall();
  });
  it("causes a timeout to be called synchronously", function() {
    setTimeout(function() {
      timerCallback();
    }, 100);

    expect(timerCallback).not.toHaveBeenCalled();

    jasmine.clock().tick(101);

    expect(timerCallback).toHaveBeenCalled();
  });

  it("causes an interval to be called synchronously", function() {
    setInterval(function() {
      timerCallback();
    }, 100);

    expect(timerCallback).not.toHaveBeenCalled();

    jasmine.clock().tick(101);
    expect(timerCallback.calls.count()).toEqual(1);

    jasmine.clock().tick(50);
    expect(timerCallback.calls.count()).toEqual(1);

    jasmine.clock().tick(50);
    expect(timerCallback.calls.count()).toEqual(2);
  });
  describe("Mocking the Date object", function() {
    it("mocks the Date object and sets it to a given time", function() {
      var baseTime = new Date(2013, 9, 23);
      jasmine.clock().mockDate(baseTime);

      jasmine.clock().tick(50);
      expect(new Date().getTime()).toEqual(baseTime.getTime() + 50);
    });
  });
});
describe("Asynchronous specs", function() {
  var value;
  describe("Using callbacks", function() {
    beforeEach(function(done) {
      setTimeout(function() {
        value = 0;
        done();
      }, 1);
    });
    it("should support async execution of test preparation and expectations", function(done) {
      value++;
      expect(value).toBeGreaterThan(0);
      done();
    });
    describe("A spec using done.fail", function() {
      var foo = function(x, callBack1, callBack2) {
        if (x) {
          setTimeout(callBack1, 0);
        } else {
          setTimeout(callBack2, 0);
        }
      };

      it("should not call the second callBack", function(done) {
        foo(true, done, function() {
          done.fail("Second callback has been called");
        });
      });
    });
  });
  describe("Using promises", function() {
    if (!browserHasPromises()) {
      return;
    }
    beforeEach(function() {
      return soon().then(function() {
        value = 0;
      });
    });
    it("should support async execution of test preparation and expectations", function() {
      return soon().then(function() {
        value++;
        expect(value).toBeGreaterThan(0);
      });
    });
  });
  describe("Using async/await", function() {
    if (!browserHasAsyncAwaitSupport()) {
      return;
    }
    beforeEach(async function() {
      await soon();
      value = 0;
    });
    it("should support async execution of test preparation and expectations", async function() {
      await soon();
      value++;
      expect(value).toBeGreaterThan(0);
    });
  });
  describe("long asynchronous specs", function() {
    beforeEach(function(done) {
      done();
    }, 1000);

    it("takes a long time", function(done) {
      setTimeout(function() {
        done();
      }, 9000);
    }, 10000);

    afterEach(function(done) {
      done();
    }, 1000);
  });

  function soon() {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve();
      }, 1);
    });
  }

  function browserHasPromises() {
    return typeof Promise !== "undefined";
  }

  // function getAsyncCtor() {
  //   try {
  //     eval("var func = async function(){};");
  //   } catch (e) {
  //     return null;
  //   }

  //   return Object.getPrototypeOf(func).constructor;
  // }

  function browserHasAsyncAwaitSupport() {
    // return getAsyncCtor() !== null;
    let isAsyncAwaitSupported = false;
    try {
      isAsyncAwaitSupported = eval(
        `typeof Object.getPrototypeOf(async function() {}).constructor === 'function'`
      );
    } catch (exception) {
      isAsyncAwaitSupported = false;
    }
    return isAsyncAwaitSupported;
  }
});
