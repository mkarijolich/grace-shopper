const express = require("express");
const { getUserByUsername } = require("../db");
const adminRouter = express.Router();
const requireUser = require("./middleware/requireUser")
const requireAdmin = require("./middleware/requireAdmin")


adminRouter.post('/',requireAdmin,async(req,res) => {

    // createUser(
    //     getUserByUsername,password,"ADMIN"
    // )
})

module.exports = adminRouter;