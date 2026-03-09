/**
 * 测试签文匹配引擎
 */

const OracleMatcher = require('./oracle-matcher');

console.log('\n╔════════════════════════════════════════╗');
console.log('║     Zenfix 签文匹配引擎测试           ║');
console.log('╚════════════════════════════════════════╝\n');

const matcher = new OracleMatcher();

// 测试1: 类别匹配
console.log('\n━━━ 测试1: 类别匹配（事业 + 焦虑/期待）━━━');
try {
  const oracle1 = matcher.match({
    category: '事业',
    emotions: ['焦虑', '期待'],
    persona: 'zenclaw'
  });
  console.log('\n✅ 匹配成功');
  console.log(`   ID: ${oracle1.id}`);
  console.log(`   类别: ${oracle1.category}`);
  console.log(`   等级: ${oracle1.level}`);
  console.log(`   主题: ${oracle1.theme}`);
  console.log(`   关键词: ${oracle1.keywords.join(', ')}`);
} catch (error) {
  console.error('❌ 测试失败:', error.message);
}

// 测试2: 随机抽签
console.log('\n━━━ 测试2: 随机抽签（Cyber-Zen）━━━');
try {
  const oracle2 = matcher.random('cyberzen');
  console.log('\n✅ 抽签成功');
  console.log(`   ID: ${oracle2.id}`);
  console.log(`   类别: ${oracle2.category}`);
  console.log(`   等级: ${oracle2.level}`);
  console.log(`   主题: ${oracle2.theme}`);
} catch (error) {
  console.error('❌ 测试失败:', error.message);
}

// 测试3: 不同人格对比
console.log('\n━━━ 测试3: 不同人格对比（感情类）━━━');
const personas = ['zenclaw', 'cyberzen', 'stoic', 'futureSurvivor'];
const personaNames = {
  zenclaw: 'ZenClaw',
  cyberzen: 'Cyber-Zen',
  stoic: 'Stoic',
  futureSurvivor: 'Future-Survivor'
};

personas.forEach(persona => {
  try {
    const oracle = matcher.match({
      category: '感情',
      emotions: ['痛苦', '怀疑'],
      persona: persona
    });
    console.log(`\n${personaNames[persona]}:`);
    console.log(`   ID: ${oracle.id} | 等级: ${oracle.level} | 主题: ${oracle.theme}`);
  } catch (error) {
    console.error(`❌ ${personaNames[persona]} 测试失败:`, error.message);
  }
});

// 测试4: 情绪匹配
console.log('\n━━━ 测试4: 情绪匹配测试━━━');
const testEmotions = [
  ['焦虑', '期待'],
  ['迷茫', '压力'],
  ['痛苦', '怀疑'],
  ['温暖', '幸福']
];

testEmotions.forEach(emotions => {
  try {
    const oracle = matcher.match({
      emotions: emotions,
      persona: 'stoic'
    });
    console.log(`\n情绪: ${emotions.join('、')}`);
    console.log(`   匹配: ${oracle.category} | ${oracle.theme}`);
    console.log(`   签文情绪: ${oracle.emotionTags.join('、')}`);
  } catch (error) {
    console.error(`❌ 情绪 ${emotions.join('、')} 测试失败:`, error.message);
  }
});

// 测试5: 获取可用选项
console.log('\n━━━ 测试5: 获取可用选项━━━');
console.log('\n可用类别:', matcher.getCategories().join('、'));
console.log('\n可用情绪:', matcher.getEmotions().slice(0, 10).join('、'), '...');

console.log('\n\n✅ 所有测试完成\n');
