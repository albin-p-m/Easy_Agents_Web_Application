const { parse } = require('dotenv');
const { response } = require('express');
const mysql = require('mysql');
require('dotenv').config();

const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

exports.login = ('/auth-home', (req, res) => {
    const {Phone, Password} = req.body;
    if(Phone && Password){
        pool.getConnection((err, connection) => {
            if(err) throw err;
            console.log("The connection is made successfully");
            connection.query("SELECT * FROM users WHERE PhoneNo = ? AND Password = ?;",[parseInt(Phone), Password], (err, results) => {
                const UserType = results[0].UserType;
                connection.release();
                if(results.length > 0) {
                    if(UserType === 'Agent'){
                        res.render("home");
                    } else {
                        res.render("distributor-home");
                    }
                }
            });
        });
    }
});

exports.add_users = (req, res) => {
    const {Name, Phone, Password} = req.body;
    if(Name == '' || Phone == '' || Password == '') {
        res.send('error!! Please fill in the complete form');
    }else{
        pool.getConnection((err, connection) => {
            if (err) throw err;
  
            //using the connection
            connection.query(
                "SELECT PhoneNo FROM users WHERE PhoneNo = ?",
                [Phone], (err, results) => {

                //since we used the connection we are releasing the connection
                    connection.release();
                    if(results.length > 0) {
                        res.send('Error!! the user already exist.....');
                    }else{
                        pool.getConnection((err, connection) => {
                            if (err) throw err;
                            connection.query( "INSERT INTO users ( UserName, PhoneNo, UserType, Password) VALUES (?,?,'Distributor',?);",
                            [Name, parseInt(Phone), Password], (err, results) => {
                                connection.release();
                                if(err) throw err;
                                res.redirect("view-distributors");
                            });
                        });
                    }
                });
        });
    }
}

exports.add_customer = (req, res) => {
    const {Name, Phone, Address, Note} = req.body;
    if(Name == '' || Phone == '' || Address == '') {
        res.send('error!! Please fill in the complete form');
    }else{
        pool.getConnection((err, connection) => {
            if (err) throw err;
  
            //using the connection
            connection.query(
                "SELECT CustomerPhoneNo FROM customer WHERE CustomerPhoneNo = ?",
                [Phone], (err, results) => {
                //since we used the connection we are releasing the connection
                    connection.release();
                    if(results.length > 0) {
                        res.send('Error!! the user already exist.....');
                    }else{
                        pool.getConnection((err, connection) => {
                            if (err) throw err;
                            connection.query( "INSERT INTO customer ( CustomerName, CustomerPhoneNo, CustomerAddress, CustomerNote) VALUES (?,?,?,?);",
                            [Name, parseInt(Phone), Address, Note], (err, results) => {
                                connection.release();
                                if(err) throw err;
                                res.redirect("view-customers");
                            });
                        });
                    }
                });
        });
    }
}

exports.add_newspaper = (req, res) => {
    const {Name, Price} = req.body;
    if(Name == '' || Price == '') {
        res.send('error!! Please fill in the complete form');
    }else{
        pool.getConnection((err, connection) => {
            if (err) throw err;
  
            //using the connection
            connection.query(
                "SELECT NewspaperName FROM newspapers WHERE NewspaperName = ?",
                [Name], (err, results) => {
                //since we used the connection we are releasing the connection
                    connection.release();
                    if(results.length > 0) {
                        res.send('Error!! the user already exist.....');
                    }else{
                        pool.getConnection((err, connection) => {
                            if (err) throw err;
                            connection.query( "INSERT INTO newspapers ( NewspaperName, NewspaperPrice) VALUES (?,?);",
                            [Name, parseInt(Price)], (err, results) => {
                                connection.release();
                                if(err) throw err;
                                res.redirect("view-newspapers");
                            });
                        });
                    }
                });
        });
    }
}

exports.delete_customer = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        //using the connection
        connection.query(
            "DELETE FROM customer WHERE CustomerId = ?",
            [req.params.CustomerId], (err) => {

            //since we used the connection we are releasing the connection
            connection.release();
            if(err){
                console.log(err);
            } else {
                // this.location.("./view-customers");
                res.redirect("../view-customers");
            }
        });
    });
}

exports.delete_distributor = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        //using the connection
        connection.query(
            "DELETE FROM users WHERE UserId = ?",
            [req.params.UserId], (err, results) => {

            //since we used the connection we are releasing the connection
            connection.release();
            if(err){
                console.log(err);
            } else {
                res.redirect("../view-distributors");
            }
        });
    });
}

exports.delete_newspaper = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        //using the connection
        connection.query(
            "DELETE FROM newspapers WHERE NewspaperId = ?",
            [req.params.NewspaperId], (err, results) => {

            //since we used the connection we are releasing the connection
            connection.release();
            if(err){
                console.log(err);
            } else {
                res.redirect("../view-newspapers");
            }
        });
    });
}