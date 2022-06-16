import { Database } from "arangojs";

const queryFollowerCountOfUser = async (db: Database, userId:string) => {
    return new Promise((resolve, reject) => {
        db.query(`
    FOR f IN follows
      FILTER f._to == '${userId}'
      COLLECT id = f._to WITH COUNT INTO count
      RETURN { user: DOCUMENT(id), follower_count:count}
    `).then(result => resolve(result.all())).catch(e => reject(e))
    });
}

export default queryFollowerCountOfUser;