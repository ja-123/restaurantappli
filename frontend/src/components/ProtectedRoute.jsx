import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { auth, loading } = useContext(AuthContext);

  // Wait until loading is complete
  if (loading) {
    console.log("Checking authentication..."); // Log for debugging
    return <div>Loading...</div>; // Show a loading indicator (can be styled better)
  }

  // Redirect to login if not authenticated
  if (!auth) {
    console.log("User not authenticated"); // Log for debugging
    return <Navigate to="/login" />;
  }

  console.log("User authenticated"); // Log for debugging
  return children;
};

export default ProtectedRoute;
