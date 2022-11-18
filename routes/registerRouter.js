const express = require("express");
const Register = require("../model/register");
const expressAsyncHandler = require("express-async-handler");
const router = new express.Router();
const { sendWelcomeMail } = require("../email/mail");
const newRegister = require("../model/newRegister");
const newUser = require("../model/newUser");
router.post("/register", async (req, res) => {
  const user = new Register({
    fullName: req.body.fname,
    email: req.body.email_id,
    phoneNumber: req.body.mobile,
    course: req.body.course,
  });
  try {
    await user.save();
    sendWelcomeMail(req.body.fullName, req.body.email);
    res.send(user);
    // res.send("Data Save sucessfully");
    console.log(user);
  } catch (e) {
    res.send(e);
  }
});

router.post("/login", async (req, res) => {
  const user = await Register.findByCredentials(
    req.body.email,
    req.body.password
  );
  res.send(user);
});

router.get("/login", async (req, res) => {
  res.render("login");
});

router.get("/register", async (req, res) => {
  res.render("register");
});

router.get("/forgot-password", async (req, res) => {
  res.render("forgot-password");
});

router.post("/forgot-password", async (req, res) => {
  try {
    const user = await Register.findUser(req.body.email, req.body.password);
    res.send(user);
  } catch (e) {
    res.send(e);
  }
});

router.post("/new-register", async (req, res) => {
  const user = new newRegister({
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    qualification: req.body.qualification,
  });
  try {
    await user.save();
    res.send(user);
  } catch (e) {
    res.send(e);
  }
});


router.post("/new-user", async (req, res) => {
  const user = new newUser({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    await user.save();
    res.send(user);
  } catch (e) {
    res.send(e);
  }
});


router.get("/users-data",async (req,res)=>{
    try{
    const users=await newRegister.find({});
    res.send(users);
    }
    catch(e){
      res.send(e);
    }
})

router.post("/new-login", async (req, res) => {
  try {
    const user = await newUser.findByCredentials(
      req.body.email,
      req.body.password
    );
    res.send(user);
  } catch (e) {
    res.status(400).send();
  }
});




module.exports = router;
