import { Database } from 'arangojs';
import readTweets, { normalizeTweets } from './readTweets';
import readTwitterFollowerRelation from './readTwitterFollowerRelation';
import readTwitterUsers from "./readTwitterUsers";
import createAuthorTweetRelation from './createAuthorTweetRelation';
import assignTweetUser, {UserTweetsCollection} from './assignTweetUser';
import createUserLikesRelation from './createUserLikesRelation';
import Relation from '../types/Relation';
import Tweet from '../types/tweet';
import User from '../types/User';
import { DocumentCollection } from 'arangojs/collection';
import createFanout from './createFanout';
import shuffle from '../utils/shuffleArray';

const DB_NAME = "socialNetwork"

const runInitalLoad = async (limiter = -1) => {
  const initDb = new Database('http://127.0.0.1:11001');
  const dbs = await initDb.databases();
  if (dbs.findIndex(db => db.name === DB_NAME) !== -1)
    return initDb.database(DB_NAME);
  return initDatabase(initDb, limiter);
}

const initDatabase = async (db: Database, limiter = -1) => {
  console.log("CREATING Database")
  const initDb = await db.createDatabase(DB_NAME)
  await initData(initDb, limiter);
  return initDb;
}

const initData = async (db: Database, limiter = -1) => {
  try {
    console.log("READING Users")
    const users = await readTwitterUsers()

    console.log("UPLOADING Users")

    
    let userCollection: DocumentCollection<User>|null = await db.createCollection<User>("users");
    await userCollection.saveAll(users).then(() => {/*nothing to do*/ },
      err => console.error('Failed to fetch document:', err)
    )
    userCollection = null;

    console.log("READING & UPLOADING Follower Relations")
    const followerRelationsEdgeCollection = await db.createEdgeCollection("follows");
    const saveFollowerRelationsToDB = async (relations: Relation[]) => {
      try {
        await followerRelationsEdgeCollection.saveAll(relations)
      }
      catch (err: any) {
        console.log(err.message)
      }
     }
    await readTwitterFollowerRelation(saveFollowerRelationsToDB, 100000);

    console.log("READING Tweets")
    let tweets = await (await readTweets());
    if (limiter !== -1 && limiter < tweets.length)
      tweets = shuffle(tweets).slice(0, limiter);
   
    console.log("UPLOADING Tweets")
    let tweetIds: string[] = [];
    let tweetsDB: Tweet[] = normalizeTweets(tweets);
    let tweetCollection = await db.createCollection<Tweet>("tweets");
    await tweetCollection.saveAll(tweetsDB).then((docs) => { tweetIds = docs.map(doc => doc._key) },
      err => console.error('Failed to fetch document:', err)
    )

    tweetsDB = [];

    console.log("CREATING Author Tweet Relations")
    let authorTweetsCollection: UserTweetsCollection|null = assignTweetUser(tweets, users);
    let authorTweetRelations: Relation[]|null = createAuthorTweetRelation(authorTweetsCollection, tweetIds)
  

    console.log("UPLOADING Author Tweet Relations")
    const userAuthorRelationsEdgeCollection = await db.createEdgeCollection("wrote")
    await userAuthorRelationsEdgeCollection.saveAll(authorTweetRelations).catch((err) => console.log(err.message))
    console.log("Author-Tweet Relations: " + (await userAuthorRelationsEdgeCollection.count()).count)
    authorTweetsCollection = null;
    authorTweetRelations = null;
    
    console.log("CREATING & UPLOADING User Like Relations")
    const userLikeRelationsEdgeCollection = await db.createEdgeCollection<Relation>("liked")
    const saveLikesToDB = async (relations: Relation[]) => {
      try {
        await userLikeRelationsEdgeCollection.saveAll(relations)
      } catch (err: any) {
        console.log(err.message)
      }
    }
    await createUserLikesRelation(users, tweets, tweetIds, saveLikesToDB);
    console.log("Like Relations: " + (await userLikeRelationsEdgeCollection.count()).count)

    console.log("CREATING & UPLOAD Fanout")
    await createFanout(db, users, 100);

    console.log("INITIAL LOAD COMPLETED");
  }
  catch (e: any) { console.log(e.message) }
}

export { runInitalLoad }