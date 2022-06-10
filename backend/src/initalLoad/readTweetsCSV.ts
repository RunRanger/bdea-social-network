import fs from 'fs';

const readTweets = () => {
  try {
    const data = fs.readFileSync("./../data/tweets.csv", 'utf8');
    const dataSplitted = data.split(",");

  }
  catch (e)
  {
    console.log(e)
  }


}