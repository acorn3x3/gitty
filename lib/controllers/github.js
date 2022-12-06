const { Router } = require('express');
const {
  getGithubToken,
  getGitHubProfile,
} = require('../services/GitHubService');

module.exports = Router()
  .get('/login', (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}&scope=user&redirect_uri=${process.env.GH_REDIRECT_URI}`
    );
  })
  .get('/callback', async (req, res) => {
    const { code } = req.query;
   
    const token = await getGithubToken(code);
    
    const user = await getGitHubProfile(token);
    console.log(user);
    res.json({ user });
  });
