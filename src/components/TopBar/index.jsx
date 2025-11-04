import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

const TopBar = ({ title }) => (
  <AppBar position="static">
    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
      <Typography variant="h6" noWrap>
        Anh Quan Nguyen
      </Typography>
      <Box sx={{ textAlign: "right" }}>
        <Typography variant="subtitle1" noWrap>
          {title || ""}
        </Typography>
      </Box>
    </Toolbar>
  </AppBar>
);

export default TopBar;
