import { Database } from "arangojs";

const queryTopLikedTweets = async (db: Database, count = 100) => {
  return new Promise((resolve, reject) => {
    db.query(`
    FOR t IN tweets
      SORT t.numberOfLikes DESC
      LIMIT ${count}
      RETURN { id: t._key, count: t.numberOfLikes}
    `).then(result => resolve(result.all())).catch(e => reject(e))
  });
}

export default queryTopLikedTweets;