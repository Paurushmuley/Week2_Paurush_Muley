"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const orderProcessor_1 = __importDefault(require("./orderProcessor"));
const fetchData = require('./fetchData');
const arrayOperations_1 = require("./arrayOperations");
const studentOperations_1 = require("./studentOperations");
const app = (0, express_1.default)();
const port = 8000;
// Middleware
app.use(body_parser_1.default.json());
// Define POST endpoint
app.post('/process-orders', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { items } = req.body;
        // Process orders
        const result = yield (0, orderProcessor_1.default)(items);
        res.status(200).json(result);
    }
    catch (error) {
        console.error('Error processing orders:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
app.get('/fetch-data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield fetchData();
        res.json(data);
    }
    catch (error) {
        console.error('Error:');
        res.status(500).json({ error: 'Internal server error' });
    }
}));
app.post('/array-operations', (req, res) => {
    const { array } = req.body;
    if (!Array.isArray(array)) {
        return res.status(400).json({ error: 'Invalid payload. "array" should be an array.' });
    }
    const filtered = (0, arrayOperations_1.filterEvenNumbers)(array);
    const squares = (0, arrayOperations_1.mapToSquares)(array);
    const sum = (0, arrayOperations_1.sumOfArray)(array);
    const max = (0, arrayOperations_1.findMax)(array);
    const sorted = (0, arrayOperations_1.sortAscending)(array);
    res.json({
        original: array,
        filteredEvenNumbers: filtered,
        squares: squares,
        sum: sum,
        max: max,
        sorted: sorted
    });
});
app.post('/student-operations', (req, res) => {
    const { students } = req.body;
    if (!Array.isArray(students)) {
        return res.status(400).json({ error: 'Invalid payload. "students" should be an array of student objects.' });
    }
    const passedStudents = (0, studentOperations_1.filterPassedStudents)(students);
    const studentNames = (0, studentOperations_1.getStudentNames)(students);
    const sortedStudents = (0, studentOperations_1.sortStudentsByGrade)(students);
    const averageAge = (0, studentOperations_1.getAverageAge)(students);
    res.json({
        passedStudents,
        studentNames,
        sortedStudents,
        averageAge
    });
});
// Define POST endpoint to add a student
app.post('/add-student', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, age, grade } = req.body;
    if (typeof name !== 'string' || typeof age !== 'number' || typeof grade !== 'number') {
        return res.status(400).json({ error: 'Invalid payload.' });
    }
    try {
        yield (0, studentOperations_1.addStudent)({ name, age, grade });
        res.status(200).json({ message: 'Student added successfully.' });
    }
    catch (error) {
        console.log(res);
        res.status(500).json({ error: 'Error adding student.' });
    }
}));
// Start server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map