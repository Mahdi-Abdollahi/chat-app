import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./utils/PrivateRoute";
import Profile from "./pages/Profile";

function App() {
  // TODO: CHECK USER HAVE TOKEN IN LOCAL STORAGE

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
