"use strict";
// Init dinosaur class
module.exports = class Dinosaur {
    constructor(name, legLength, strideLength, diet, stance){
        this.name = name;
        this.legLength = legLength;
        this.strideLength = strideLength;
        this.diet = diet;
        this.stance = stance;
    }
    get speed() {
        return this.calculateSpeed();
      }
    calculateSpeed(){
        return ((this.strideLength / this.legLength) - 1) * Math.sqrt(this.legLength * 9.81)
    }
}
