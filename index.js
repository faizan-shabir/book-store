const express = require("express");
const path = require("path");
const cookie = require("cookie-parser");
const xhbs = require("express-handlebars");
const bodyparser = require("body-parser");
const connectDB = require("./config/dbConnect");
const {
  registerhandler,
  deleteController,
  loginhandler,
} = require("./controllers/userController");
const isAuthenticated = require("./authorization/auth")

const port = 3838;

const server = express();

server.engine("hbs" , xhbs.engine({

  extname: "hbs",     // engine
  defaultLayout: "layout",   // layout is the main page 
  layoutsDir: path.join(__dirname, "views", "layouts"),
  partialsDir: path.join(__dirname, "views" , "partials"),



}))
server.set("view engine", "hbs");

connectDB();

server.use(express.json());
server.use(bodyparser.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, "public")));
server.use(cookie());

server.get("/", (req, res) => {
  res.render("index", {pageTitle : "BookStore"});
});
server.get("/register", (req, res) => {
  res.render("register", {pageTitle : "BookStore | Register"}); 
});


server.get("/login", (req, res) => {
  res.render("login", {pageTitle : "BookStore | Login"});
});
server.get("/secureindex", isAuthenticated, (req, res) => {
  res.render("secureHome", {pageTitle : "BookStore | Dashboard"});
});

server.post("/register", registerhandler);
server.post("/login", loginhandler)
server.delete("/user", deleteController);

server.listen(port, () => {
  console.log(`server working on port ${port}`);
});
