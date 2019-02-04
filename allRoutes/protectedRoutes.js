const express = require('express');
const db = require('../data/dbconfig');
const router = express.Router();



function protected(req, res, next) {
    const token = req.headers.authorization;
  
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
          res.status(401).json({message: `Invalid Token`});
        } else {
          req.decodedToken = decodedToken;
          next();
        }
      });
    } else {
      res.status(401).json({message: `You have not provided a Token.`})
    }
  }
  


  module.exports = router;