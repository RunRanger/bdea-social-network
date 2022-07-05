import { Database } from "arangojs";
import Tweet from "../types/Tweet";

const queryInsertTweetWithFanout = async (db: Database, userId: string, tweet: Tweet) => {
  return new Promise((resolve, reject) => {


  db.query(`
    let tweet = (INSERT {
      content: '${tweet.content}',
      country: '${tweet.country}',
      dateTime: ${tweet.dateTime},
      language: '${tweet.language}',
      latitude: '${tweet.latitude}',
      longitude: '${tweet.longitude}',
      numberOfLikes: ${tweet.numberOfLikes},
      numberOfShares: ${tweet.numberOfShares}
    } INTO tweets RETURN NEW)

    FOR f IN follows
      FILTER f._to == 'users/${userId}'
      UPSERT {
        _from: f._from,
        _to: tweet[0]._id
      } 
      INSERT {
        _from: f._from,
        _to: tweet[0]._id
      } 
      UPDATE { }
      IN fanout
    `).then(result => resolve(result.all())).catch(e => reject(e))
    });
}

export default queryInsertTweetWithFanout;