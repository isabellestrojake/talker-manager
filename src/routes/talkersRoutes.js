const express = require('express');
const { writeFile } = require('fs/promises');
const path = require('path');
const { getTalkersData, 
  getTalkersId, 
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  rateValidation } = require('../utils/fsUtils');

const dataBase = path.resolve(__dirname, '../talker.json');

const router = express.Router();

const HTTP_OK_STATUS = 200;
const HTTP_NOTFOUND_STATUS = 404;
const HTTP_CREATED_STATUS = 201;
const HTTP_NOCONTENT_STATUS = 204;

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

router.post('/talker',
tokenValidation, nameValidation, 
ageValidation, talkValidation, rateValidation, async (req, res) => {
  const { name, age, talk } = req.body;

  const talkers = await getTalkersData();

  const id = talkers.length + 1;

  const newTalker = {
    id,
    name,
    age,
    talk,
  };
  const newTalkersData = [...talkers, newTalker];

  await writeFile(dataBase, JSON.stringify(newTalkersData));

  return res.status(HTTP_CREATED_STATUS).json(newTalker);
});

router.put('/talker/:id', 
tokenValidation, nameValidation, 
ageValidation, talkValidation, rateValidation, async (req, res) => {
  const { id } = req.params;

  const { name, age, talk } = req.body;

  const talkers = await getTalkersData();

  const newTalker = {
    id: Number(id),
    name,
    age,
    talk,
  };

  const filtering = talkers.filter((talker) => Number(talker.id) !== Number(id));
  filtering.push(newTalker);

  await writeFile(dataBase, JSON.stringify(filtering));
  return res.status(200).json(newTalker);
});

router.delete('/talker/:id', tokenValidation, async (req, res) => {
  const { id } = req.params;

  const data = await getTalkersData();

  const filtering = data.filter((talker) => Number(talker.id) !== Number(id));

  await writeFile(dataBase, JSON.stringify(filtering));

  return res.status(HTTP_NOCONTENT_STATUS).json('');
});

module.exports = router;