import React, { useEffect } from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import models from "../../modelData/models";

// ✅ Tự động nhận biết môi trường: CodeSandbox hoặc localhost
function getImageUrl(fileName) {
  const isSandbox = window.location.hostname.includes("codesandbox");

  if (isSandbox) {
    // Ảnh online từ GitHub qua CDN jsDelivr
    return `https://cdn.jsdelivr.net/gh/anhquan2012004/photo-sharing-v1/src/images/${fileName}`;
  }

  // Ảnh local: lấy từ thư mục public/images/
  return `/images/${fileName}`;
}

function UserPhotos({ setTopBarTitle }) {
  const userId = window.location.pathname.split("/").pop();
  const user = models.userModel(userId);
  const photos = models.photoOfUserModel(userId);

  useEffect(() => {
    if (user) {
      setTopBarTitle(`Photos of ${user.first_name} ${user.last_name}`);
    }
  }, [user, setTopBarTitle]);

  if (!photos || photos.length === 0) {
    return (
      <Typography variant="body1" sx={{ margin: "20px" }}>
        No photos for this user.
      </Typography>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      {photos.map((photo) => (
        <Card key={photo._id} sx={{ marginBottom: "20px" }}>
          <CardMedia
            component="img"
            height="300"
            image={getImageUrl(photo.file_name)}
            alt={photo.file_name}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/400x250?text=Image+Not+Found";
            }}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Posted: {photo.date_time}
            </Typography>

            {photo.comments && photo.comments.length > 0 && (
              <>
                <Typography variant="subtitle1" sx={{ marginTop: "10px" }}>
                  Comments
                </Typography>
                {photo.comments.map((comment, idx) => (
                  <Typography key={idx} variant="body2">
                    <strong>
                      {comment.user.first_name} {comment.user.last_name}:
                    </strong>{" "}
                    {comment.comment}
                  </Typography>
                ))}
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default UserPhotos;
