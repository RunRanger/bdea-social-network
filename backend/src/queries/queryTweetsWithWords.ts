import { Database } from "arangojs";

const queryTopLikedTweets = async (db: Database, words: string[] ,count = 100) => {
  
  

    return new Promise((resolve, reject) => {
        db.query(`
      FOR l IN liked
    
      COLLECT post_id = l._to WITH COUNT INTO count
      SORT count DESC
      
      let word_filtered_post = (
        FOR p in post_view
            SEARCH ANALYZER(${JSON.stringify(words)} ALL IN p.content, "text_en")
            FILTER p._id == post_id
            RETURN p
      )
      RETURN {post_id: post_id, post: word_filtered_post[0].content, like_count: count}
    `).then(result => resolve(result.all())).catch(e => reject(e))
    });
}

export default queryTopLikedTweets;