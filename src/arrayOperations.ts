// src/arrayOperations.ts

export function filterEvenNumbers(arr: number[]): number[] {
    return arr.filter(num => num % 2 === 0);
  }
  
  export function mapToSquares(arr: number[]): number[] {
    return arr.map(num => num * num);
  }
  
  export function sumOfArray(arr: number[]): number {
    return arr.reduce((acc, num) => acc + num, 0);
  }
  
  export function findMax(arr: number[]): number {
    return arr.reduce((max, num) => (num > max ? num : max), arr[0]);
  }
  
  export function sortAscending(arr: number[]): number[] {
    return arr.slice().sort((a, b) => a - b);
  }
  