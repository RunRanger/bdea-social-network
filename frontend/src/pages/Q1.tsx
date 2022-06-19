import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import TweetT from "../types/Tweet";
import UserT from "../types/User";

import UserSelection from "../components/UserSelection";
import TweetList from "../components/TweetList";

interface Response {
  user: UserT;
  post: TweetT;
}

const Q1 = () => {
  const [tweets, setTweets] = useState<TweetT[]>([]);
  const [loading, setLoading] = useState(false);

  const handleUserClick = (userId: string) => async () => {
    setLoading(true);

    const response = await axios.get(
      "http://localhost:10005/api/posts/" + userId
    );
    const tweetsData = (response.data as Response[]).map((r) => ({
      ...r.post,
      author: r.user.name,
    })) as TweetT[];
    setTweets(tweetsData);
    setLoading(false);
  };

  return (
    <Box>
      <Typography variant="h4" m={3}>
        Tweets of an user
      </Typography>
      <Grid container spacing={3}>
        <UserSelection onClick={handleUserClick} />
        <Grid item xs={12}>
          {loading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Typography>Tweets: {tweets.length}</Typography>
              <TweetList tweets={tweets} />
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Q1;
