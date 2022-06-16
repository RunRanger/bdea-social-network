import queryTop100Follower from './queries/queryTopFollower';
import { runInitalLoad } from './initalLoad/initalLoad';
import readTweets from './initalLoad/readTweets';
import { getTopFollwerRelation } from './tests/apiCheck';
import queryTopLikedTweets from './queries/queryTopLikedTweets';
	


const main = async () => {
  const db = await runInitalLoad();



  /* TEST TOP 1 Follower */
  const top100 = await queryTop100Follower(db, 1);
  const check = await getTopFollwerRelation();
  console.log(top100)
  console.log(check); 

  /* TEST TOP 1 Liked Tweets */
  console.log("Start Top liked Tweet");
  const timestamp = new Date().getTime();
  const topTweet = await queryTopLikedTweets(db, 1)
  console.log(topTweet)
  console.log("End Top liked Tweet: " + ((new Date().getTime() - timestamp)/1000) + " seconds");
}


main();


