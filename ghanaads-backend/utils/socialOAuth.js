// utils/socialOAuth.js
const TWITTER_CLIENT_ID = process.env.TWITTER_CLIENT_ID;
const TWITTER_CLIENT_SECRET = process.env.TWITTER_CLIENT_SECRET;
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;

const FRONTEND_URL = 'https://ghana-marketing-hub.vercel.app';

module.exports = {
  twitterOAuthUrl: `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${TWITTER_CLIENT_ID}&redirect_uri=${FRONTEND_URL}/callback/twitter&scope=tweet.read%20tweet.write%20users.read%20offline.access&state=ghanaads&code_challenge=challenge&code_challenge_method=plain`,
  
  facebookOAuthUrl: `https://www.facebook.com/v20.0/dialog/oauth?client_id=${FACEBOOK_APP_ID}&redirect_uri=${FRONTEND_URL}/callback/facebook&scope=pages_manage_posts,pages_read_engagement,instagram_basic,instagram_content_publish&state=ghanaads`,

  FRONTEND_URL
};