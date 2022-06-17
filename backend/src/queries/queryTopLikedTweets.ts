import { Database } from "arangojs";

const queryTopLikedTweets = async (db: Database, count = 100, words: string[] = []) => {

  let filter = "";
  words.forEach(word => {
    if (filter !== "")
      filter += " && "
    filter += 'CONTAINS(LOWER(t.content), LOWER("' + word + '"))'
  });

  if (filter !== "")
    filter = "FILTER " + filter;

  return new Promise((resolve, reject) => {
    db.query(`
    FOR t IN tweets
    ${filter}
    SORT t.numberOfLikes DESC
    LIMIT ${count}
    RETURN t
    `).then(result => resolve(result.all())).catch(e => reject(e))
  });
}

export default queryTopLikedTweets;