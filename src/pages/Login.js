import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleCaptchaChange = (value) => {
    console.log("Captcha value:", value);
    setCaptchaValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!captchaValue) {
      alert("Please complete the CAPTCHA verification.");
      return;
    }

    console.log("Email:", email, "Password:", password, "Captcha Value:", captchaValue);
    // Perform API call for login
  };

  return (
    <div
      style={{
        backgroundColor: "#121212",
        color: "#fff",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "20px",
          border: "1px solid #333",
          borderRadius: "8px",
          backgroundColor: "#1c1c1c",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Welcome to RollerAds!</h1>
        <ul
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "20px",
            listStyleType: "none",
            padding: 0,
          }}
        >
          <li>
            <button
              style={{
                color: "#fff",
                background: "none",
                border: "none",
                borderBottom: "2px solid #00f",
              }}
            >
              SIGN IN
            </button>
          </li>
          <li>
            <button
              style={{
                color: "#fff",
                background: "none",
                border: "none",
              }}
            >
              SIGN UP
            </button>
          </li>
          <li>
            <button
              style={{
                color: "#fff",
                background: "none",
                border: "none",
              }}
            >
              FORGOT
            </button>
          </li>
        </ul>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="email">E-Mail:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                backgroundColor: "#333",
                color: "#fff",
                border: "1px solid #444",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                backgroundColor: "#333",
                color: "#fff",
                border: "1px solid #444",
                borderRadius: "4px",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px", textAlign: "center" }}>
            <ReCAPTCHA
              sitekey="YOUR_SITE_KEY" // Replace with your reCAPTCHA site key
              onChange={handleCaptchaChange}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
