import { Database } from "arangojs";

const queryPostsOfAccount = async (db: Database, userId:string) => {
    return new Promise((resolve, reject) => {
        db.query(`
    FOR w IN wrote
      FILTER w._from == '${"users/"+userId}'
      RETURN {user: DOCUMENT(w._from), post: DOCUMENT(w._to)}
    `).then(result => resolve(result.all())).catch(e => reject(e))
    });
}

export default queryPostsOfAccount;