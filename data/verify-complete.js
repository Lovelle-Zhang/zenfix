const fs = require('fs');

console.log('=== Zenfix 签文库完整性检查 ===\n');

// 检查每个人格的签文数量
const files = [
  { name: 'ZenClaw', file: 'zenclaw-oracles-v3.json' },
  { name: 'Stoic', file: 'stoic-oracles-v3.json' },
  { name: 'Cyber-Zen', file: 'cyberzen-oracles-v2.json' },
  { name: 'Future-Survivor', file: 'futuresurvivor-oracles-v2.json' }
];

let totalOracles = 0;

files.forEach(({ name, file }) => {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const count = data.oracles.length;
  totalOracles += count;
  
  console.log(`${name}: ${count}条签文`);
  
  // 统计5级状态分布
  const levels = {};
  data.oracles.forEach(o => {
    levels[o.level] = (levels[o.level] || 0) + 1;
  });
  
  console.log('  状态分布:');
  Object.entries(levels).sort().forEach(([level, cnt]) => {
    console.log(`    ${level}: ${cnt}条`);
  });
  console.log('');
});

console.log(`总计: ${totalOracles}条签文\n`);

// 检查AI解析库
console.log('=== AI解析库检查 ===\n');
const aiData = JSON.parse(fs.readFileSync('ai-interpretations.json', 'utf8'));
console.log(`AI解析总数: ${aiData.interpretations.length}条\n`);

// 按人格统计AI解析
const aiByPersona = {};
aiData.interpretations.forEach(i => {
  const persona = i.oracleId.match(/^[A-Z]+/)?.[0] || i.oracleId.substring(0, 2);
  aiByPersona[persona] = (aiByPersona[persona] || 0) + 1;
});

console.log('AI解析分布:');
Object.entries(aiByPersona).forEach(([persona, count]) => {
  console.log(`  ${persona}: ${count}条`);
});
