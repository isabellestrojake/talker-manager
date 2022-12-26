const validCredentials = (email, password) => {
  if (!email) { throw new Error('O campo "email" é obrigatório'); }

  if (!password) { throw new Error('O campo "password" é obrigatório'); }

  const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 

  const validEmail = regex.test(email);

  if (!validEmail) { throw new Error('O "email" deve ter o formato "email@email.com"'); }

  if (password.length < 6) { throw new Error('O "password" deve ter pelo menos 6 caracteres'); }
};

module.exports = validCredentials;
