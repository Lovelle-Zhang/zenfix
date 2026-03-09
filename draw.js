const fs = require('fs');
const path = require('path');

// Vercel支持读取public目录
const dataDir = path.join(process.cwd(), 'data');

let cachedData = null;

function loadData() {
  if (cachedData) return cachedData;
  
  const oracles = {
    zenclaw: JSON.parse(fs.readFileSync(path.join(dataDir, 'zenclaw-oracles-v2.json'), 'utf8')).oracles,
    stoic: JSON.parse(fs.readFileSync(path.join(dataDir, 'stoic-oracles-v2.json'), 'utf8')).oracles,
    cyberzen: JSON.parse(fs.readFileSync(path.join(dataDir, 'cyberzen-oracles-v2.json'), 'utf8')).oracles,
    futureSurvivor: JSON.parse(fs.readFileSync(path.join(dataDir, 'future-survivor-oracles-v2.json'), 'utf8')).oracles
  };
  
  const aiInterpretations = JSON.parse(fs.readFileSync(path.join(dataDir, 'ai-interpretations.json'), 'utf8'));
  
  cachedData = { oracles, aiInterpretations };
  return cachedData;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = loadData();
    const { persona, category } = req.body;
    
    if (!data.oracles[persona]) {
      return res.status(400).json({ error: 'Invalid persona' });
    }
    
    const oracles = data.oracles[persona].filter(o => o.category === category);
    if (oracles.length === 0) {
      return res.status(404).json({ error: 'No oracles found' });
    }
    
    const oracle = oracles[Math.floor(Math.random() * oracles.length)];
    const interpretation = data.aiInterpretations[persona]?.[oracle.id]?.[0] || '解签暂未准备';
    
    res.json({ oracle, interpretation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
