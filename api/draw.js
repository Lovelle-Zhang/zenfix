const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const dataPath = path.join(process.cwd(), 'data');
  
  const oracles = {
    zenclaw: JSON.parse(fs.readFileSync(path.join(dataPath, 'zenclaw-oracles-v2.json'), 'utf8')),
    stoic: JSON.parse(fs.readFileSync(path.join(dataPath, 'stoic-oracles-v2.json'), 'utf8')),
    cyberzen: JSON.parse(fs.readFileSync(path.join(dataPath, 'cyberzen-oracles-v2.json'), 'utf8')),
    futureSurvivor: JSON.parse(fs.readFileSync(path.join(dataPath, 'future-survivor-oracles-v2.json'), 'utf8'))
  };
  
  const aiInterpretations = JSON.parse(fs.readFileSync(path.join(dataPath, 'ai-interpretations.json'), 'utf8'));
  
  const { persona, category } = req.body;
  const oracleList = oracles[persona].filter(o => o.category === category);
  const oracle = oracleList[Math.floor(Math.random() * oracleList.length)];
  const interpretation = aiInterpretations[persona][oracle.id][0];
  
  res.json({ oracle, interpretation });
};
