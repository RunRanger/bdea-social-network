interface Relation {
  _from: string
  _to: string
}

interface AuthorCollection {
  [name: string]: number[]
}

const createTweetAuthorRelation = (authorTweet: AuthorCollection, tweetKeys: string[]) => {
  const result: Relation[] = [];
  Object.keys(authorTweet).forEach(author => {
    authorTweet[author].forEach(tweetIndex => { 
      result.push({_to: "tweets/" + tweetKeys[tweetIndex], _from: "users/" + author})
    })
   })
  return result;
}

export default createTweetAuthorRelation;