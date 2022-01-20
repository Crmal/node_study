var express = require('express');
var router = express.Router();
var posts = require('../model/posts');
var lodash = require('lodash');

var nextId = 4;

router.get('/posts', (req, res, next) => {
  res.json({
    "data": posts
    })
});

router.get('/posts/:id', (req, res, next) => {
  if(!posts.find(post => post.id === +req.params.id)){
    return res.json({
      error: "Post not exist"
    });
  }
  res.json({
    "data": posts.find(post => post.id === +req.params.id)
  });
});

router.post('/posts', (req, res, next) => {
  var user_id = req.get('X-User-Id');
  posts.push({
    id: nextId++,
    content: req.body.content,
    winter: user_id
  });

  res.json({
    "data":{
      "id": posts.find(post => post.id === nextId - 1).id
    }
  });
});

router.put('/posts/:postId', (req, res, next) => {
  var user_id = req.get("X-User-Id");
  var index = posts.findIndex(post => post.id === +req.params.postId);
  if (index === -1) 
    return res.json({
      error: "Cannot modify post",
    });
  posts[index] = {
    id : posts[index].id,
    comment : req.body.comment,
    winter : user_id
  }
  res.json({
    "data": posts[index].id
  });
});

router.delete('/posts/:postId', (req, res, next) => {
  var user_id = req.get("X-User-Id");
  var index = posts.find(post => post.id === +req.params.postId);
  
  if (index.winter === +user_id){
    return res.json({
      data: "Successfully deleted",
    });
  }
  res.json({
    error: "Cannot delete post",
  });
});


module.exports = router;