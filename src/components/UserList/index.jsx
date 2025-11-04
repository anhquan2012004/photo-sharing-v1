import React, { useEffect, useMemo } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import models from "../../modelData/models";

const UserList = ({ setTopBarTitle }) => {
  const location = useLocation();
  const users = useMemo(() => models.userListModel(), []);

  useEffect(() => {
    setTopBarTitle?.("Users");
  }, [setTopBarTitle, location.pathname]);

  return (
    <>
      <Typography variant="h6" sx={{ px: 2, pt: 1, pb: 1 }}>
        Users
      </Typography>
      <Divider />
      <List dense>
        {users.map((u) => (
          <ListItemButton
            key={u._id}
            component={RouterLink}
            to={`/users/${u._id}`}
          >
            <ListItemText primary={`${u.first_name} ${u.last_name}`} />
          </ListItemButton>
        ))}
      </List>
    </>
  );
};

export default UserList;
