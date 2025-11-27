const express = require('express');
const router = express.Router();
const Competitor = require('../models/Competitor');

// Get all competitors for a user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const competitors = await Competitor.find({ userId });
    res.json(competitors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching competitors', error: error.message });
  }
});

// Add a new competitor
router.post('/', async (req, res) => {
  try {
    const { userId, competitorHandle, platform, followers, avgEngagement, notes } = req.body;
    
    // Check if competitor already exists
    const existingCompetitor = await Competitor.findOne({ 
      userId, 
      competitorHandle, 
      platform 
    });
    
    if (existingCompetitor) {
      return res.status(400).json({ message: 'Competitor already tracked' });
    }

    const competitor = new Competitor({
      userId,
      competitorHandle,
      platform,
      followers: followers || 0,
      avgEngagement: avgEngagement || 0,
      notes: notes || ''
    });

    await competitor.save();
    res.status(201).json(competitor);
  } catch (error) {
    res.status(500).json({ message: 'Error adding competitor', error: error.message });
  }
});

// Update competitor metrics
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { followers, avgEngagement, notes } = req.body;

    const competitor = await Competitor.findByIdAndUpdate(
      id,
      { followers, avgEngagement, notes },
      { new: true }
    );

    if (!competitor) {
      return res.status(404).json({ message: 'Competitor not found' });
    }

    res.json(competitor);
  } catch (error) {
    res.status(500).json({ message: 'Error updating competitor', error: error.message });
  }
});

// Delete a competitor
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const competitor = await Competitor.findByIdAndDelete(id);

    if (!competitor) {
      return res.status(404).json({ message: 'Competitor not found' });
    }

    res.json({ message: 'Competitor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting competitor', error: error.message });
  }
});

// Get competitor comparison data
router.get('/compare/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const competitors = await Competitor.find({ userId });
    
    // Format data for comparison charts
    const comparisonData = competitors.map(c => ({
      name: c.competitorHandle,
      platform: c.platform,
      followers: c.followers,
      avgEngagement: c.avgEngagement
    }));

    res.json(comparisonData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comparison data', error: error.message });
  }
});

module.exports = router;