import { Box, Typography, Grid, IconButton } from "@mui/material";
import React from "react";
import TweetT from "../types/Tweet";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IosShareIcon from "@mui/icons-material/IosShare";

type Props = {
  tweet: TweetT;
};

function Tweet({ tweet }: Props) {
  return (
    <Box
      padding="1rem"
      sx={{
        "&:hover": {
          backgroundColor: "#eee",
        },
      }}
    >
      <Grid container flexWrap="nowrap">
        <Grid item sx={{ paddingRight: "1rem" }}></Grid>
        <Grid item flexGrow="1">
          <Box>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              flexWrap="nowrap"
            >
              <Grid item>
                <Box display="flex">
                  <Typography
                    sx={{ fontSize: "16px", fontWeight: 500, mr: "6px" }}
                  >
                    {tweet.author}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                  >
                    @{tweet.author}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                  >
                    .
                  </Typography>
                  <Typography
                    sx={{ fontSize: "15px", mr: "6px", color: "#555" }}
                  >
                    {new Date(tweet.dateTime).toUTCString()}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: "15px", color: "#555" }}>
                    {tweet.content}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Box
              display="flex"
              justifyContent="space-between"
              marginRight="5rem"
              marginTop=".8rem"
            >
              <IconButton size="small">
                <ChatBubbleOutlineIcon fontSize="small" />
              </IconButton>
              <IconButton size="small">
                <FavoriteBorderIcon fontSize="small" />
                <Typography>{tweet.numberOfLikes}</Typography>
              </IconButton>
              <IconButton size="small">
                <IosShareIcon fontSize="small" />
                <Typography>{tweet.numberOfShares}</Typography>
              </IconButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Tweet;
