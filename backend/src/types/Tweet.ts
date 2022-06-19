interface Tweet {
  author: string,
  content: string,
  country: string,
  dateTime: number,
  language: string,
  latitude: number,
  longitude: number,
  numberOfLikes: number,
  numberOfShares: number
}

interface TweetCSV extends Tweet {
  id: string,
  author: string
}

export { TweetCSV, Tweet }

export default Tweet