import React, { useMemo } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
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
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    content: "",
    country: "",
    dateTime: "",
    language: "",
    latitude: "",
    longitude: "",
    numberOfLikes: 0,
    numberOfShares: 0,
  });

  const handleUserSelect = (userId: string) => async () => {
    setSelectedUser(userId);
    setLoading(true);
    const response = await axios.get(
      "http://localhost:10005/api/fanout/" + userId
    );
    setState(response.data);
    setLoading(false);
  };

  const handleSubmit = async () => {
    console.log(input);
    await axios.post(
      "http://localhost:10005/api/fanout/" + selectedUser,
      input
    );
    handleUserSelect(selectedUser);
  };

  const tweetList = useMemo(() => <TweetList tweets={state} />, [state]);
  return (
    <Box>
      <Typography variant="h4" m={3}>
        Fanout Top 25 Tweets
      </Typography>
      <Grid container>
        <UserSelection onClick={handleUserSelect} />
        {selectedUser && (
          <Grid item xs={12}>
            <Typography variant="h5" m={3}>
              Create Tweet of an followed Account
            </Typography>
            <TextField
              label="Content"
              value={input.content}
              onChange={(e) => setInput({ ...input, content: e.target.value })}
            />
            <Button onClick={handleSubmit}>Submit</Button>
          </Grid>
        )}
        {loading ? (
          <Grid item xs={12} display="flex" justifyContent="center">
            <CircularProgress />
          </Grid>
        ) : (
          <Grid item xs={12}>
            {tweetList}
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
export default Q2;
