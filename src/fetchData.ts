// fetchData.js
const { query } = require('./db');

async function fetchData() {
  try {
    const result = await query('SELECT * FROM students');
    return result.rows;
  } catch (error) {
    throw new Error('Error fetching data:'+ error);
  }
}

module.exports = fetchData;
