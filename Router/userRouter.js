const express = require("express");
const router = express.Router();

const { signupGet, signupPost } = require("../Controller/userController");

router.get('/signup',signupGet)
      .post('/signup',signupPost)

module.exports=router