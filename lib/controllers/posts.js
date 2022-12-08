const { Router } = require('express');
const Post = require('../models/Post.js');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const posts = await Post.getAll();
      res.json(posts);
    } catch (error) {
      next(error);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      if (req.body.content.length > 255) {
        res.statusMessage = 'Limit is 255 characters';
        res.status(400).end();
      } else {
        const post = await Post.insert({
          title: req.body.title,
          content: req.body.content,
        });
        res.json(post);
      }
    } catch (e) {
      next(e);
    }
  });
