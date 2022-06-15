import fs from 'fs';

interface FollowerRelation {
  _from: string
  _to: string
}

const readTwitterFollowerRelation = async () => {
  
  const fileContent = fs.readFileSync(process.cwd() + "\\src\\data\\twitter_combined.txt", 'utf8');
  const lines = fileContent.split("\n");
  const follower: FollowerRelation[] = [];
  lines.forEach(line => {

    const ids = line.split(" ");
    if (ids.length !== 2)
      return;
    if(ids[0] && ids[1])
      follower.push({
        _from: 'users/' + ids[0].replace("\r", ""),
        _to: 'users/' + ids[1].replace("\r", "")
      })
  })
  return follower;
}

export default readTwitterFollowerRelation;