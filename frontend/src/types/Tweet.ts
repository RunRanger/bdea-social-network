interface Tweet {
  author?: string,
  content: string,
  country: string,
  dateTime: string,
  language: string,
  latitude: number,
  longitude: number,
  numberOfLikes: number,
  numberOfShares: number,
  id: string
}

export default Tweet;