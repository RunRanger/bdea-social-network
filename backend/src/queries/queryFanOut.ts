import { Database } from "arangojs";

const queryFanOut = (db: Database, userId: string, limit=25) => {
  return new Promise((resolve, reject) => {
    db.query(`
      FOR f IN fanout
        FILTER f._from == '${"users/" + userId}'
        SORT DOCUMENT(f._to).dateTime DESC
        LIMIT ${limit}
        RETURN DOCUMENT(f._to)
      `).then(result => resolve(result.all())).catch(e => reject(e))
    });
}

export default queryFanOut;