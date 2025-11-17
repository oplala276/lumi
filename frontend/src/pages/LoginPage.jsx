import React, { useState } from "react";
import axios from "../api";
import ReCAPTCHA from "react-google-recaptcha";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");

  const handleLogin = async () => {
    if (!captchaValue) {
      alert("Please complete captcha");
      return;
    }

    try {
      const res = await axios.post("/auth/login", {
        username,
        password,
        captchaValue
      });

      alert(res.data.message);
      console.log("TOKEN:", res.data.token);
    } catch (err) {
      alert(err.response.data.message || "Login failed");
    }
  };

  return (
    <div style={{
      width: "400px",
      margin: "80px auto",
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      background: "#fff"
    }}>
      <h2 style={{ textAlign: "center" }}>ADMINISTRATOR LOGIN</h2>

      <label>Username</label>
      <input
        type="text"
        className="input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <label>Password</label>
      <input
        type="password"
        className="input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <ReCAPTCHA
        sitekey="YOUR_RECAPTCHA_SITE_KEY"
        onChange={(value) => setCaptchaValue(value)}
      />

      <button
        onClick={handleLogin}
        style={{
          width: "100%",
          marginTop: "15px",
          padding: "10px 0",
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px"
        }}
      >
        Log In
      </button>
    </div>
  );
}

export default LoginPage;