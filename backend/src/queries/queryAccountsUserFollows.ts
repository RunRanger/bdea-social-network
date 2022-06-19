import { Database } from "arangojs";

const queryAccountsUserFollows = async (db: Database, userId: string, limit= -1) => {
  const limitStr = limit > 0 ? `LIMIT ${limit}` : "";
    return new Promise((resolve, reject) => {
        db.query(`
    FOR f IN follows
      FILTER f._from == '${"users/" +userId}'
      COLLECT id = f._from WITH COUNT INTO count
      ${limitStr}
      RETURN { user: DOCUMENT(id), count_user_follows:count}
    `).then(result => resolve(result.all())).catch(e => reject(e))
    });
}

export default queryAccountsUserFollows;