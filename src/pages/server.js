const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const router = express.Router();
const cors = require('cors'); 
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.json()); 
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost', 
  user: 'root', 
  password: '', 
  database: 'rollerads', 
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to the database');
});

app.post('/api/signup', async (req, res) => {
  const { selectedRole, formData, password } = req.body;
  const { email } = formData;


  const hashedPassword = await bcrypt.hash(password, 10); 
  const query = `
    INSERT INTO users (role, first_name, last_name, country, city, address, email, phone, nickname, password) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  
  db.query(query, [
    selectedRole,
    formData.firstName,
    formData.lastName,
    formData.country,
    formData.city,
    formData.address,
    email,
    formData.phone,
    formData.nickname,
    hashedPassword
  ], (err, results) => {
    if (err) {
      console.error('Error inserting into the database:', err);
      return res.status(500).send('Error inserting data into the database');
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'saqibkh1805@gmail.com', 
        pass: 'AbC123@gs',
      }
    });

    const mailOptions = {
      from: 'saqibkh1805@gmail.com',
      to: email,
      subject: 'Welcome to RollerAds!',
      text: `Your password is: ${password}`, 
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).send('Error sending email');
      }

      res.status(201).send('User registered successfully, and password sent to email');
    });
  });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const query = `SELECT * FROM users WHERE email = ?`;
  
    db.query(query, [email], (err, results) => {
      if (err) {
        console.error('Error querying the database:', err);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      const user = results[0];
  
      if (password !== user.password) {
        return res.status(401).json({ success: false, message: 'Incorrect password' });
      }
  
      res.cookie('user_id', user.id, { httpOnly: true, secure: false }); 
      res.status(200).json({ success: true, message: 'Login successful' });
    });
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
