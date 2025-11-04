import React, { useEffect, useMemo } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Divider,
  Link,
} from "@mui/material";
import models from "../../modelData/models";
import { formatDate } from "../../lib/formatDate";

const UserPhotos = ({ setTopBarTitle }) => {
  const { userId } = useParams();
  const user = useMemo(() => models.userModel(userId), [userId]);
  const photos = useMemo(() => models.photoOfUserModel(userId) || [], [userId]);

  useEffect(() => {
    if (user)
      setTopBarTitle?.(`Photos of ${user.first_name} ${user.last_name}`);
  }, [user, setTopBarTitle]);

  if (!user) return <Typography sx={{ p: 2 }}>User not found.</Typography>;

  return (
    <Stack spacing={2} sx={{ m: 2 }}>
      {photos.map((p) => (
        <Card key={p._id} variant="outlined">
          <CardMedia
            component="img"
            image={`/images/${p.file_name}`}
            alt={p.file_name}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Posted: {formatDate(p.date_time)}
            </Typography>

            {Array.isArray(p.comments) && p.comments.length > 0 && (
              <Stack spacing={1} sx={{ mt: 1 }}>
                <Divider />
                <Typography variant="subtitle1">Comments</Typography>
                {p.comments.map((c) => (
                  <Stack key={c._id} spacing={0.25}>
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(c.date_time)}
                    </Typography>
                    <Typography variant="body2">
                      <Link
                        component={RouterLink}
                        to={`/users/${c.user._id}`}
                        underline="hover"
                      >
                        {c.user.first_name} {c.user.last_name}
                      </Link>
                      {": "}
                      {c.comment}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            )}
          </CardContent>
        </Card>
      ))}
      {photos.length === 0 && (
        <Typography>No photos for this user.</Typography>
      )}
    </Stack>
  );
};

export default UserPhotos;
