import { Database } from "arangojs";

const queryTopFollower = async (db: Database, count = 100) => {
  return new Promise((resolve, reject) => {
    db.query(`
    FOR f IN follows
      COLLECT id = f._to WITH COUNT INTO count
      SORT count DESC
      LIMIT ${count}
      RETURN { from, count}
    `).then(result => resolve(result.all())).catch(e => reject(e))
  });
}

export default queryTopFollower;