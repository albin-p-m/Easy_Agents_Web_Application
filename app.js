//importing the required packages
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mysql = require("mysql");
require("dotenv").config();
//importing routes package that we exported from our Routes folder
const routes = require("./Server/Routes/routes");

const app = express();
const port = process.env.PORT;

//telling server to use the respective packages
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//setting a statiic folder for css, js and img
app.use(express.static(__dirname + '/Public'));
//telling server to use the routes folder 
app.use("/",routes);

//setting up our template engine. Here we will be using handlebars.
//The real extension of the handlebars file is .handlebars itself, so for shortening it we use the extname property and set it to .hbs.
//engine('NAME_WE_DESIRE_FOR_THE_ENGINE', PACKAGE_NAME({OPTION:'EXTENSION_WE_DESIRE'}));
app.engine("hbs", exphbs({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir:"views/layouts",
    partialsDir:"views/partials"
}));
//setting the view engine
app.set("view engine", "hbs");

//Now we will create a connection pool

  
//Creating connectionto the db
// pool.getConnection((err, connection) => {
//     if (err) throw err;
//     console.log("The connection is made as ID" + connection.threadId);
//     connection.release();
//});

app.listen(port, err => {
    if(err){
        console.log(err);
    } else {
        console.log("Server started at port " + port);
    }
});