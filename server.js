// server.js

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hrmsapp'
});

connection.connect();

app.get('/customer', (req, res) => {
  connection.query('SELECT id as CustomerId, CustomerName FROM customer', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Endpoint to fetch bank data
app.get('/bank', (req, res) => {
  connection.query('SELECT id as BankId, BankName, CustomerId FROM bank', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Endpoint to fetch ATM data
app.get('/atm', (req, res) => {
  connection.query('SELECT id as AtmId, BankId, State, City, Address, NewAtmId, SiteStatus FROM atm', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// Endpoint to fetch ATM data
app.get('/atmregion', (req, res) => {
  connection.query('SELECT AtmId, RegionName FROM atmregion', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});
// Endpoint to fetch ATM data
app.get('/services', (req, res) => {
  connection.query('SELECT AtmId, ServiceId, ServiceType, TakeoverDate, HandoverDate, PayOut, CostToClient FROM services', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});
// Endpoint to fetch ATM data
app.get('/employee', (req, res) => {
  connection.query('SELECT AtmId, EmployeeName,EmployeeRole,TypeOfWork FROM employee', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
