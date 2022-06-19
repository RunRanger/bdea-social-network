import React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
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
      "http://localhost:10005/api/top100followers"
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
        {state.map((user, index) => (
          <Grid item xs={3} key={index}>
            <Stack direction="column" alignItems="center">
              <User user={user.user} />
              <Typography>{user.count}</Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default Q2;
