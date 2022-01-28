const express = require('express');

const auth = express();
const user = require('../models/user');

auth.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const user_data = await user.findOne({ where: { email }});
  if(!user_data){
    await user.create({
      email,
      password,
    });
    return res.json({
      data: await user.findOne({ 
        attributes: ['id'],
        where: { email },
      })
    });
  }
  res.json({
    error: "User already exist",
  });
});

auth.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user_data = await user.findOne({ where: { email }});
  if(user_data && user_data.password == password){
    return res.json({
      data:{
        user: user_data.id
      }
    });
  }
  res.json({
    error: "User not exist",
  })
})

module.exports = auth