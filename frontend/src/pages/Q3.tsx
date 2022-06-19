import React from "react";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import Tweet from "../types/Tweet";
import User from "../components/User";
import UserT from "../types/User";

interface ReturnType {
  user: UserT;
  count: number;
}

const Q3 = () => {
  const [state, setState] = useState<ReturnType[]>([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    const response = await axios.get(
      "http://localhost:10005/api/top100followersoftop100followers"
    );
    setState(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box>
      <Typography variant="h4" m={3}>
        Top 100 Accounts with following most of Top 100 Follower Accounts
      </Typography>
      <Grid container>
        {loading ? (
          <Grid item xs={12} display="flex" justifyContent="center">
            <CircularProgress />
          </Grid>
        ) : (
          state.map((user) => (
            <Grid item xs={3}>
              <User user={user.user} />
              <Typography>{user.count}</Typography>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};
export default Q3;
