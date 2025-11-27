const express = require('express');
const router = express.Router();
const ScheduledPost = require('../models/ScheduledPost');

// Get all scheduled posts for a user
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await ScheduledPost.find({ userId }).sort({ scheduledTime: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error: error.message });
  }
});

// Create a new scheduled post
router.post('/', async (req, res) => {
  try {
    const { userId, platforms, content, imageURL, scheduledTime } = req.body;
    
    const post = new ScheduledPost({
      userId,
      platforms,
      content,
      imageURL,
      scheduledTime,
      status: 'scheduled'
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error: error.message });
  }
});

// Update post status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const post = await ScheduledPost.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error: error.message });
  }
});

// Delete a post
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await ScheduledPost.findByIdAndDelete(id);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error: error.message });
  }
});

module.exports = router;