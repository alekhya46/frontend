"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Animal = void 0;
var Animal = /** @class */ (function () {
    function Animal(theName) {
        this.fName = 'dinosaur';
        this.fName = theName;
    }
    Animal.prototype.walk = function (distance) {
        console.log("the ".concat(this.fName, " will walk ").concat(distance, " meters"));
    };
    return Animal;
}());
exports.Animal = Animal;
;
var obj = new Animal('lion');
obj.walk(200);
var Human = /** @class */ (function (_super) {
    __extends(Human, _super);
    function Human(theName) {
        return _super.call(this, theName) || this;
    }
    return Human;
}(Animal));
;
var obj1 = new Human('cat');
obj1.walk(20);
