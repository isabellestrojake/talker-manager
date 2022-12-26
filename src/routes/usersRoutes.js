const express = require('express');

const tokenGenerator = require('../utils/tokenUtils');

const validCredentials = require('../utils/validCredentials');

const router = express.Router();

const HTTP_OK_STATUS = 200;
const HTTP_BADREQUEST_STATUS = 400;

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    validCredentials(email, password);

    const token = tokenGenerator();

    return res.status(HTTP_OK_STATUS).json({ token });
  } catch (err) {
    return res.status(HTTP_BADREQUEST_STATUS).json({ message: 'err.message' });
  }
});

module.exports = router;