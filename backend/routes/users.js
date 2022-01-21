const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const { createUser, getUserByUsername, getUser } = require("../db/users");
const requireAdmin = require("./middleware/requireAdmin");
const requireUser = require("./middleware/requireUser");

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

    const user = await createUser({
      username,
      password,
      account_type: "CUSTOMER",
    });

    const token = jwt.sign(
      {
        id: user.id,
        username,
      },
      JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

    res.send({
      user,
      token,
    });
  } catch ({ name, message }) {
    console.error(message);
    next({ name, message });
  }
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    //request must have both
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }
  if (password.length <= 7) {
    //if _user.password is less than 7, will display message
    next({
      name: "PasswordError",
      message: "Password must be at least 8 characters long",
    });
  }

  try {
    const user = await getUser({ username, password });

    if (user) {
      const userData = {
        // create userData obj and store id and username
        id: user.id,
        username: user.username,
      };
      const token = jwt.sign(userData, JWT_SECRET);

      res.send({
        user,
        token,
      });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    console.log("CAUGHT AN ERROR");
    console.error(error);
    next(error);
  }
});

usersRouter.get("/me", requireUser, async (req, res) => {
  // console.log("req.user:",req.user.username)
  res.send({
    user: req.user,
  });
});


usersRouter.get("/", requireAdmin, async (req, res) => {
  // console.log("req.user:",req.user.username)
  res.send({
    user: req.user,
  });
});

module.exports = usersRouter;
