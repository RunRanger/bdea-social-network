import { runInitalLoad } from './initalLoad/initalLoad';
	


const main = async () => {
  const db = await runInitalLoad();


}


main();


