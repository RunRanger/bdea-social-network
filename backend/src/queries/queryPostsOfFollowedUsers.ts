import { Database } from "arangojs";

const queryPostsOfFollowedUsers = async (db: Database, userId: string, mode: 'newest' | 'popular' = 'newest', limit=25) => {
  const sort = mode === 'newest' ? 't.dateTime' : 't.numberOfLikes';

    return new Promise((resolve, reject) => {
        db.query(`
        LET USERS = (
          FOR f IN follows
               FILTER f._from == '${userId}'
               RETURN f._to
          )
          
          LET followedTweets = (
          FOR w IN wrote
              FILTER w._from IN USERS
              RETURN w._to
          )
          
          FOR t IN tweets
              FILTER t._id IN followedTweets
              SORT ${sort} DESC
              ${limit !== -1 ? `LIMIT ${limit}` : ''}
              RETURN t
    `).then(result => resolve(result.all())).catch(e => reject(e))
    });
}

export default queryPostsOfFollowedUsers;