import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { memo, useEffect, useState, CSSProperties } from "react";
import axios from "axios";
import TweetT from "../types/Tweet";
import Tweet from "../components/Tweet";
import UserT from "../types/User";
import User from "../components/User";
import { FixedSizeList as List, areEqual } from "react-window";

interface Response {
  user: UserT;
  post: TweetT;
}
interface IRowMemo {
  data: TweetT[];
  index: number;
  style: CSSProperties;
}

const Q1 = () => {
  const [tweets, setTweets] = useState<TweetT[]>([]);
  const [users, setUsers] = useState<UserT[]>([]);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    const usersD = await axios.get("http://localhost:10005/api/randomUsers/5");
    const data = new Set(usersD.data as UserT[]);
    setUsers(Array.from(data));
  };

  useEffect(() => {
    if (users.length === 0) getUsers();
  }, []);

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

  const RowMemo = memo<IRowMemo>(
    ({ data, index, style }) => (
      <Box key={data[index].id} sx={{ ...style }}>
        <Tweet tweet={data[index]} />
      </Box>
    ),
    areEqual
  );

  return (
    <Box>
      <Typography variant="h4" m={3}>
        Tweets of an user
      </Typography>
      <Grid container spacing={3}>
        <Grid item>
          <Button onClick={getUsers} sx={{ p: 3 }}>
            New Users
          </Button>
        </Grid>
        {users.map((user, index) => (
          <Grid item key={index}>
            <User user={user} onClick={handleUserClick(user._key)} />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          {loading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Typography>Tweets: {tweets.length}</Typography>
              <List
                height={500}
                width={"100%"}
                itemCount={tweets.length}
                itemSize={125.3}
                itemData={tweets}
              >
                {RowMemo}
              </List>
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Q1;
