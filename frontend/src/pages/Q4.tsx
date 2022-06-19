import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { memo, useState } from "react";
import axios from "axios";
import UserT from "../types/User";
import UserSelection from "../components/UserSelection";
import User from "../components/User";
import TweetList from "../components/TweetList";
import Tweet from "../types/Tweet";

interface ReturnType1 {
  user: UserT;
  follower_count: number;
}

const Q2 = () => {
  const [q1, setQ1] = useState<ReturnType1 | null>();
  const [q2, setQ2] = useState<number | null>();
  const [q3, setQ3] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(false);

  const getData = async (userId: string) => {
    const response = await axios.get(
      "http://localhost:10005/api/followercount/" + userId
    );

    const response2 = await axios.get(
      "http://localhost:10005/api/followingcount/" + userId
    );

    const response3 = await axios.get(
      "http://localhost:10005/api/top25tweets/" + userId
    );

    setQ1(response.data[0]);
    setQ2(response2.data[0]);
    setQ3(response3.data);
  };

  const handleUserClick = (userId: string) => async () => {
    setLoading(true);
    await getData(userId);
    setLoading(false);
  };

  return (
    <Box>
      <Typography variant="h4" m={3}>
        User
      </Typography>
      <Grid container>
        <UserSelection onClick={handleUserClick} />
        {loading ? (
          <Grid item xs={12} display="flex" justifyContent="center">
            <CircularProgress />
          </Grid>
        ) : (
          q1 &&
          q2 && (
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={3}>
                  <Stack direction="column" alignItems="center" sx={{ m: 3 }}>
                    <User user={q1.user} />
                    <Divider sx={{ width: "100%", p: 1 }} />
                    <Typography variant="subtitle1" pt={3}>
                      {"Follower: " + q1.follower_count}
                    </Typography>
                    <Typography variant="subtitle1">
                      {"Follows: " + q2}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={9}>
                  <TweetList tweets={q3} />
                </Grid>
              </Grid>
            </Grid>
          )
        )}
      </Grid>
    </Box>
  );
};
export default Q2;
