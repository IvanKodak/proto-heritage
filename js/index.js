"use strict";

function MyArray() {
  this.length = 0;

  this.push(...arguments);

  this.isMyArray = function isMyArray(obj) {
    return obj instanceof MyArray ? true : false;
  };
}

function MyArrayProto() {
  this.push = function push() {
    for (let i = 0; i < arguments.length; i++) {
      this[this.length++] = arguments[i];
    }

    return this.length;
  };

  this.unshift = function unshift() {
    const length = this.length;
    const oldArray = new MyArray();

    for (let i = 0; i < this.length; i++) {
      oldArray.push(this[i]);
    }

    for (let i = 0; i < length; i++) {
      this.pop();
    }

    this.push(...arguments);

    for (let i = 0; i < oldArray.length; i++) {
      this[this.length++] = oldArray[i];
    }

    return this.length;
  };

  this.concat = function concat(arr) {
    const concatArray = this;

    for (let i = 0; i < arr.length; i++) {
      concatArray[this.length++] = arr[i];
    }

    return concatArray;
  };

  this.pop = function pop() {
    if (this.length >= 0) {
      const lastItem = this[this.length - 1];
      delete this[this.length - 1];
      this.length--;

      return lastItem;
    }
  };

  this.shift = function shift() {
    if (this.length >= 0) {
      const firstItem = this[0];
      delete this[0];
      this.length--;

      return firstItem;
    }
  };
}

MyArray.prototype = new MyArrayProto();

const myArr = new MyArray(4, 12, 78);
const myArr2 = new MyArray(1, 1, 1);
//console.log(myArr2);
myArr2.unshift(1, 2, 3);
myArr2.shift();
console.log(myArr2);
