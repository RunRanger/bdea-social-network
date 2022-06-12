import { Database } from 'arangojs';
import readTweets from './readTweets';

const DB_NAME = "socialNetwork"

const runInitalLoad = async () => {
  const initDb = new Database('http://127.0.0.1:11001');
  const dbs = await initDb.databases();
  if (dbs.findIndex(db => db.name === DB_NAME) !== -1)
    return initDb.database(DB_NAME);
  return initDatabase(initDb);
}

const initDatabase = async (db: Database) => {
  console.log("CREATING Database")
  const initDb = await db.createDatabase(DB_NAME)
  await initData(initDb);
  return initDb;
}




const initData = async (db: Database) => {
  try {
    console.log("READING Tweets")
    const tweets = await readTweets();

    console.log("UPLOADING Tweets")
    
    const tweetCollection = await db.createCollection("tweets");
    let ids: string[] = [];
    await tweetCollection.saveAll(tweets).then((docs) => {ids = docs.map(doc => doc._key)} ,
      err => console.error('Failed to fetch document:', err)
    )
    const info = await tweetCollection.get();
    const docs = await tweetCollection.documents([ids[0], ids[1]]);
    console.log(info)
    console.log(docs[1])
  }
  catch (e) { console.log(e) }; 
}

export { runInitalLoad }