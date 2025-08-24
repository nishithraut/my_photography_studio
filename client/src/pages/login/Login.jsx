import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import './login.css';


const Login = () => {
  const { auth, setAuth } = useAuth();   // get global auth state
  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
  });
  const { username, password } = inputValue;


  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
      style: { color: "red", fontWeight: "bold" },
    });

  const handleSuccess = (msg) =>
    toast.success(msg, { position: "bottom-right", style: { color: "green" } });

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3002/login",
        { ...inputValue },
        { withCredentials: true }
      );

      const { success, message } = data;

      if (success) {
        handleSuccess(message);
        
        setTimeout(() => {
          window.location.href = "http://localhost:3000/gallery";
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError("Something went wrong");
    }
    setInputValue({ username: "", password: "" });
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3002/logout", {
        withCredentials: true,
      });
      setAuth({ loading: false, loggedIn: false });
      handleSuccess("Logged out successfully");
      window.location.reload();
    } catch (err) {
      handleError("Logout failed");
    }
  };

  if (auth.loading) return <p>Loading...</p>;

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <div className="login-card">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={handleOnChange}
            disabled={auth.loggedIn}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleOnChange}
            disabled={auth.loggedIn}
          />
          <button type="submit" disabled={auth.loggedIn}>
            {auth.loggedIn ? "Already Logged In" : "Login"}
          </button>

          {auth.loggedIn && (
            <button
              type="button" // important to prevent form submit
              onClick={handleLogout}
              style={{
                marginTop: "20px",
                padding: "8px 15px",
                backgroundColor: "#343131ff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          )}
        </div>
      </form>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default Login;
