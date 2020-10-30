class A {
  public static type: string = 'A';

  public type(): string {
    return type;
  }
  // public log(): string {
  //   console.log(this.type);
  // }
}

class B extends A {
  public static type: string = 'B';
}

class C extends A {
  public static type: string = 'C';
}

let b = new B();
console.log(b.type()); // => 'B'

let c = new C();
console.log(c.type()); // => 'C'

let a1: A = new B();
console.log(a1.type()); // => 'C'

let a2: A = new C();
console.log(a2.type()); // => 'C'
