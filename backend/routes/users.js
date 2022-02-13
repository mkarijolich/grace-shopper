const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const { getAllOrders } = require("../db");
const { JWT_SECRET } = process.env;

const {
  createUser,
  getUserByUsername,
  getUser,
  getAllUsers,
  getAllAddresses,
  createAddress,
  getOrdersByUserId,
  destroyUser,
  updateUser
} = require("../db/users");
const requireAdmin = require("./middleware/requireAdmin");
const requireUser = require("./middleware/requireUser");

usersRouter.post("/register", async (req, res, next) => {
  const { username, password, email } = req.body;

  try {
    const _user = await getUserByUsername(username);

    if (_user) {
      //if _user already exists, will display message
      next({
        name: "UserExistsError",
        message: "A user by that username already exists",
      });
    }

      if (password.length <= 7) {
        //if _user.password is less than 7, will display message
        next({
          name: "PasswordError",
          message: "Password must be at least 8 characters long",
        });
      }

    const user = await createUser({
      username,
      password,
      email,
      account_type: "CUSTOMER",
    });

    const token = jwt.sign(
      {
        id: user.id,
        username,
        email,
        account_type: user.account_type,
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
        email:user.email,
        account_type: user.account_type,
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

usersRouter.get("/:userId/orders", requireUser, async (req, res) => {
  console.log('hello')

  const orders = await getOrdersByUserId(req.user.id) 

  res.send({
    orders
  });
});


usersRouter.get("/", requireAdmin, async (req, res) => {

  const users = await getAllUsers();

  res.send({
    users: users,
  });
});

usersRouter.get("/:userId/addresses", async (req, res) => {

  const addresses = await getAllAddresses(req.user.id);
  res.send({addresses});
});

usersRouter.post("/:userId/addresses", async (req, res) => {

  const address = await createAddress(req.user.id, req.body);

  res.send({ address });
});

usersRouter.delete('/:userId',requireAdmin, async(req,res,next) => {
  try{
      const id = req.params.userId
      console.log(id)
      const user = await destroyUser(id);
  
      res.send({
          user
      })
  }catch ({ name, message }) {
      next({ name, message });
  }
})

usersRouter.patch('/:userId',requireUser, async(req,res,next) => {
  try{
      const { userId } = req.params;
      req.body.id = userId;

      if(req.user.id.toString() !== userId && req.user.account_type !== 'ADMIN') {
        next({
          name:"Unauthorized",
          message: "You are not authorized.",
          status: 401
        });
      }

      const user = await updateUser(req.body);
  
      res.send({
          user
      })
  }catch ({ name, message }) {
      next({ name, message });
  }
})

module.exports = usersRouter;
