"use strict";
// src/arrayOperations.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortAscending = exports.findMax = exports.sumOfArray = exports.mapToSquares = exports.filterEvenNumbers = void 0;
function filterEvenNumbers(arr) {
    return arr.filter(num => num % 2 === 0);
}
exports.filterEvenNumbers = filterEvenNumbers;
function mapToSquares(arr) {
    return arr.map(num => num * num);
}
exports.mapToSquares = mapToSquares;
function sumOfArray(arr) {
    return arr.reduce((acc, num) => acc + num, 0);
}
exports.sumOfArray = sumOfArray;
function findMax(arr) {
    return arr.reduce((max, num) => (num > max ? num : max), arr[0]);
}
exports.findMax = findMax;
function sortAscending(arr) {
    return arr.slice().sort((a, b) => a - b);
}
exports.sortAscending = sortAscending;
//# sourceMappingURL=arrayOperations.js.map