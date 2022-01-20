var express = require('express');
var router = express.Router();
const User = require('../model');
var lodash = require('lodash');
const { values } = require('lodash');

nextId = 4;

router.post('/login', (req, res, next) => {
  var body = req.body;
  var users = User.data.user.find(user => user.email === body.email);
  if(users && users.password === body.password){
    return res.json(
      {
        "data": {
          "user": {
            "id": users.id
          }}});
        }
  res.json({
    error: "User not exist"
  })
});

router.post('/register', (req, res, next) => {
  var body = req.body;
  if(User.data.user.find(user => user.email === body.email)){
    return res.send("User already exist");
  };
  User.data.user.push({
    id: nextId++,
    email: body.email,
    password: body.password
  });
  res.json(
    {
      "data": {
        "user": {
          "id": User.data.user.find(user => user.email === body.email).id
        }
      }
    }
  );
});





module.exports = router;