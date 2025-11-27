// routes/authSocial.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
const User = require('../models/User');

// Twitter OAuth Start
router.get('/twitter', (req, res) => {
  const clientId = process.env.TWITTER_CLIENT_ID;
  const redirectUri = 'https://ghana-marketing-hub.vercel.app/callback/twitter';
  const url = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=tweet.read%20tweet.write%20users.read%20offline.access&state=ghana123&code_challenge=challenge&code_challenge_method=plain`;
  res.redirect(url);
});

// Facebook OAuth Start
router.get('/facebook', (req, res) => {
  const redirectUri = 'https://ghana-marketing-hub.vercel.app/callback/facebook';
  const url = `https://www.facebook.com/v20.0/dialog/oauth?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=pages_manage_posts,pages_read_engagement,instagram_basic,instagram_content_publish&state=ghana123`;
  res.redirect(url);
});

module.exports = router;