const mysql = require('mysql');
require('dotenv').config();

const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

exports.login = (req, res) => {
  res.render('login');
}

exports.home = (req, res) => {
  res.render('home');
}

exports.view_pending = (req, res) => {

  pool.getConnection((err, connection) => {
    if (err) throw err;

    //using the connection
    connection.query("SELECT * FROM customer WHERE PaymentAmount > 0", (err, rows) => {
      //since we used the connection we are releasing the connection
      connection.release();
      if (!err) {
        res.render("pending-amount", { rows });
      } else {
        console.log(err);
      }
    });
  });
}

// exports.add_users = (req, res) => {
//     res.render('add-users');
// }

// exports.add_customer = (req,res) => {
//   res.render('add-customers');
// }

// exports.add_newspaper = (req, res) => {
//   res.render('add-newspaper');
// }

exports.view_customers = ('/view-customers', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;

    //using the connection
    connection.query("SELECT * FROM customer", (err, rows) => {
      //since we used the connection we are releasing the connection
      connection.release();
      if (!err) {
        res.render("view-customers", { rows });
      } else {
        console.log(err);
      }
    });
  });
});

exports.view_distributors = ('/view-distributors', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;

    //using the connection
    connection.query("SELECT * FROM users", (err, rows) => {
      //since we used the connection we are releasing the connection
      connection.release();
      if (!err) {
        res.render("view-distributors", { rows });
      } else {
        console.log(err);
      }
    });
  });
});

exports.view_newspapers = ('/view-newspapers', (req, res) => {

  pool.getConnection((err, connection) => {
    if (err) throw err;

    //using the connection
    connection.query("SELECT * FROM newspapers", (err, rows) => {
      //since we used the connection we are releasing the connection
      connection.release();
      if (!err) {
        res.render("view-newspapers", { rows });
      } else {
        console.log(err);
      }
    });
  });
});

exports.view_customer_profile = ('/view-customer-profile', (req, res) => {

  pool.getConnection((err, connection) => {
    if (err) throw err;

    //using the connection
    connection.query("SELECT * FROM subscriptions WHERE CustomerId = ?",[req.params.CustomerId], (err, rows) => {

      // connection.query("SELECT * FROM newspapers WHERE NewspaperId = ?",[rows.NewspaperId],err,row =>{});
      //since we used the connection we are releasing the connection
      connection.release();
      if (!err) {
        res.render("view-customer-profile", { rows });
      } else {
        console.log(err);
      }
    });
  });
});