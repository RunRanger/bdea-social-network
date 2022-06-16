import queryTop100Follower from './queries/queryTopFollower';
import { runInitalLoad } from './initalLoad/initalLoad';
import readTweets from './initalLoad/readTweets';
import { getTopFollwerRelation } from './tests/apiCheck';
import queryTopLikedTweets from './queries/queryTopLikedTweets';
import queryTopFollowersOfUsersWithTopFollowers from './queries/queryTopFollowersOfUsersWithTopFollowers';
import queryFollowerCountOfUser from "./queries/queryFollowerCountOfUser";
import User from "./types/User";
import queryAccountsUserFollows from "./queries/queryAccountsUserFollows";
	


const main = async () => {
  const db = await runInitalLoad();

  /*
  const tweets = await readTweets();
  const likes = Math.max(...tweets.map(tweet => tweet.numberOfLikes));
  let mostLikes = 0;
  for (let i = 0; i < tweets.length; i++)
  {
    if (tweets[i].numberOfLikes == 429159)
      console.log(typeof (tweets[i].numberOfLikes));
    const nr = parseInt(tweets[i].numberOfLikes.toString())
    if (mostLikes < nr)
      mostLikes = tweets[i].numberOfLikes;
  }

  console.log(likes + " / " + mostLikes);
  /* TEST TOP 1 Follower */
  const top100: any = await queryTop100Follower(db, 1);
  const check = await getTopFollwerRelation();
  console.log(top100)
  console.log(check); 

  /* TEST TOP 1 Liked Tweets */
  console.log("Start Top liked Tweet");
  const timestamp = new Date().getTime();
  const topTweet = await queryTopLikedTweets(db, 1)
  console.log(topTweet)
  console.log("End Top liked Tweet: " + ((new Date().getTime() - timestamp)/1000) + " seconds");



  /* TEST TOP 1 FOLLOWERS OF USERS WITH TOP FOLLOWERS */
  const top100FollowersFollower: any = await queryTopFollowersOfUsersWithTopFollowers(db, top100.map((el:any) => el.user._id), 100)
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


