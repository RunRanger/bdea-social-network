import React from "react";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import Tweet from "../types/Tweet";
import User from "../components/User";
import UserT from "../types/User";
import UserSelection from "../components/UserSelection";
import TweetList from "../components/TweetList";

interface ReturnType {
  user: UserT;
  count: number;
}

const Q2 = () => {
  const [state, setState] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(false);

  const handleUserSelect = (userId: string) => async () => {
    setLoading(true);
    const response = await axios.get(
      "http://localhost:10005/api/fanout/" + userId
    );
    setState(response.data);
    setLoading(false);
  };

  return (
    <Box>
      <Typography variant="h4" m={3}>
        Fanout Top 25 Tweets
      </Typography>
      <Grid container>
        <UserSelection onClick={handleUserSelect} />
        {loading ? (
          <Grid item xs={12} display="flex" justifyContent="center">
            <CircularProgress />
          </Grid>
        ) : (
          <Grid item xs={12}>
            <TweetList tweets={state} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
export default Q2;
