import { runInitalLoad } from './initalLoad/initalLoad';
import readTweets from './initalLoad/readTweets';
	


const main = async () => {
  const db = await runInitalLoad();
}


main();


