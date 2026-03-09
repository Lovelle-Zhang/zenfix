const fs = require('fs');

// 读取并统计ZenClaw
const zenclaw = JSON.parse(fs.readFileSync('zenclaw-oracles-v3.json', 'utf8'));
const zenclawStats = {};
zenclaw.oracles.forEach(o => {
  zenclawStats[o.level] = (zenclawStats[o.level] || 0) + 1;
});

console.log('=== ZenClaw 状态分布 ===');
console.log('总计:', zenclaw.oracles.length, '条');
Object.entries(zenclawStats).sort().forEach(([level, count]) => {
  console.log(`${level}: ${count}条`);
});

// 读取并统计Stoic
const stoic = JSON.parse(fs.readFileSync('stoic-oracles-v3.json', 'utf8'));
const stoicStats = {};
stoic.oracles.forEach(o => {
  stoicStats[o.level] = (stoicStats[o.level] || 0) + 1;
});

console.log('\n=== Stoic 状态分布 ===');
console.log('总计:', stoic.oracles.length, '条');
Object.entries(stoicStats).sort().forEach(([level, count]) => {
  console.log(`${level}: ${count}条`);
});

// 读取并统计Cyber-Zen
const cyberzen = JSON.parse(fs.readFileSync('cyberzen-oracles-v2.json', 'utf8'));
const cyberzenStats = {};
cyberzen.oracles.forEach(o => {
  cyberzenStats[o.level] = (cyberzenStats[o.level] || 0) + 1;
});

console.log('\n=== Cyber-Zen 状态分布 ===');
console.log('总计:', cyberzen.oracles.length, '条');
Object.entries(cyberzenStats).sort().forEach(([level, count]) => {
  console.log(`${level}: ${count}条`);
});

// 读取并统计Future-Survivor
const fs_data = JSON.parse(fs.readFileSync('futuresurvivor-oracles-v2.json', 'utf8'));
const fsStats = {};
fs_data.oracles.forEach(o => {
  fsStats[o.level] = (fsStats[o.level] || 0) + 1;
});

console.log('\n=== Future-Survivor 状态分布 ===');
console.log('总计:', fs_data.oracles.length, '条');
Object.entries(fsStats).sort().forEach(([level, count]) => {
  console.log(`${level}: ${count}条`);
});
