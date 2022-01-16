const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const { createUser, getUserByUsername } = require('../db/users')


usersRouter.post("/register", async (req, res, next) => {
    const { username, password } = req.body;
  
    try {
      const _user = await getUserByUsername(username);
  
      if (_user) {
        //if _user already exists, will display message
        next({
          name: "UserExistsError",
          message: "A user by that username already exists",
        });
      }
  
    //   if (password.length <= 7) {
    //     //if _user.password is less than 7, will display message
    //     next({
    //       name: "PasswordError",
    //       message: "Password must be at least 8 characters long",
    //     });
    //   }
  
      const user = await createUser({ username, password });
  
      const token = jwt.sign(
        {
          id: user.id,
          username,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );
  
      res.send({
        user,
        token
      });
    } catch ({ name, message }) {
      console.error(message);
      next({ name, message });
    }
  });


  module.exports = usersRouter;