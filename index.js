const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data');

const oracles = {
  zenclaw: JSON.parse(fs.readFileSync(path.join(dataPath, 'zenclaw-oracles-v2.json'), 'utf8')),
  stoic: JSON.parse(fs.readFileSync(path.join(dataPath, 'stoic-oracles-v2.json'), 'utf8')),
  cyberzen: JSON.parse(fs.readFileSync(path.join(dataPath, 'cyberzen-oracles-v2.json'), 'utf8')),
  futureSurvivor: JSON.parse(fs.readFileSync(path.join(dataPath, 'future-survivor-oracles-v2.json'), 'utf8'))
};

const aiInterpretations = JSON.parse(fs.readFileSync(path.join(dataPath, 'ai-interpretations.json'), 'utf8'));

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  
  if (url.pathname === '/api/personas') {
    return res.json([
      { id: 'zenclaw', name: 'ZenClaw', desc: '冷峻洞察' },
      { id: 'cyberzen', name: 'Cyber-Zen', desc: '温暖诗意' },
      { id: 'stoic', name: 'Stoic', desc: '理性力量' },
      { id: 'futureSurvivor', name: 'Future-Survivor', desc: '长期希望' }
    ]);
  }
  
  if (url.pathname === '/api/categories') {
    return res.json(['事业', '感情', '健康', '财运', '人际', '成长']);
  }
  
  if (url.pathname === '/api/draw' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const { persona, category } = JSON.parse(body);
      const oracleList = oracles[persona].filter(o => o.category === category);
      const oracle = oracleList[Math.floor(Math.random() * oracleList.length)];
      const interpretation = aiInterpretations[persona][oracle.id][0];
      res.json({ oracle, interpretation });
    });
    return;
  }
  
  res.status(404).json({ error: 'Not found' });
};
