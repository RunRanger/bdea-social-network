import queryTop100Follower from './queries/queryTopFollower';
import { runInitalLoad } from './initalLoad/initalLoad';
import { getTopFollwerRelation } from './tests/apiCheck';
import queryTopLikedTweets from './queries/queryTopLikedTweets';
import queryTopFollowersOfUsersWithTopFollowers from './queries/queryTopFollowersOfUsersWithTopFollowers';
import queryFollowerCountOfUser from "./queries/queryFollowerCountOfUser";
import queryAccountsUserFollows from "./queries/queryAccountsUserFollows";
import queryPostsOfAccount from "./queries/queryPostsOfAccount";



const main = async () => {
  const db = await runInitalLoad();


  /* TEST TOP 1 Follower */
  const top100: any = await queryTop100Follower(db, 1);
  const check = await getTopFollwerRelation();
  console.log(top100)
  console.log(check); 

  /* TEST TOP 1 Liked Tweets */
  console.log("Start Top liked Tweet");

  const timestamp = new Date().getTime();
  const topTweet = await queryTopLikedTweets(db, 25, ["My", "Heart", "is", "in", "the", "World"]);
  console.log("End Top liked Tweet: " + ((new Date().getTime() - timestamp)/1000) + " seconds");


  /* TEST POSTS OF TOP100[0] USER */
  const userPosts: any = await queryPostsOfAccount(db, 'users/153226312')
  console.log(userPosts)

  /* TEST TOP 1 FOLLOWERS OF USERS WITH TOP FOLLOWERS */
  const top100FollowersFollower: any = await queryTopFollowersOfUsersWithTopFollowers(db, top100.map((el:any) => el.user._id), 1)
  console.log(top100FollowersFollower[0])

  /* TEST FOLLOWER COUNT OF USER */
  console.log('TEST FOLLOWERCOUNT OF MOST FOLLOWED USER')
  const followerCountOfMostFollowedUser = await queryFollowerCountOfUser(db, top100[0].user._id)
  console.log(followerCountOfMostFollowedUser)
  console.log(top100[0].count)

  /* TEST ACCOUNTS USER FOLLOWS */
  console.log('TEST COUNT OF ACCOUNTS MOST FOLLOWED USER FOLLOWS')
  const accountsUserFollows =  await queryAccountsUserFollows(db, top100[0].user._id)
  console.log(accountsUserFollows)





}


main();


