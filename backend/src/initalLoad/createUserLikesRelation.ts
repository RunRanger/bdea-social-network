import Relation from "../types/Relation";
import Tweet from "../types/tweet";
import User from "../types/User";

type SaveToDb = (relations: Relation[]) => Promise<void>;

const createUserLikesRelation = async (users: User[], tweets: Tweet[], tweetIds: string[], saveToDb: SaveToDb) => {


  const likes = Math.max(...tweets.map(tweet => tweet.numberOfLikes));
  
  const availablePortion = Math.floor(likes / users.length);

  let prevPercentage = -1;
  for (let index = 0; index < tweets.length; index++)
  {
    const tweet = tweets[index];
    const percent = Math.floor((index/tweets.length)*10);
    let relations: Relation[] | null = [];
    for (let i = 0; i < Math.floor(tweet.numberOfLikes / availablePortion); i++) {
      if(users[i])
        relations.push({
          _from: "users/" + users[i]._key,
          _to: "tweets/" + tweetIds[index]
        });
    }
    await saveToDb(relations);

    if (prevPercentage !== percent) {
      console.log(percent*10 + "%");
      prevPercentage = percent;
    }
  }
};

export default createUserLikesRelation;