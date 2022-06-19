import { Database } from "arangojs";
import User from "../types/User";

interface Result {user: User, count: number}

const queryTopFollower = async (db: Database, count = 100) => {
  return new Promise<Result[]>((resolve, reject) => {
    db.query(`
    FOR f IN follows
      COLLECT id = f._to WITH COUNT INTO count
      SORT count DESC
      LIMIT ${count}
      RETURN { user: DOCUMENT(id), count:count}
    `).then(result => resolve(result.all())).catch(e => reject(e))
  });
}

export default queryTopFollower;