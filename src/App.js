// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
//import Rates from './pages/Rates';
import Publishers from './pages/Publishers';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
//import Login from './pages/Login';
//import SignUp from './pages/SignUp';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
//import NewCampaign from './pages/NewCampaign';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pages/auth" element={<Auth />} />
        <Route path="/pages/publishers" element={<Publishers />} />
        <Route path="/pages/blog" element={<Blog />} />
        <Route path="/pages/Contact" element={<Contact />} />
        <Route path="/pages/Careers" element={<Careers />} />
        <Route path="/pages/auth" element={<Auth />} />
        <Route path="/pages/auth" element={<Auth />} />
        <Route path="/pages/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
