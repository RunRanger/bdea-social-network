import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import Tweet from "../types/Tweet";
import User from "../components/User";
import UserT from "../types/User";

interface ReturnType {
  user: UserT;
  count: number;
}

const Q2 = () => {
  const [state, setState] = useState<ReturnType[]>([]);

  const getData = async () => {
    const response = await axios.get(
      "localhost:10005/api/top100followersoftop100followers"
    );
    setState(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box>
      <Typography variant="h4" m={3}>
        Top 100 Followers
      </Typography>
      <Grid container>
        {state.map((user) => (
          <Grid item xs={3}>
            <User user={user.user} />
            <Typography>{user.count}</Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default Q2;
