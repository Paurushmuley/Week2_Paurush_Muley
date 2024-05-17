import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'TestOrder',
  password: 'paurush123',
  port: 5432,
});

// cheque whether the table is present in database or not
export async function checkAndCreateTable(tableName: string): Promise<void> {
  const client = await pool.connect();
  try {
    console.log(`Checking if table ${tableName} exists...`);
    const tableExistsQuery = `
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_name = $1
      );
    `;
    const result = await client.query(tableExistsQuery, [tableName]);

    if (!result.rows[0].exists) {
      console.log(`Table ${tableName} does not exist. Creating table...`);
      const createTableQuery = `
        CREATE TABLE ${tableName} (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100),
          age INT,
          grade INT
        );
      `;
      await client.query(createTableQuery);
      console.log(`Table ${tableName} created.`);
    } else {
      console.log(`Table ${tableName} already exists.`);
    }
  } catch (error) {
    console.error('Error checking/creating table:', error);
    throw error;
  } finally {
    client.release();
  }
};

export const query = (text: string, params: any) => pool.query(text, params);

export default pool;
