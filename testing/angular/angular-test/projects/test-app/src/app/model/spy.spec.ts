describe("A spy", function() {
  var foo,
    bar = null;

  beforeEach(function() {
    foo = {
      setBar: function(value) {
        bar = value;
      }
    };
    spyOn(foo, "setBar");

    foo.setBar(123);
    foo.setBar(456, "another param");
  });
  it("tracks that the spy was called", function() {
    expect(foo.setBar).toHaveBeenCalled();
  });
  it("tracks that the spy was called x times", function() {
    expect(foo.setBar).toHaveBeenCalledTimes(2);
  });
  it("tracks all the arguments of its calls", function() {
    expect(foo.setBar).toHaveBeenCalledWith(123);
    expect(foo.setBar).toHaveBeenCalledWith(456, "another param");
  });

  it("stops all execution on a function", function() {
    expect(bar).toBeNull();
  });
  it("tracks if it was called at all", function() {
    foo.setBar();
    expect(foo.setBar.calls.any()).toEqual(true);
  });
});
describe("Multiple spies, when created manually", function () {
  var tape;

  beforeEach(function () {
    tape = jasmine.createSpyObj('tape', ['play', 'pause', 'stop', 'rewind']);

    tape.play();
    tape.pause();
    tape.rewind(0);
  });

  it("creates spies for each requested function", function () {
    expect(tape.play).toBeDefined();
    expect(tape.pause).toBeDefined();
    expect(tape.stop).toBeDefined();
    expect(tape.rewind).toBeDefined();
  });
});

describe("A spy, when created manually", function () {
  var whatAmI;

  beforeEach(function () {
    whatAmI = jasmine.createSpy('whatAmI');

    whatAmI("I", "am", "a", "spy");
  });

  it("tracks that the spy was called", function () {
    expect(whatAmI).toHaveBeenCalled();
  });
});
