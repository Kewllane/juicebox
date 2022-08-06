const express = require('express');
const { getAllTags, getPostsByTagName } = require('../db');
const tagsRouter = express.Router();

tagsRouter.use((req, res, next) => {
    console.log("A request is being made to /tags");
  
    next();
  });
  
  tagsRouter.get('/', async (req, res) => {
      const tags = await getAllTags();
  
    res.send({
      tags
    });
  });

  tagsRouter.get('/:tagName/posts', async (req, res, next) => {
    const { tagName } = req.params;
    try {
      const allTags = await getPostsByTagName(tagName);

      const tags = allTags.filter(tag => {
        if (tag.active) {
          return true;
        }
        if (req.user && tag.author.id === req.user.id) {
          return true;
        }
        return false;
      });

      res.send({ posts: tags });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

module.exports = tagsRouter;