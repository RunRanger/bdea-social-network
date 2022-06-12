import fs from 'fs';

interface FollowerRelation {
  [id: string]: string[]
}

const readTwitterFollowerRelation = async () => {
  
  const fileContent = fs.readFileSync(process.cwd() + "\\src\\data\\twitter_combined.txt", 'utf8');
  const lines = fileContent.split("\n");
  const follower: FollowerRelation = {};
  lines.forEach(line => {
    const ids = line.split(" ");
    if (ids.length !== 2)
      return;
    if(!follower[ids[0]])
      follower[ids[0]] = []
    follower[ids[0]].push(ids[1]);
  })
  return follower;
}

export default readTwitterFollowerRelation;