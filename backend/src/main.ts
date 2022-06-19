import { runInitalLoad } from './initalLoad/initalLoad';
import startWebservice from './startWebservice';

const main = async () => {
  const db = await runInitalLoad(1000); // -1 means no limit, otherwise the number of tweets to load

  startWebservice(db);
}


main();
