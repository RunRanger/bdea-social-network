import { Database } from 'arangojs';
import readTweets from './readTweets';
import readTwitterFollowerRelation from './readTwitterFollowerRelation';
import readTwitterUsers from "./readTwitterUsers";
import {log} from "util";

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
    console.log("READING Users")
    const users = await readTwitterUsers()

    console.log("UPLOADING Users")

    const userCollection = await db.createCollection("users");

    let userIds: string[] = []

    await userCollection.saveAll(users).then((docs) => {userIds = docs.map(doc => doc._key)} ,
        err => console.error('Failed to fetch document:', err)
    )


    console.log("READING User Relations")
    let userRelations = await readTwitterFollowerRelation();
    //mein laptop schafft nicht alle Einträge, deswegen nur die Hälfte :(
    userRelations = userRelations.splice(0, userRelations.length/2)
    console.log(userRelations.length)

    console.log("UPLOADING User Relations")
    const userRelationsEdgeCollection = await db.createEdgeCollection("userRelations")
    await userRelationsEdgeCollection.saveAll(userRelations).catch((err) => console.log(err.message))

    console.log(await userRelationsEdgeCollection.count())
    console.log(await userRelationsEdgeCollection.any())

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
  catch (e: any) { console.log(e.message) };
}

export { runInitalLoad }