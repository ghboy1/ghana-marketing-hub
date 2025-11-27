const express = require('express');
const path = require('path');
const { generateReport } = require('../utils/pdfGenerator');

const router = express.Router();

// Generate PDF Report
router.post('/generate', async (req, res) => {
  try {
    const { userId, dateRange, businessName, metrics } = req.body;
    
    const reportData = {
      businessName,
      dateRange,
      totalEngagement: metrics.totalEngagement || 5000,
      avgEngagement: metrics.avgEngagement || 250,
      totalReach: metrics.totalReach || 50000,
      topPosts: metrics.topPosts || []
    };

    const fileName = `report-${userId}-${Date.now()}.pdf`;
    const filePath = path.join(__dirname, '../reports', fileName);

    await generateReport(reportData, filePath);

    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error('Download error:', err);
      }
      // Optionally delete file after download
      // fs.unlinkSync(filePath);
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generating report', error: error.message });
  }
});

module.exports = router;