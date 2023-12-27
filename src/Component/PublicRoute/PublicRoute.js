// PublicRoute.js
import React, { useEffect, useState } from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { checkAuthentication } from "../../authUtil";

const PublicRoute = ({ path, element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const authToken = sessionStorage.getItem("authToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
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
            setIsAuthenticated(false);
          } else {
            setIsAuthenticated(true);
          }
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(true);
      }
    };

    fetchData();
  }, [authToken]);

  if (isAuthenticated === null) {
    return null;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoute;
