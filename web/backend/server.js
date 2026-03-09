const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// 内嵌数据（避免文件路径问题）
const data = require('./data.js');

// API: 抽签
app.post('/api/draw', (req, res) => {
  const { persona, category } = req.body;
  
  if (!data.oracles[persona]) {
    return res.status(400).json({ error: 'Invalid persona' });
  }
  
  const oracles = data.oracles[persona].filter(o => o.category === category);
  if (oracles.length === 0) {
    return res.status(404).json({ error: 'No oracles found' });
  }
  
  const oracle = oracles[Math.floor(Math.random() * oracles.length)];
  const interpretation = data.aiInterpretations[persona][oracle.id][0];
  
  res.json({ oracle, interpretation });
});

// API: 获取人格列表
app.get('/api/personas', (req, res) => {
  res.json([
    { id: 'zenclaw', name: 'ZenClaw', desc: '冷峻洞察' },
    { id: 'cyberzen', name: 'Cyber-Zen', desc: '温暖诗意' },
    { id: 'stoic', name: 'Stoic', desc: '理性力量' },
    { id: 'futureSurvivor', name: 'Future-Survivor', desc: '长期希望' }
  ]);
});

// API: 获取类别列表
app.get('/api/categories', (req, res) => {
  res.json(['事业', '感情', '健康', '财运', '人际', '成长']);
});

app.listen(PORT, () => {
  console.log(`Zenfix running on port ${PORT}`);
});

module.exports = app;
