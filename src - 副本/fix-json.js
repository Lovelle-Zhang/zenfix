/**
 * 重新生成JSON文件（无BOM）
 */

const fs = require('fs');
const path = require('path');

// 读取现有文件并重新写入（去除BOM）
const dataDir = path.join(__dirname, '../data');
const files = [
  'zenclaw-oracles-v2.json',
  'cyber-zen-oracles-v2.json',
  'stoic-oracles-v2.json',
  'future-survivor-oracles-v2.json'
];

console.log('正在修复JSON文件...\n');

files.forEach(filename => {
  const filePath = path.join(dataDir, filename);
  
  try {
    // 读取文件内容
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 移除BOM
    if (content.charCodeAt(0) === 0xFEFF) {
      content = content.slice(1);
      console.log(`✓ 移除BOM: ${filename}`);
    }
    
    // 验证JSON格式
    JSON.parse(content);
    
    // 重新写入（无BOM）
    fs.writeFileSync(filePath, content, { encoding: 'utf8' });
    console.log(`✓ 修复完成: ${filename}`);
    
  } catch (error) {
    console.error(`✗ 修复失败: ${filename}`, error.message);
  }
});

console.log('\n所有文件修复完成！');
