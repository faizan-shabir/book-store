const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const registerhandler = async (req, res) => {
  const { email, username, password } = req.body;



  if (email !== "" && username !== "" && password !== "") {
    const isUser = await User.findOne({ email });

    if (!isUser) {
      const encryptpass = await bcrypt.hash(password, 10);
      const newUser = await new User({
        username,
        email,
        password: encryptpass,
      });
      await newUser.save();

      res.render("register" , {message : "User saved Succesfully!"});
      // res.redirect("/login");
    } else {
      res.render("register", { message: "User already Exists!" });
    }
  } else {
    res.render("register", { message: "all required" });
    // res.render("register", { message: "All Credentials Required !" });
  }
};

const deleteController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      const verifyAccount = await bcrypt.compare(password, user.password);
      if (verifyAccount) {
        await User.findByIdAndDelete(user._id);
        res.json({ message: "Deleted Successfully" });
      } else {
        res.json({ message: "Password Incorrect" });
      }
    } else {
      res.json({ message: " User does no exist" });
    }
  } catch (err) {
    console.log(err);
  }
};

const loginhandler = async (req, res) => {
  const { email, password } = req.body;

  if (email !== "" && password !== "") {
    const isExistingUser = await User.findOne({ email });
    if (isExistingUser) {
      const verifyPss = await bcrypt.compare(password, isExistingUser.password);
      if (verifyPss) {
        const generateToken = await jwt.sign(
          { userId: isExistingUser._id },
          "thiismysecretkey"
        );

        res.cookie("token", generateToken, {
          maxAge: 24 * 60 * 60 * 1000, // milliseconds
          secure: true,
          httpOnly: true,
        });
        res.redirect("/secureindex");
      } else {
        res.render("login", { message: "PassWord incorrect!" });
      }
    } else {
      res.render("login", { message: "User Not Found!" });
    }
  } else {
    res.render("login", { message: "All credentials Required!" });
  }
};

module.exports = { registerhandler, deleteController,loginhandler };
