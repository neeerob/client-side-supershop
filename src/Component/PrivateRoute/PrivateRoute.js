// PrivateRoute.js
import React, { useEffect, useState } from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { checkAuthentication } from "../../authUtil";

const PrivateRoute = ({ path, element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const authToken = sessionStorage.getItem("authToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(process.env.REACT_APP_API_URL, "url");
        if (authToken) {
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/auth/profile`,
            {
              method: "POST",
              headers: {
                Authorization: authToken,
              },
            }
          );

          const data = await response.json();

          if (response.ok && data.status === 200) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } else {
          // console.log("No auth token found");
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      }
    };

    fetchData();
  }, [authToken]);

  if (isAuthenticated === null) {
    return null; // Loading state
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRoute;
