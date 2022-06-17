import { Database } from "arangojs";

const queryFanOut = (db: Database, userId: string) => {
  return new Promise((resolve, reject) => {
    db.query(`
    FOR f IN fanout
      FILTER f._from == '${userId}'
      RETURN DOCUMENT(f._to)
      `).then(result => resolve(result.all())).catch(e => reject(e))
    });
}

export default queryFanOut;