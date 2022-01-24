const express = require("express");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { getUserByUsername } = require("../db");
const adminRouter = express.Router();
// const requireUser = require("./middleware/requireUser");
const requireAdmin = require("./middleware/requireAdmin");
const { createUser } = require("../db/users");

adminRouter.post("/register", requireAdmin, async (req, res,next) => {
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

    const user = await createUser({ username, password, account_type: "ADMIN" });

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

adminRouter.delete('/:userId', requireAdmin, async(res,req,next) => {

  try{
    const _user = await getUserByUsername(username);




    
  } catch ({ name,message }) {
    console.log(error);
    next({ name,message });
  }

})


module.exports = adminRouter;
