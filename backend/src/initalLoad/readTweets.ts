import fs from 'fs';
import { parse } from 'csv-parse';
import Tweet from '../types/tweet';

const headers = ["author", "content", "country","dateTime", "id", "language","latitude", "longitude", "numberOfLikes", "numberOfShares"];

const readTweets = async () => {
  return new Promise<Tweet[]>((resolve, reject) => {
    try {

      const fileContent = fs.readFileSync(process.cwd() + "\\src\\data\\tweets.csv", 'utf8');
      
      parse(fileContent, {
        delimiter: ',',
        columns: headers
      }, (error, result: Tweet[]) => {
        if (error !== undefined) reject(error)
        const tweets = result.slice(1, result.length - 1);
        console.log(tweets[0])
        resolve(tweets);
      });
    }
    catch (error)
    {
      reject(error)
    }
  })
}

export default readTweets;