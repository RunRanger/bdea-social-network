import { Database } from 'arangojs';
import readTweets, { normalizeTweets } from './readTweets';
import readTwitterFollowerRelation from './readTwitterFollowerRelation';
import readTwitterUsers from "./readTwitterUsers";
import {log} from "util";
import createTweetAuthorRelation from './createTweetAuthorRelation';
import assignTweetUser from './assignTweetUser';

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

    await userCollection.saveAll(users).then(() => {/*nothing to do*/} ,
        err => console.error('Failed to fetch document:', err)
    )


    console.log("READING Follower Relations")
    let followerRelations = await readTwitterFollowerRelation();
    //mein laptop schafft nicht alle Einträge, deswegen nur die Hälfte :(
    followerRelations = followerRelations.splice(0, followerRelations.length/2)
    console.log(followerRelations.length)

    console.log("UPLOADING Follower Relations")
    const followerRelationsEdgeCollection = await db.createEdgeCollection("followerRelations")
    await followerRelationsEdgeCollection.saveAll(followerRelations).catch((err) => console.log(err.message))

    console.log(await followerRelationsEdgeCollection.count())

    console.log("READING Tweets")
    const tweets = await readTweets();
    const tweetsDB = normalizeTweets(tweets);
    console.log("UPLOADING Tweets")
    
    const tweetCollection = await db.createCollection("tweets");
    let tweetIds: string[] = [];
    
    await tweetCollection.saveAll(tweetsDB).then((docs) => {tweetIds = docs.map(doc => doc._key)} ,
      err => console.error('Failed to fetch document:', err)
    )

    console.log("CREATING User Tweet Relations")
    console.log(tweetIds.length);
    const userTweetsCollection = assignTweetUser(tweets, users);
    const tweetUserRelations = createTweetAuthorRelation(userTweetsCollection, tweetIds)
    console.log("UPLOADING User Tweet Relations")
    const userTweetRelationsEdgeCollection = await db.createEdgeCollection("userTweetRelations")
    await userTweetRelationsEdgeCollection.saveAll(tweetUserRelations).catch((err) => console.log(err.message))
    console.log("User-Tweet Relations: " + (await userTweetRelationsEdgeCollection.count()).count)
  /*  const info = await tweetCollection.get();
    const tweetDocs = await tweetCollection.documents([tweetIds[0], tweetIds[1]]);
    console.log(info)
    console.log(tweetDocs[1])*/
    console.log("INITIAL LOAD COMPLETED");
  }
  catch (e: any) { console.log(e.message) }
}

export { runInitalLoad }