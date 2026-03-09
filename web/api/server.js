const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// 使用相对路径(从api目录出发)
const publicPath = path.resolve(__dirname, '../public');
const dataPath = path.resolve(__dirname, '../../data');

console.log('Public path:', publicPath);
console.log('Data path:', dataPath);

// 静态文件
app.use(express.static(publicPath));

// 根路由
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// 全局变量
let personas = {};
let aiInterpretations = {};

// 读取数据
try {
  console.log('Loading data files...');
  
  personas.zenclaw = JSON.parse(fs.readFileSync(path.join(dataPath, 'zenclaw-oracles-v3.json'), 'utf8'));
  console.log('✓ Loaded zenclaw');
  
  personas.stoic = JSON.parse(fs.readFileSync(path.join(dataPath, 'stoic-oracles-v3.json'), 'utf8'));
  console.log('✓ Loaded stoic');
  
  personas.cyberzen = JSON.parse(fs.readFileSync(path.join(dataPath, 'cyberzen-oracles-v2.json'), 'utf8'));
  console.log('✓ Loaded cyberzen');
  
  personas.futuresurvivor = JSON.parse(fs.readFileSync(path.join(dataPath, 'futuresurvivor-oracles-v2.json'), 'utf8'));
  console.log('✓ Loaded futuresurvivor');
  
  aiInterpretations = JSON.parse(fs.readFileSync(path.join(dataPath, 'ai-interpretations.json'), 'utf8'));
  console.log('✓ Loaded AI interpretations');
  
  console.log('✓ All data loaded successfully!');
} catch (error) {
  console.error('✗ Error loading data:', error.message);
  console.error('Full error:', error);
  process.exit(1);
}

// API: 获取签文
app.post('/api/oracle', (req, res) => {
  const { persona, question } = req.body;
  
  if (!persona || !personas[persona]) {
    return res.status(400).json({ error: 'Invalid persona' });
  }
  
  const oracles = personas[persona].oracles;
  const randomOracle = oracles[Math.floor(Math.random() * oracles.length)];
  
  const personaKey = persona === 'futuresurvivor' ? 'futureSurvivor' : persona;
  const interpretation = aiInterpretations[personaKey]?.[randomOracle.id]?.[0] || '暂无解析';
  
  res.json({
    oracle: randomOracle,
    interpretation: interpretation,
    question: question
  });
});

// API: 获取所有人格列表
app.get('/api/personas', (req, res) => {
  res.json([
    { id: 'zenclaw', name: 'ZenClaw', desc: '赛博朋克黑客' },
    { id: 'stoic', name: 'Stoic', desc: '斯多葛哲学家' },
    { id: 'cyberzen', name: 'Cyber-Zen', desc: '自然禅意' },
    { id: 'futuresurvivor', name: 'Future-Survivor', desc: '未来幸存者' }
  ]);
});

app.listen(PORT, () => {
  console.log(`\n✓ Zenfix API running on http://localhost:${PORT}\n`);
});
