const express = require('express');

const posts = express();
const content = require('../models/content');

posts.get('/', async (req, res) => {
  res.json({ data: await content.findAll({})});
});

posts.get('/:id', async (req, res) => {
  const { id } = req.params;
  if(await content.findOne({ where: { id }})){
    return res.json({
      data: await content.findOne({
          attributes: ['id', 'content', 'writer'],
          where: { id }
        }),
    });
  }
  res.json({
    data: "Post not exist",
  })
});

posts.post('/', async (req, res) => {
  var user_id = req.get('X-User-Id');
  content.create({
    content: req.body.content,
    writer: user_id,
  });
  res.json({
    data: {
      id: await content.max('id').then(max => {return max})
    }
  })
});

posts.put('/:postId', async (req, res) => {
  var user_id = req.get('X-User-Id');
  const user_data = await content.findOne({
    where: { id: req.params.postId }
  });

  if(user_data.id == user_id){
    await content.update({
      content: req.body.content,
    }, {
      where: { id: req.params.postId }
    });
    return res.json({
      data: {
        id: user_data.id
      }
    });
  }
  res.json({
    error: "Cannot modify post",
  });
})

posts.delete('/:postId', async (req, res) => {
  var user_id = req.get('X-User-Id');
  var user_data = await content.findOne({
    where: { writer: user_id },
  });
  if(user_id == user_data.writer){
    await content.destroy({
      where: { id: req.params.postId }
    })
    return res.json({
      data: "Successfully deleted",
    });
  }
  res.json({
    error: "Cannot delete post",
  });
});

module.exports = posts