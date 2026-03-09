const fs = require('fs');

// 读取所有签文库
const zenclaw = JSON.parse(fs.readFileSync('zenclaw-oracles-v3.json', 'utf8'));
const stoic = JSON.parse(fs.readFileSync('stoic-oracles-v3.json', 'utf8'));
const cyberzen = JSON.parse(fs.readFileSync('cyberzen-oracles-v2.json', 'utf8'));
const futuresurvivor = JSON.parse(fs.readFileSync('futuresurvivor-oracles-v2.json', 'utf8'));

// 读取AI解析库
const aiData = JSON.parse(fs.readFileSync('ai-interpretations.json', 'utf8'));

console.log('=== 签文库检查 ===\n');

// 检查每个人格的签文数量和5级状态分布
const personas = [
  { name: 'ZenClaw', data: zenclaw, prefix: '0x' },
  { name: 'Stoic', data: stoic, prefix: 'ST' },
  { name: 'Cyber-Zen', data: cyberzen, prefix: 'CZ' },
  { name: 'Future-Survivor', data: futuresurvivor, prefix: 'FS' }
];

let totalOracles = 0;
const missingAI = [];

personas.forEach(({ name, data, prefix }) => {
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
  
  // 检查AI解析
  const aiSection = aiData[name.toLowerCase().replace('-', '')] || {};
  let aiCount = 0;
  
  data.oracles.forEach(o => {
    if (aiSection[o.id]) {
      aiCount++;
    } else {
      missingAI.push(`${name}: ${o.id}`);
    }
  });
  
  console.log(`  AI解析: ${aiCount}/${count}条`);
  console.log('');
});

console.log(`总计: ${totalOracles}条签文\n`);

if (missingAI.length > 0) {
  console.log('=== 缺失的AI解析 ===\n');
  missingAI.forEach(m => console.log(m));
  console.log(`\n总计缺失: ${missingAI.length}条`);
} else {
  console.log('✅ 所有签文都有对应的AI解析!');
}
