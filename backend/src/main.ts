import queryTop100Follower from './queries/queryTopFollower';
import { runInitalLoad } from './initalLoad/initalLoad';
import { getTopFollwerRelation } from './tests/apiCheck';
import queryTopLikedTweets from './queries/queryTopLikedTweets';
import queryTopFollowersOfUsersWithTopFollowers from './queries/queryTopFollowersOfUsersWithTopFollowers';
import queryFollowerCountOfUser from "./queries/queryFollowerCountOfUser";
import queryAccountsUserFollows from "./queries/queryAccountsUserFollows";
import queryPostsOfAccount from "./queries/queryPostsOfAccount";
import readTwitterUsers from './initalLoad/readTwitterUsers';
import createFanout from './initalLoad/createFanout';
import startWebservice from './startWebservice';

const main = async () => {
  const db = await runInitalLoad(-1); // -1 means no limit, otherwise the number of tweets to load

  startWebservice(db);

  const fanout = db.collection("fanout");
  console.log((await fanout.count()).count)

}


main();
