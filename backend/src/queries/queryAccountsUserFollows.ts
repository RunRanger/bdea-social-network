import { Database } from "arangojs";

const queryAccountsUserFollows = async (db: Database, userId: string, limit= -1) => {
  const limitStr = limit > 0 ? `LIMIT ${limit}` : "";
    return new Promise((resolve, reject) => {
        db.query(`
    FOR f IN follows
      FILTER f._from == '${"users/" + userId}'
      ${limitStr}
      RETURN f._to
    `).then(result => resolve(result.all())).catch(e => reject(e))
    });
}

export default queryAccountsUserFollows;