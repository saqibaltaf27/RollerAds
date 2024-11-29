import React, { useState } from "react";
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom"; 
import "./Auth.css";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("LOGIN");
  const [selectedRole, setSelectedRole] = useState(""); 
  const [formData, setFormData] = useState({
    advertiserType: "Individual", 
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    address: "",
    email: "",
    phone: "",
    nickname: "",
    acceptTerms: false,
    receiveUpdates: false,
  });

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const countries = ["United States", "Canada", "United Kingdom", "India", "Australia"]; 

  const navigate = useNavigate(); 

  const generateRandomPassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let randomPassword = "";
    for (let i = 0; i < 12; i++) {
      randomPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return randomPassword;
  };

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLoginChange = (e) => {
    const { id, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    if (selectedRole === "Advertiser") {
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.country ||
        !formData.city ||
        !formData.address ||
        !formData.email ||
        !formData.phone ||
        !formData.nickname ||
        !formData.acceptTerms
      ) {
        setMessage("Please fill all required fields and accept the terms and conditions.");
        return;
      }
    } else if (selectedRole === "Publisher") {
      if (!formData.email || !formData.nickname || !formData.acceptTerms) {
        setMessage("Please fill all required fields and accept the terms and conditions.");
        return;
      }
    } else {
      setMessage("Please select a role and fill in the required details.");
      return;
    }
    const randomPassword = generateRandomPassword();
    setPassword(randomPassword);
    setMessage(`Password has been sent to ${formData.email}.`);

    try {
      const response = await axios.post('http://localhost:5000/api/signup', {
        selectedRole,
        formData,
        password: randomPassword,
      });

      if (response.data.success) {
        setMessage("Account created successfully. Check your email for the password.");
      } else {
        setMessage("There was an issue creating your account. Please try again.");
      }
    } catch (error) {
      setMessage("Error occurred while processing the request.");
      console.error(error);
    }
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); 

    if (!loginData.email || !loginData.password) {
      setMessage("Please enter both email and password.");
      return;
    }

    console.log(loginData.email, loginData.password); 

    try {
  
      const response = await axios.post('http://localhost:5000/api/login', {
        email: loginData.email,
        password: loginData.password
      });

      if (response.data.success) {
        setMessage("Login successful! Redirecting...");

        navigate("../pages/TestPage");  
      } else {
        setMessage("Invalid credentials. Please try again.");
      }
    } catch (error) {
      setMessage("Error occurred while logging in.");
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">Welcome to RollerAds!</h1>
        <ul className="auth-tabs">
          <li>
            <button
              className={activeTab === "LOGIN" ? "active-tab" : ""}
              onClick={() => setActiveTab("LOGIN")}
            >
              LOGIN
            </button>
          </li>
          <li>
            <button
              className={activeTab === "SIGN_UP" ? "active-tab" : ""}
              onClick={() => setActiveTab("SIGN_UP")}
            >
              SIGN UP
            </button>
          </li>
          <li>
            <button
              className={activeTab === "FORGOT" ? "active-tab" : ""}
              onClick={() => setActiveTab("FORGOT")}
            >
              FORGOT
            </button>
          </li>
        </ul>

        {/* Sign Up Form */}
        {activeTab === "SIGN_UP" && (
          <form onSubmit={handleSignUpSubmit}>
            {/* Role Selection */}
            <div className="form-group">
              <label htmlFor="role">Select Role:</label>
              <select
                id="role"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                required
              >
                <option value="">-- Select Role --</option>
                <option value="Advertiser">Advertiser</option>
                <option value="Publisher">Publisher</option>
              </select>
            </div>

            {/* Advertiser Role Fields */}
            {selectedRole === "Advertiser" && (
              <>
                <div className="form-group">
                  <label>Are you signing up as:</label>
                  <div>
                    <input
                      type="radio"
                      id="advertiserType"
                      value="Individual"
                      checked={formData.advertiserType === "Individual"}
                      onChange={handleInputChange}
                    />
                    <label>Individual</label>
                    <input
                      type="radio"
                      id="advertiserType"
                      value="Company"
                      checked={formData.advertiserType === "Company"}
                      onChange={handleInputChange}
                    />
                    <label>Company</label>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="firstName">First Name (Required):</label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name (Required):</label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="country">Country (Required):</label>
                  <select
                    id="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">-- Select Country --</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="city">City (Required):</label>
                  <input
                    type="text"
                    id="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address (Required):</label>
                  <input
                    type="text"
                    id="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email (Required):</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone (Required):</label>
                  <input
                    type="text"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="nickname">Nickname (Required):</label>
                  <input
                    type="text"
                    id="nickname"
                    value={formData.nickname}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </>
            )}

            {/* Publisher Role Fields */}
            {selectedRole === "Publisher" && (
              <>
                <div className="form-group">
                  <label htmlFor="email">Email (Required):</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="nickname">Nickname (Required):</label>
                  <input
                    type="text"
                    id="nickname"
                    value={formData.nickname}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </>
            )}

            {/* Common Fields */}
            <div className="form-group">
              <label htmlFor="acceptTerms">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                  required
                />
                I accept the terms and conditions.
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="receiveUpdates">
                <input
                  type="checkbox"
                  id="receiveUpdates"
                  checked={formData.receiveUpdates}
                  onChange={handleInputChange}
                />
                I agree to receive updates and promotions.
              </label>
            </div>

            <button type="submit">Sign Up</button>
            {message && <p>{message}</p>}
          </form>
        )}

        {/* Sign In Form */}
        {activeTab === "LOGIN" && (
          <form onSubmit={handleSignInSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={loginData.email}
                onChange={handleLoginChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
            </div>

            <button type="submit">Sign In</button>
            {message && <p>{message}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;
