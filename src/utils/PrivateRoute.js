import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

function PrivateRoute({ children }) {
  const user = useSelector(selectUser);
  if (!user.uid) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default PrivateRoute;
