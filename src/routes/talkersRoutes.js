const express = require('express');
const { getTalkersData, getTalkersId } = require('../utils/fsUtils');

const router = express.Router();

const HTTP_OK_STATUS = 200;
const HTTP_NOTFOUND_STATUS = 404;

router.get('/talker', async (req, res) => {
  const data = await getTalkersData();
  
 return res.status(HTTP_OK_STATUS).json(data);
});

router.get('/talker/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    const data = await getTalkersId(id);

    if (data === undefined || data.length === 0) {
      throw new Error();
    }

    return res.status(HTTP_OK_STATUS).json(data[0]);
  } catch (err) {
    return res.status(HTTP_NOTFOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }
}); 

module.exports = router;