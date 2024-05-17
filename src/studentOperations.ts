// src/studentOperations.ts
import pool, { checkAndCreateTable } from './db';

interface Student {
  name: string;
  age: number;
  grade: number;
}

export function filterPassedStudents(students: Student[]): Student[] {
  return students.filter(student => student.grade >= 50);
}

export function getStudentNames(students: Student[]): string[] {
  return students.map(student => student.name);
}

export function sortStudentsByGrade(students: Student[]): Student[] {
  return students.slice().sort((a, b) => a.grade - b.grade);
}

export function getAverageAge(students: Student[]): number {
  const totalAge = students.reduce((sum, student) => sum + student.age, 0);
  return totalAge / students.length;
}

const tableName = 'students';

export const addStudent = async (student: Student): Promise<void> => {
  console.log('Adding student:', student);  
  await checkAndCreateTable(tableName);

  const client = await pool.connect();
  try {//It creates table if table name is not present in database
    const insertStudentQuery = `
      INSERT INTO ${tableName} (name, age, grade)
      VALUES ($1, $2, $3);
    `;
    await client.query(insertStudentQuery, [student.name, student.age, student.grade]);
    console.log(`Student ${student.name} added.`);
  } catch (error) {
    console.error('Error adding student:', error);
    throw error; // Propagate the error to be handled
  } finally {
    client.release();
  }
};
