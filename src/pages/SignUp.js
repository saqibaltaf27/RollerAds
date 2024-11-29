// src/pages/SignUp.js
import React from 'react';
import './SignUp.css';

const SignUp = () => (
  <div className="signup">
    <h1>Sign Up</h1>
    <form>
      <label>Full Name:</label>
      <input type="text" placeholder="Enter your full name" />
      <label>Email:</label>
      <input type="email" placeholder="Enter your email" />
      <label>Password:</label>
      <input type="password" placeholder="Create a password" />
      <button type="submit">Sign Up</button>
    </form>
  </div>
);

export default SignUp;
