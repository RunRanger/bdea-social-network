import { Grid, IconButton } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Wrapper = () => {
  return (
    <Grid container>
      <Grid item xs={1}>
        <IconButton href="/">
          <ArrowBackIcon />
        </IconButton>
      </Grid>
      <Grid item xs={10}>
        <Outlet />
      </Grid>
      <Grid item xs={1} />
    </Grid>
  );
};

export default Wrapper;
