const validCredentials = (email, password) => {
  if (!email) { throw new Error('O campo de *e-mail* é obrigatório!'); }

  if (!password) { throw new Error('O campo de *senha* é obrigatório!'); }

  const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 

  const validEmail = regex.test(email);

  if (!validEmail) { throw new Error('Utilize o formato exemplo@exemplo.com'); }

  if (password.length < 6) { throw new Error('Sua senha deve ter pelo menos *6* caracteres'); }
};

module.exports = validCredentials;
