"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addStudent = exports.getAverageAge = exports.sortStudentsByGrade = exports.getStudentNames = exports.filterPassedStudents = void 0;
// src/studentOperations.ts
const db_1 = __importStar(require("./db"));
function filterPassedStudents(students) {
    return students.filter(student => student.grade >= 50);
}
exports.filterPassedStudents = filterPassedStudents;
function getStudentNames(students) {
    return students.map(student => student.name);
}
exports.getStudentNames = getStudentNames;
function sortStudentsByGrade(students) {
    return students.slice().sort((a, b) => a.grade - b.grade);
}
exports.sortStudentsByGrade = sortStudentsByGrade;
function getAverageAge(students) {
    const totalAge = students.reduce((sum, student) => sum + student.age, 0);
    return totalAge / students.length;
}
exports.getAverageAge = getAverageAge;
const tableName = 'students';
const addStudent = (student) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.checkAndCreateTable)(tableName);
    const client = yield db_1.default.connect();
    try {
        const insertStudentQuery = `
      INSERT INTO ${tableName} (name, age, grade)
      VALUES ($1, $2, $3);
    `;
        yield client.query(insertStudentQuery, [student.name, student.age, student.grade]);
        console.log(`Student ${student.name} added.`);
    }
    catch (error) {
        console.error('Error adding student:', error);
        throw error; // Propagate the error to be handled by the caller
    }
    finally {
        client.release();
    }
});
exports.addStudent = addStudent;
//# sourceMappingURL=studentOperations.js.map