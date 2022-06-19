import { Database } from "arangojs";

const queryTopFollowersOfUsersWithTopFollowers = async (db: Database, top100UserIds: string[] , count = 100) => {
    return new Promise((resolve, reject) => {
        db.query(`
    FOR f IN follows
      FILTER f._to IN ${JSON.stringify(top100UserIds)}
      COLLECT id = f._from WITH COUNT INTO count
      SORT count DESC
      LIMIT ${count}
      RETURN { user: DOCUMENT(id), count:count}
    `).then(result => resolve(result.all())).catch(e => reject(e))
    });
}

export default queryTopFollowersOfUsersWithTopFollowers;