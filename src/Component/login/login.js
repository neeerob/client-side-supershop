import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import "./login.css";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
    phone: "",
    type: "1",
  });

  const handleToggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        loginData
      );
      // console.log("dta", response);
      try {
        const token = response.data.data;
        // Cookies.set("authToken", token);
        sessionStorage.setItem("authToken", token);
        console.log("Navigating to /");
        setTimeout(() => {
          navigate("/");
        }, 0);
      } catch (e) {
        console.log(e);
      }
    } catch (error) {
      console.error(error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Login failed!",
      });
      // Handle error and show a message
    }
  };

  const handleRegister = () => {
    setIsLoginForm(false);
  };

  const handleBackToLogin = () => {
    setIsLoginForm(true);
  };

  const handleRegisterSubmit = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/reg`,
        registerData
      );
      console.log(response.data);
      // Handle success or redirection here
    } catch (error) {
      console.error(error.message);
      // Handle error and show a message
    }
  };

  return (
    <div className="auth-container">
      <Paper elevation={3} className="auth-form">
        {isLoginForm ? (
          <>
            <Typography variant="h4" className="title">
              Login
            </Typography>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              className="input-field"
              value={loginData.username}
              onChange={(e) =>
                setLoginData({ ...loginData, username: e.target.value })
              }
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              className="input-field"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="action-button action-button-primary"
              onClick={handleLogin}
            >
              Login
            </Button>
            <Typography className="toggle-link" onClick={handleRegister}>
              Create an account
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h4" className="title">
              Register
            </Typography>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              className="input-field"
              value={registerData.name}
              onChange={(e) =>
                setRegisterData({ ...registerData, name: e.target.value })
              }
            />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              className="input-field"
              value={registerData.email}
              onChange={(e) =>
                setRegisterData({ ...registerData, email: e.target.value })
              }
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              className="input-field"
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
            />
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              className="input-field"
              value={registerData.username}
              onChange={(e) =>
                setRegisterData({ ...registerData, username: e.target.value })
              }
            />
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              margin="normal"
              className="input-field"
              value={registerData.phone}
              onChange={(e) =>
                setRegisterData({ ...registerData, phone: e.target.value })
              }
            />
            <FormControl
              fullWidth
              variant="outlined"
              margin="normal"
              className="input-field"
            >
              <InputLabel>Type</InputLabel>
              <Select
                value={registerData.type}
                onChange={(e) =>
                  setRegisterData({ ...registerData, type: e.target.value })
                }
                label="Type"
              >
                <MenuItem value="1">Admin</MenuItem>
                <MenuItem value="2">User</MenuItem>
                <MenuItem value="3">Employee</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              className="action-button action-button-primary"
              onClick={handleRegisterSubmit}
            >
              Register
            </Button>
            <Typography className="toggle-link" onClick={handleBackToLogin}>
              Back to Login
            </Typography>
          </>
        )}
      </Paper>
    </div>
  );
};

export default AuthPage;
