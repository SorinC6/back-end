const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morganLogger = require("morgan");
// const knex = require('knex');
const bcrypt = require("bcryptjs"); // added
const jwt = require("jsonwebtoken");
const demoRouter = require("../allRoutes/demoRoutes");
// const demooRouter = require("../allRoutes/demoRoutes");
const protectedRTS = require("../allRoutes/protectedRoutes");
const db = require("../data/dbconfig");

//Middlewares
const server = express();

server.use(helmet());
server.use(cors());
server.use(morganLogger("short"));
server.use(express.json());
server.use("/demo/api", demoRouter);
// server.use("/demoo/api", demooRouter);
server.use("/api/", protectedRTS);



//+++++++++++++++++++++++++++++++++++++
//Endpoints
//+++++++++++++++++++++++++++++++++++++

server.get("/", (req, res) => {
  res.status(200).send(`API working.\n CheckRoute\n Test Route!`);
});


server.post("/api/register", (req, res) => {
  const userInfo = req.body;
  console.log(userInfo);

  const hash = bcrypt.hashSync(userInfo.password, 14);

  userInfo.password = hash;
  db("users")
    .insert(userInfo)
    .then(ids => {
      res.status(201).json(ids);
      console.log(hash);
      console.log(userInfo);
      console.log("api/register working correctly");
    })
    .catch(err =>
      res.status(500).json({ Error: `You have not been Registered.` })
    );
});

function generateUserToken(user) {
  const payload = {
    username: user.username,
    password: user.password
  };

  const secret = 'secret';

  const options = {
    expiresIn: "7d"
  };

  return jwt.sign(payload, secret, options);
}

server.post("/api/login", (req, res) => {
  const creds = req.body;
  console.log(creds);

  db("users")
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateUserToken(user);
        console.log("this is the token", token);
        res
          .status(201)
          .json({ message: `Welcome ${user.username} !`, token: token });
      }
    })
    .catch(err => {
      res.status(500).json({ message: `You may not login!` });
    });
});

function functProtected(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, 'secret', (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: `Invalid Token` });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: `You have not provided a Token.` });
  }
}

server.get("/api/users", functProtected, (req, res) => {
  if (functProtected) {
    db("users")
      .then(allUsers => {
        res.status(200).json(allUsers);
      })
      .catch(err => {s
        res.status(500).json({ error: `failed to return Users!` });
      });
  } else {
    res.status(401).json({ message: `Access Denied!` });
  }
});

module.exports = server;
