import fs from 'fs';
import { parse } from 'csv-parse';
import Tweet, { TweetCSV } from '../types/tweet';
import moment from 'moment';
const headers = ["author", "content", "country","dateTime", "id", "language","latitude", "longitude", "numberOfLikes", "numberOfShares"];

const readTweets = async () => {
  return new Promise<TweetCSV[]>((resolve, reject) => {
    try {

      const fileContent = fs.readFileSync(process.cwd() + "\\src\\data\\tweets.csv", 'utf8');
      
      parse(fileContent, {
        delimiter: ',',
        columns: headers
      }, (error, result: TweetCSV[]) => {
        if (error !== undefined) reject(error)
        const tweetsCSV = result.slice(1, result.length - 1);

        resolve(tweetsCSV);
      });
    }
    catch (error)
    {
      reject(error)
    }
  })
}

const normalizeTweets = (tweetsCSV: TweetCSV[]) => {
  return tweetsCSV.map(tweetCSV => {
    let { id, author, ...tweet } = tweetCSV;
    try {
      tweet.dateTime = moment(tweet.dateTime, "DD/MM/YYYY HH:mm").toDate().getTime();
      tweet.numberOfLikes = parseInt(tweet.numberOfLikes.toString())
      tweet.numberOfShares = parseInt(tweet.numberOfShares.toString())
    }
    catch (e) { /*skip*/}
    return tweet as Tweet
  });
 }

export {normalizeTweets}
export default readTweets;