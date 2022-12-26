const fs = require('fs').promises;
const path = require('path');

const dataBase = path.resolve(__dirname, '../talker.json');

const BDR = 400;
// HTTP_BADREQUEST_STATUS
const HTTP_UNAUTHORIZED_STATUS = 401;

async function getTalkersData() {
  try {
    const response = await fs.readFile(dataBase);

    const data = JSON.parse(response);
    
    return data;
  } catch (err) {
      console.error(err);
    }
  }

async function getTalkersId(talkId) {
  try {
    const data = await getTalkersData();

    const idFilter = data.filter(({ id }) => id === talkId);

    return idFilter;
  } catch (err) {
    console.error(err);
  }
}

function tokenValidation(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Token não encontrado' });
  }

  if (authorization.length !== 16) {
    return res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Token inválido' });
  }

  next();
}

function nameValidation(req, res, next) {
  const { name } = req.body;

  if (!name) {
    return res.status(BDR).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(BDR).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
}

function ageValidation(req, res, next) {
  const { age } = req.body;

  const legalAge = 18;

  if (!age) {
    return res.status(BDR).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < legalAge) {
    return res.status(BDR).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  
  next();
}

function talkValidation(req, res, next) {
  const { talk } = req.body;

  const regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/; 

  if (!talk) {
    return res.status(BDR).json({ message: 'O campo "talk" é obrigatório' });
  }
  if (!talk.watchedAt) {
    return res.status(BDR).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!regex.test(talk.watchedAt)) {
    return res.status(BDR).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (!talk.rate) {
    return res.status(BDR).json({ message: 'O campo "rate" é obrigatório' });
  }
  
  next();
}

function rateValidation(req, res, next) {
  const { talk } = req.body;

  if (!talk.rate) {
    return res.status(BDR).json({ message: 'O campo "rate" é obrigatório' });
  }

  if ((Number(talk.rate) < 1 || Number(talk.rate) > 5) || !Number.isInteger(talk.rate)) {
    return res.status(BDR).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
}

module.exports = { 
  getTalkersData,
  getTalkersId,
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  rateValidation,
};