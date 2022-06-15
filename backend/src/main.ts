import queryTop100Follower from './apis/queryTopFollower';
import { runInitalLoad } from './initalLoad/initalLoad';
import readTweets from './initalLoad/readTweets';
import { getTopFollwerRelation } from './utils/apiCheck';
	


const main = async () => {
  const db = await runInitalLoad();



  /* TEST TOP 1 Follower */
  const top100 = await queryTop100Follower(db, 1);
  const check = await getTopFollwerRelation();
  console.log(top100)
  console.log(check);
}


main();


