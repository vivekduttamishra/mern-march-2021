"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Array.prototype.intersect = function (other) {
    return this.filter((item) => other.indexOf(item) != -1);
};
Array.prototype.anyMatch = function (other) {
    return this.intersect(other).length > 0;
};
Array.prototype.allMatch = function (other) {
    return this.intersect(other).length === other.length;
};
