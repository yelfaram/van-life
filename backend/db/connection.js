import postgresql from "pg";
import { user, host, database, password, port } from "./dbconfig.js"

const { Pool } = postgresql;

const connection = new Pool({ user, password, host, database, port });

export default connection;
