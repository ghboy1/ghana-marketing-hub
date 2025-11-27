const express = require('express');
const router = express.Router();
const Analytics = require('../models/Analytics');

// Get analytics for a user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { startDate, endDate } = req.query;

    const query = { userId };
    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const analytics = await Analytics.find(query).sort({ date: -1 });
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analytics', error: error.message });
  }
});

// Add analytics data (for testing/demo)
router.post('/', async (req, res) => {
  try {
    const { userId, date, platform, metrics } = req.body;
    
    const analytics = new Analytics({
      userId,
      date,
      platform,
      metrics
    });

    await analytics.save();
    res.status(201).json(analytics);
  } catch (error) {
    res.status(500).json({ message: 'Error saving analytics', error: error.message });
  }
});

// Get Ghana hashtag suggestions
router.get('/hashtags/:keyword', (req, res) => {
  const { keyword } = req.params;
  
  const ghanaHashtags = {
    accra: ['#Accra', '#AccraMoments', '#AccraGhana', '#GhanaLife', '#VisitGhana'],
    food: ['#GhanaFood', '#JollofWars', '#GhanaianCuisine', '#Waakye', '#Banku'],
    business: ['#GhanaBusiness', '#MadeInGhana', '#GhanaEntrepreneur', '#AccraBusiness'],
    culture: ['#GhanaCulture', '#GhanaianCulture', '#ProudlyGhanaian', '#GhanaVibes'],
    fashion: ['#GhanaFashion', '#AfricanFashion', '#GhanaStyle', '#AnkaraStyles']
  };

  const suggestions = ghanaHashtags[keyword.toLowerCase()] || ['#Ghana', '#GhanaLife'];
  res.json({ keyword, suggestions });
});

module.exports = router;