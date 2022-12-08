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
    // console.log(req.user); THESE WORK
    // console.log(req.body.content);
    try {
      if (req.body.content.length > 255) {
        res.statusMessage = '255 characters';
        res.status(400).end();
      }
      const post = await Post.insert({
        user_id: req.user.id,
        content: req.body.content,
        title: req.body.title,
      });
      
      res.json(post);
    } catch (error) {
      next(error);
    }
  });
