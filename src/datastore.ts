import 'dotenv/config';
import { DataSource } from 'typeorm';

import { database, host, password, username, port } from './config';

const DataStore = new DataSource({
  type: "postgres",
  host: host,
  username: username,
  password: password,
  database: database,
  port: parseInt(port),
  synchronize: false,
  migrationsRun: true,
  entities: ["./src/entity/**/*.ts"], 
  migrations: ["./src/migrations/**/*.ts"],
  })

export default DataStore;
