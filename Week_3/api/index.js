const express = require('express');
const app = express();

const postsRouter = require('./posts');
const authRouter = require('./auth');
app.use('/api/posts', postsRouter);
app.use('/api/auth', authRouter);

module.exports = app