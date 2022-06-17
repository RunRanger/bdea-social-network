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

const main = async () => {
  const db = await runInitalLoad(-1); // -1 means no limit, otherwise the number of tweets to load


  /* TEST TOP 1 Follower */
  /*
  const top100: any = await queryTop100Follower(db, 1);
  const check = await getTopFollwerRelation();
  console.log(top100)
  console.log(check); */


  /* TEST TOP 1 Liked Tweets */
  console.log("Start Top liked Tweet");
  
 /* const timestamp = new Date().getTime();
  const topTweet = await queryTopLikedTweets(db, 25, ["Heart"]);
  console.log(topTweet)
  console.log("End Top liked Tweet: " + ((new Date().getTime() - timestamp)/1000) + " seconds");*/
}


main();
