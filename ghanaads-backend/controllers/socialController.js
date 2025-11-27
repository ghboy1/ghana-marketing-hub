// controllers/socialController.js
const User = require('../models/User');
const axios = require('axios');

const saveTwitterTokens = async (userId, tokens) => {
  await User.findByIdAndUpdate(userId, {
    'socialTokens.twitter': {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresAt: new Date(Date.now() + tokens.expires_in * 1000),
      userId: tokens.user_id,
      username: tokens.username
    }
  });
};

const saveFacebookTokens = async (userId, longLivedToken, pages) => {
  const page = pages.data[0]; // take first page
  const igResponse = await axios.get(`https://graph.facebook.com/${page.id}?fields=instagram_business_account&access_token=${longLivedToken}`);
  
  await User.findByIdAndUpdate(userId, {
    'socialTokens.facebook': {
      accessToken: longLivedToken,
      userId: page.id,
      pageId: page.id,
      pageName: page.name,
      instagramId: igResponse.data.instagram_business_account?.id || null
    }
  });
};

module.exports = { saveTwitterTokens, saveFacebookTokens };