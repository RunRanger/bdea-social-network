import { Database } from "arangojs";

const queryRandomUsers = async (db: Database, amount = 1) => {
    return new Promise((resolve, reject) => {
        db.query(`
    FOR u IN wrote
      SORT RAND()
      LIMIT ${amount}
      RETURN DOCUMENT(u._from)
    `).then(result => resolve(result.all())).catch(e => reject(e))
    });
}

export default queryRandomUsers;