import fs from 'fs';
import Relation from '../types/Relation';

interface FollowerRelation {
  _from: string
  _to: string
}

const readTwitterFollowerRelation = async (saveToDB: (relations: Relation[]) => Promise<void>, batchSize = 10000) => {
  
  const fileContent = fs.readFileSync(process.cwd() + "\\src\\data\\twitter_combined.txt", 'utf8');
  const lines = fileContent.split("\n");
  let follower: FollowerRelation[] = [];
  let counter = 0;
  let index = 0;
  let prevPercentage = -1;
  for (const line of lines)
  {
    index++;
    counter++;
    const percent = Math.floor((index/lines.length)*10);
    const ids = line.split(" ");
    if (ids.length !== 2)
      return;
    if(ids[0] && ids[1])
      follower.push({
        _from: 'users/' + ids[0].replace("\r", ""),
        _to: 'users/' + ids[1].replace("\r", "")
      })
    
    if (counter > batchSize)
    {
      counter = 0;
      await saveToDB(follower);
      follower = [];
    }
    if (prevPercentage !== percent) {
      console.log(percent*10 + "%");
      prevPercentage = percent;
    }
    
  }
}

export default readTwitterFollowerRelation;