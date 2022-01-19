const express = require('express');

const requireAdmin = (req, res,next) => {
    // console.log(req)
    
    if(!req.admin) {
    //if the req.user hasn't been set(which means a correct auth token wasn't sent in with the request)
    //send error
        next({
            name:"AdminError",
            message: "You are not permitted to perform this action",
            status: 401
        });
    }

    next();
}

module.exports = requireAdmin;