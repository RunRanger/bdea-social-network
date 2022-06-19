import { Database } from "arangojs";
import queryPostsOfFollowedUsers from "../queries/queryPostsOfFollowedUsers";
import Relation from "../types/Relation";
import Tweet from "../types/tweet";
import User from "../types/User";

interface TweetDB extends Tweet { _key: string}

const createFanout = async (db: Database,  users: User[], limiter = -1) => {

  const fanoutCollection = await db.createEdgeCollection<Relation>("fanout")

  let counter = 0;
  for (const user of users)
  {
    counter++;
    if (limiter !== -1 && counter > limiter)
      break;
    const posts = await queryPostsOfFollowedUsers(db, "users/" + user._key, 'newest', -1) as TweetDB[];
    const relations: Relation[] = []
    for (const post of posts)
    {
      relations.push(
        {
          _from: "users/"+user._key,
          _to: "tweets/" +post._key
        }
      )
    }
    await fanoutCollection.saveAll(relations)
  }

}

export default createFanout;