import React, { useMemo } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import Tweet from "../types/Tweet";
import TweetList from "../components/TweetList";

const Q2 = () => {
  const [state, setState] = useState<Tweet[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const handleSubmit = async () => {
    setLoading(true);
    const words = input.replace(" ", "%20");
    const response = await axios.get(
      "http://localhost:10005/api/top25tweetswithwords/" + words
    );
    setState(response.data);
    setLoading(false);
  };

  const tweetList = useMemo(() => <TweetList tweets={state} />, [loading]);

  return (
    <Box>
      <Typography variant="h4" m={3}>
        Top 25 tweets of with some words
      </Typography>
      <Grid container>
        <Grid item xs={12}>
          <TextField value={input} onChange={handleInputChange} />
          <Button onClick={handleSubmit}>Submit</Button>
        </Grid>
        <Grid item xs={12}>
          {loading ? (
            <Grid item xs={12} display="flex" justifyContent="center">
              <CircularProgress />
            </Grid>
          ) : (
            tweetList
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
export default Q2;
