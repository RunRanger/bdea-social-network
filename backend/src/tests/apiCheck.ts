import fs from 'fs';
import readTweets from '../initalLoad/readTweets';

interface FollowerCounter {
  [name: string]: number
}

const getTopFollwerRelation = async () => {
  
  const fileContent = fs.readFileSync(process.cwd() + "\\src\\data\\twitter_combined.txt", 'utf8');
  const lines = fileContent.split("\n");
  const counter = {} as FollowerCounter;
  lines.forEach(line => {
    const ids = line.split(" ");
    if (ids.length !== 2)
      return;
    if (ids[0] && ids[1])
    {
      const followed = ids[1].replace("\r", "")
      if(counter[followed] === undefined)
        counter[followed] = 0;
      counter[followed]++;
    }
  })
  let top = "-1";
  let c = 0;
  Object.keys(counter).forEach(key => {
    if (counter[key] > c) {
      top = key;
      c = counter[key];
    }
  })
  
  return { id: top, count: c };
}




export {getTopFollwerRelation}