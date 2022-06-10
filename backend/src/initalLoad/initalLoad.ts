import { Database } from 'arangojs';

const DB_NAME = "socialNetwork"

const runInitalLoad = async () => {
  return initDatabase();
}

const initDatabase = async () => {
  const initDb = new Database('http://127.0.0.1:11001');
  const dbs = await initDb.databases();
  if (dbs.findIndex(db => db.name === DB_NAME) !== -1)
    return initDb.database(DB_NAME);
  return initDb.createDatabase(DB_NAME);
}

export { runInitalLoad }