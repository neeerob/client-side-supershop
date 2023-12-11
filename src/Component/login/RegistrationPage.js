import React, { useState } from "react";
import axios from "axios";

const RegistrationPage = ({ onBack }) => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
    phone: "",
    type: "1",
  });

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/reg",
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
    <div className="auth-form">
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Name"
        value={registerData.name}
        onChange={(e) =>
          setRegisterData({ ...registerData, name: e.target.value })
        }
      />
      <input
        type="email"
        placeholder="Email"
        value={registerData.email}
        onChange={(e) =>
          setRegisterData({ ...registerData, email: e.target.value })
        }
      />
      <input
        type="password"
        placeholder="Password"
        value={registerData.password}
        onChange={(e) =>
          setRegisterData({ ...registerData, password: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Username"
        value={registerData.username}
        onChange={(e) =>
          setRegisterData({ ...registerData, username: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Phone"
        value={registerData.phone}
        onChange={(e) =>
          setRegisterData({ ...registerData, phone: e.target.value })
        }
      />
      <select
        value={registerData.type}
        onChange={(e) =>
          setRegisterData({ ...registerData, type: e.target.value })
        }
      >
        <option value="1">Admin</option>
        <option value="2">User</option>
        <option value="3">Employee</option>
      </select>
      <button onClick={handleRegister}>Register</button>
      <p onClick={onBack} className="back-link">
        Back to Login
      </p>
    </div>
  );
};

export default RegistrationPage;
