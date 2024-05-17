import express from 'express';
import bodyParser from 'body-parser';
import processOrders from './orderProcessor';
const fetchData = require('./fetchData');
import { 
  filterEvenNumbers, 
  mapToSquares, 
  sumOfArray, 
  findMax, 
  sortAscending 
} from './arrayOperations';

import { filterPassedStudents, getStudentNames, sortStudentsByGrade, getAverageAge, addStudent } from './studentOperations';

const app = express();
const port = 8000;

// Middleware
app.use(bodyParser.json());

// Define POST endpoint to process the order
app.post('/process-orders', async (req, res) => {
  try {
    const { items } = req.body;

    // Process orders
    const result = await processOrders(items);

    res.status(200).json(result);
  } catch (error) {
    console.error('Error processing orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// fetch the data from Db
app.get('/fetch-data', async (req, res) => {
    try {
      const data = await fetchData();
      res.json(data);
    } catch (error) {
      console.error('Error:');
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/array-operations', (req, res) => {
    const { array } = req.body;
  
    if (!Array.isArray(array)) {
      return res.status(400).json({ error: 'Invalid payload. "array" should be an array.' });
    }
  
    const filtered = filterEvenNumbers(array);
    const squares = mapToSquares(array);
    const sum = sumOfArray(array);
    const max = findMax(array);
    const sorted = sortAscending(array);
  
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
  
    const passedStudents = filterPassedStudents(students);
    const studentNames = getStudentNames(students);
    const sortedStudents = sortStudentsByGrade(students);
    const averageAge = getAverageAge(students);
  
    res.json({
      passedStudents,
      studentNames,
      sortedStudents,
      averageAge
    });
  });
  
  // Define POST endpoint to add a student
app.post('/add-student', async (req, res) => {
  const { name, age, grade } = req.body;

  if (typeof name !== 'string' || typeof age !== 'number' || typeof grade !== 'number') {
    return res.status(400).json({ error: 'Invalid payload.' });
  }

  try {
    await addStudent({ name, age, grade });
    res.status(200).json({ message: 'Student added successfully.' });
  } catch (error) {
    console.log(res);
    res.status(500).json({ error: 'Error adding student.' });
  }
});
// Start server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
