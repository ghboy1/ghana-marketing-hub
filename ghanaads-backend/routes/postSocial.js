// routes/postSocial.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const axios = require('axios');

router.post('/publish', async (req, res) => {
  try {
    const { userId, content } = req.body;
    const user = await User.findById(userId || "66f8a1b2c3d4e5f6a7b8c9d0"); // fallback for testing

    if (!user) return res.status(404).json({ error: "User not found" });

    const results = [];

    // TWITTER
    if (user.socialTokens?.twitter?.accessToken) {
      try {
        await axios.post('https://api.twitter.com/2/tweets', 
          { text: content },
          { headers: { Authorization: `Bearer ${user.socialTokens.twitter.accessToken}` }}
        );
        results.push("Twitter/X");
      } catch (e) { console.log("Twitter failed:", e.response?.data) }
    }

    // FACEBOOK + INSTAGRAM
    if (user.socialTokens?.facebook?.accessToken) {
      const token = user.socialTokens.facebook.accessToken;

      // Facebook Page
      if (user.socialTokens.facebook.pageId) {
        await axios.post(`https://graph.facebook.com/${user.socialTokens.facebook.pageId}/feed`, {
          message: content,
          access_token: token
        });
        results.push("Facebook");
      }

      // Instagram
      if (user.socialTokens.facebook.instagramId) {
        const creation = await axios.post(`https://graph.facebook.com/${user.socialTokens.facebook.instagramId}/media`, {
          caption: content,
          image_url: "https://ghana-marketing-hub.vercel.app/og-image.jpg",
          access_token: token
        });
        await axios.post(`https://graph.facebook.com/${user.socialTokens.facebook.instagramId}/media_publish`, {
          creation_id: creation.data.id,
          access_token: token
        });
        results.push("Instagram");
      }
    }

    res.json({ success: true, postedTo: results.length > 0 ? results : ["none"] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Post failed" });
  }
});

module.exports = router;