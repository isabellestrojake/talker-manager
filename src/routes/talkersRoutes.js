const express = require('express');
const getTalkersData = require('../utils/fsUtils');

const router = express.Router();

router.get('/talker', async (req, res) => {
  const data = await getTalkersData();
  
 return res.status(200).json(data);
});

module.exports = router;