import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Grid, Paper } from "@mui/material";
import TopBar from "./components/TopBar";
import UserList from "./components/UserList";
import UserDetail from "./components/UserDetail";
import UserPhotos from "./components/UserPhotos";

function App() {
  const [topBarTitle, setTopBarTitle] = useState("");

  return (
    <BrowserRouter>
      <TopBar title={topBarTitle} />
      <Grid container spacing={0}>
        <Grid item xs={12} md={3} lg={2}>
          <Paper square elevation={0} sx={{ minHeight: "calc(100vh - 64px)" }}>
            <UserList setTopBarTitle={setTopBarTitle} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={9} lg={10}>
          <Routes>
            <Route
              path="/users"
              element={<div style={{ padding: 16 }}>Chọn một user ở bên trái.</div>}
            />
            <Route
              path="/users/:userId"
              element={<UserDetail setTopBarTitle={setTopBarTitle} />}
            />
            <Route
              path="/photos/:userId"
              element={<UserPhotos setTopBarTitle={setTopBarTitle} />}
            />
            <Route path="/" element={<Navigate to="/users" replace />} />
            <Route
              path="*"
              element={<div style={{ padding: 16 }}>Not found</div>}
            />
          </Routes>
        </Grid>
      </Grid>
    </BrowserRouter>
  );
}

export default App;
