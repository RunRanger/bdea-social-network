import { Database } from "arangojs";

const queryAccountsUserFollows = async (db: Database, userId:string) => {
    return new Promise((resolve, reject) => {
        db.query(`
    FOR f IN follows
      FILTER f._from == '${userId}'
      COLLECT id = f._from WITH COUNT INTO count
      RETURN { user: DOCUMENT(id), count_user_follows:count}
    `).then(result => resolve(result.all())).catch(e => reject(e))
    });
}

export default queryAccountsUserFollows;