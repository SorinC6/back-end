const express = require("express");
const helmet = require('helmet');
const cors = require('cors');
const morganLogger = require('morgan');
// const knex = require('knex');
const bcrypt = require('bcryptjs'); // added
const jwt = require('jsonwebtoken');
const demoRouter = require('../allRoutes/demoRoutes');
const demooRouter = require('../allRoutes/demoRoutes');
const protectedRTS = require('../allRoutes/protectedRoutes');
const db = require('../data/dbconfig');



//Middlewares
const server = express();


server.use(helmet());
server.use(cors());
server.use(morganLogger('short'));
server.use(express.json());
server.use('/demo/api', demoRouter);
server.use('/demoo/api', demooRouter);
server.use('/api/protected/', protectedRTS);


server.get('/', (req, res) => {

    res.status(200).send(`API working.\n CheckRoute\n Test Route!`);

});



//Endpoints
server.post('/api/register', (req, res) => {
    const userInfo = req.body;
  
    const hash = bcrypt.hashSync(userInfo.password, 14);
  
    userInfo.password = hash;
    db('users').insert(userInfo).then( ids => {
      res.status(201).json(ids);
      console.log(hash);
      console.log(userInfo);
      console.log('api/register working correctly');
    }).catch(err => res.status(500).json({ Error: `You have not been Registered.`}));
    
  });
  
  
  function generateUserToken(user) {
    const payload = {
      username: user.username,
      password: user.pasword,
    };

  const secret = process.env.JWT_SECRET;

  const options= {
    expiresIn: '7d',

  }

  return jwt.sign(payload, secret, options);
}


server.post('/api/login', (req,res) => {
    const creds = req.body;
    console.log(creds);
  
    db('users').where({ username: creds.username }).first()
      .then(user => {
        if (user && bcrypt.compareSync(creds.password, user.password)) {
  
          const token = generateUserToken(user);
          res.status(200).json({message: `Welcome ${user.username} !`, token: token});
        } else {
          res.status(401).json({message:`You are not authorized to login!`})
        }
      })
      .catch(err => {
        res.status(500).json({message: `You may not login!`})
      });
  });
  
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
  
  
  server.get('/api/users', protected, (req, res) => {
    if(protected) {
      db('users').then(allUsers => {
        res.status(200).json(allUsers);
      }).catch( err => { 
        res.status(500).json({error:`failed to return Users!`})
    })
    } else {
      res.status(401).json({message:`Access Denied!`});
    }
  
  });
  
  
module.exports = server;