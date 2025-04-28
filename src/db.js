import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URI,
});

export function query(text, params) {
  return pool.query(text, params);
}
