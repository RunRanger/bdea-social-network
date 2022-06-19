import { Button, Divider, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import User from "./User";
import UserT from "../types/User";
import axios from "axios";

type Props = {
  onClick: (userId: string) => () => void;
};

const UserSelection = ({ onClick }: Props) => {
  const [users, setUsers] = useState<UserT[]>([]);
  const getUsers = async () => {
    const usersD = await axios.get("http://localhost:10005/api/randomUsers/5");
    const data = new Set(usersD.data as UserT[]);
    setUsers(Array.from(data));
  };

  useEffect(() => {
    if (users.length === 0) getUsers();
  }, []);

  return (
    <Grid item xs={12}>
      <Grid container justifyContent="space-around">
        <Grid item>
          <Button onClick={getUsers} sx={{ p: 3 }}>
            New Users
          </Button>
        </Grid>
        {users.map((user, index) => (
          <Grid item key={index}>
            <User user={user} onClick={onClick(user._key)} />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Divider />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserSelection;
