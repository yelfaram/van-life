import 'dotenv/config';

const user = process.env.DB_USER;
const host = process.env.DB_HOST;
const database = 'van_life';
const password = process.env.DB_PASSWORD;
const port = process.env.DB_PORT;

export { user, host, database, password, port }