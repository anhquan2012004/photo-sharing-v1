import React, { useEffect, useMemo } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  Divider,
} from "@mui/material";
import models from "../../modelData/models";

const UserDetail = ({ setTopBarTitle }) => {
  const { userId } = useParams();
  const user = useMemo(() => models.userModel(userId), [userId]);

  useEffect(() => {
    if (user) setTopBarTitle?.(`${user.first_name} ${user.last_name}`);
  }, [user, setTopBarTitle]);

  if (!user) return <Typography sx={{ p: 2 }}>User not found.</Typography>;

  return (
    <Card variant="outlined" sx={{ m: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {user.first_name} {user.last_name}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Stack spacing={0.5}>
          <Typography><b>Location:</b> {user.location}</Typography>
          <Typography><b>Occupation:</b> {user.occupation}</Typography>
          <Typography><b>Description:</b> {user.description}</Typography>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Button
            variant="contained"
            size="small"
            component={RouterLink}
            to={`/photos/${user._id}`}
          >
            View Photos
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default UserDetail;
