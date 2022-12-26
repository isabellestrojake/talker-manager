const fs = require('fs').promises;
const path = require('path');

const dataBase = path.resolve(__dirname, '../talker.json');

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

module.exports = { 
  getTalkersData,
  getTalkersId,
};