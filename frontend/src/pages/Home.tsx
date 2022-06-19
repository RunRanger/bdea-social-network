import { Button, Container, Typography } from "@mui/material";
import React from "react";

type Props = {};

const redirects = {
  "Query 1": "/Q1",
  "Query 2": "/Q2",
  "Query 3": "/Q3",
  "Query 41": "/Q41",
  "Query 42": "/Q42",
  "Query 43": "/Q43",
  "Query 5": "/Q5",
  "Query 6": "/Q6",
};

const Home = (props: Props) => {
  return (
    <Container>
      <Typography variant="h4">Select Query</Typography>
      {Object.keys(redirects).map((key) => (
        <Button key={key} href={redirects[key]}>
          {key}
        </Button>
      ))}
      <Button></Button>
    </Container>
  );
};

export default Home;
