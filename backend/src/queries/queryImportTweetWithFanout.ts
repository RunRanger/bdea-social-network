import { Database } from "arangojs";
import Tweet from "../types/Tweet";

const queryInsertTweetWithFanout = async (db: Database, userId:string, tweet: Tweet) => {
    return new Promise((resolve, reject) => {
        db.query(`
    let tweet = (INSERT {
      content: '${tweet.content}',
      country: '${tweet.country}',
      dateTime: DATE_NOW(),
      language: '${tweet.language}',
      latitude: '${tweet.latitude}',
      longitude: '${tweet.longitude}',
      numberOfLikes: ${tweet.numberOfLikes},
      numberOfShares: ${tweet.numberOfShares}
    } INTO tweets RETURN NEW)
    LET followers = (
      FOR f IN follows
        FILTER f._to == '${"users/"+userId}'
        RETURN f._from)
    FOR f in followers
        INSERT {
          _from: f,
          _to: tweet._id
        } INTO fanout  
    
    `).then(result => resolve(result.all())).catch(e => reject(e))
    });
}

export default queryInsertTweetWithFanout;