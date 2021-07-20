// Dependencies get bundled into the worker:
import rnd from 'random-int';
 
// Export as you would in a normal module:
export function meaningOfLife() {
  return 42;
}
 
export class MyClass {
  constructor(value = rnd()) {
    this.value = value;
  }
  increment() {
    this.value++;
    console.log(this.value)
  }
  // Tip: async functions make the interface identical
  async getValue() {
    console.log(this.value)
    return this.value;
  }
}