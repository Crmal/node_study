import { Router } from 'express';

import content from '../models/content';

var router = Router();
var nextId = 4;

router.get('/posts', async (req, res) => {
  res.json({ data: await content.findAll({})});
});

router.get('/posts/:id', (req, res, next) => {
  if(!find(post => post.id === +req.params.id)){
    return res.json({
      error: "Post not exist"
    });
  }
  res.json({
    "data": find(post => post.id === +req.params.id)
  });
});

router.post('/posts', (req, res, next) => {
  var user_id = req.get('X-User-Id');
  push({
    id: nextId++,
    content: req.body.content,  
    winter: user_id
  });

  res.json({
    "data":{
      "id": find(post => post.id === nextId - 1).id
    }
  });
});

router.put('/posts/:postId', (req, res, next) => {
  var user_id = req.get("X-User-Id");
  var index = findIndex(post => post.id === +req.params.postId);
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
  var index = find(post => post.id === +req.params.postId);
  
  if (index.winter === +user_id){
    return res.json({
      data: "Successfully deleted",
    });
  }
  res.json({
    error: "Cannot delete post",
  });
});


export default router;