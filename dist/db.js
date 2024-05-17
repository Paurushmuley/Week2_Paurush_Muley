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
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = exports.checkAndCreateTable = void 0;
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'TestOrder',
    password: 'paurush123',
    port: 5432,
});
function checkAndCreateTable(tableName) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield pool.connect();
        try {
            const tableExistsQuery = `
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_name = $1
      );
    `;
            const result = yield client.query(tableExistsQuery, [tableName]);
            if (!result.rows[0].exists) {
                const createTableQuery = `
        CREATE TABLE ${tableName} (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100),
          age INT,
          grade INT
        );
      `;
                yield client.query(createTableQuery);
                console.log(`Table ${tableName} created.`);
            }
            else {
                console.log(`Table ${tableName} already exists.`);
            }
        }
        catch (error) {
            console.error('Error checking/creating table:', error);
            throw error;
        }
        finally {
            client.release();
        }
    });
}
exports.checkAndCreateTable = checkAndCreateTable;
;
const query = (text, params) => pool.query(text, params);
exports.query = query;
exports.default = pool;
//# sourceMappingURL=db.js.map