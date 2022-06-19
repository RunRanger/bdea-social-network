import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import UserT from "../types/User";

type Props = {
  user: UserT;
  onClick?: () => void;
};

const User = (props: Props) => {
  return (
    <Stack
      sx={{ cursor: "pointer" }}
      direction="column"
      onClick={props.onClick}
      justifyContent="center"
      alignItems="center"
    >
      <Avatar />
      <Typography>{props.user.name}</Typography>
    </Stack>
  );
};

export default User;
