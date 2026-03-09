const fs = require('fs');
const path = require('path');

// 动态加载数据文件
const dataPath = path.join(__dirname, '../../data');

const oracles = {
  zenclaw: JSON.parse(fs.readFileSync(path.join(dataPath, 'zenclaw-oracles-v2.json'), 'utf8')),
  stoic: JSON.parse(fs.readFileSync(path.join(dataPath, 'stoic-oracles-v2.json'), 'utf8')),
  cyberzen: JSON.parse(fs.readFileSync(path.join(dataPath, 'cyberzen-oracles-v2.json'), 'utf8')),
  futureSurvivor: JSON.parse(fs.readFileSync(path.join(dataPath, 'future-survivor-oracles-v2.json'), 'utf8'))
};

const aiInterpretations = JSON.parse(fs.readFileSync(path.join(dataPath, 'ai-interpretations.json'), 'utf8'));

module.exports = {
  oracles,
  aiInterpretations
};
