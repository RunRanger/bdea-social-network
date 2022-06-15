import {TweetCSV} from '../types/Tweet';
import User from '../types/User';

interface UserTweetsCollection {
  [name: string]: number[]
}

const assignTweetUser = (tweets: TweetCSV[], users: User[]) => {
    const authorTweetCollection: UserTweetsCollection = {};
    tweets.forEach((tweet, index) => {
      if (!authorTweetCollection[tweet.author]) {
        authorTweetCollection[tweet.author] = [];
      }
      authorTweetCollection[tweet.author].push(index);
    })
    const result: UserTweetsCollection = {};
    Object.values(authorTweetCollection).forEach((tweetIndexes, index) => {
      if (users.length <= index)
        return;
      result[users[index]._key] = tweetIndexes;
    });
    return result;
}

export default assignTweetUser;