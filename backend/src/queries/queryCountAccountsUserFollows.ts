import { Database } from "arangojs";

const queryCountAccountsUserFollows = async (db: Database, userId: string) => {
    return new Promise((resolve, reject) => {
        db.query(`
    FOR f IN follows
      FILTER f._from == '${"users/" +userId}'
      COLLECT id = f._from WITH COUNT INTO count
      RETURN count
    `).then(result => resolve(result.all())).catch(e => reject(e))
    });
}

export default queryCountAccountsUserFollows;