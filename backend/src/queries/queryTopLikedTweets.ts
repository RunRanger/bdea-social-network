import { Database } from "arangojs";

const queryTopLikedTweets = async (db: Database, count = 100) => {
  return new Promise((resolve, reject) => {
    db.query(`
    FOR l IN likes
      COLLECT id = l._to WITH COUNT INTO count
      SORT count DESC
      LIMIT ${count}
      RETURN { id, count}
    `).then(result => resolve(result.all())).catch(e => reject(e))
  });
}

export default queryTopLikedTweets;