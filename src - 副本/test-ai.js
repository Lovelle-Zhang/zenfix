/**
 * Zenfix - 测试真实AI解签
 */

const AIInterpreter = require('./ai-interpreter');
const OracleMatcher = require('./oracle-matcher');

// 彩色输出
const colors = {
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  magenta: '\x1b[35m',
  reset: '\x1b[0m',
  dim: '\x1b[2m'
};

async function testAIInterpretation() {
  console.log(`${colors.cyan}╔════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.cyan}║     Zenfix - AI解签功能测试           ║${colors.reset}`);
  console.log(`${colors.cyan}╚════════════════════════════════════════╝${colors.reset}\n`);

  // 初始化
  const matcher = new OracleMatcher();
  
  // 从环境变量或命令行参数获取API Key
  const apiKey = process.env.OPENAI_API_KEY || process.argv[2];
  
  if (!apiKey) {
    console.log(`${colors.yellow}⚠️  未设置API Key${colors.reset}`);
    console.log(`${colors.dim}使用方法：${colors.reset}`);
    console.log(`${colors.dim}1. 设置环境变量: set OPENAI_API_KEY=your_key${colors.reset}`);
    console.log(`${colors.dim}2. 或命令行参数: node src/test-ai.js your_key${colors.reset}`);
    console.log(`\n${colors.yellow}将使用降级方案（返回签文原文）${colors.reset}\n`);
  }
  
  const interpreter = new AIInterpreter({
    provider: 'openai',
    apiKey: apiKey,
    model: 'gpt-4o-mini',
    baseURL: 'api.openai.com'
  });

  // 测试场景
  const testCase = {
    persona: 'zenclaw',
    category: '事业',
    emotions: ['焦虑', '迷茫'],
    userContext: '我做了一个项目6个月了，一直没看到成果，很焦虑，不知道该继续还是放弃。'
  };

  console.log(`${colors.green}测试场景：${colors.reset}`);
  console.log(`  人格: ${testCase.persona}`);
  console.log(`  类别: ${testCase.category}`);
  console.log(`  情绪: ${testCase.emotions.join('、')}`);
  console.log(`  情境: ${testCase.userContext}`);
  console.log('');

  // 匹配签文
  console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`${colors.cyan}第一步：匹配签文${colors.reset}`);
  console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

  const oracle = matcher.match(
    testCase.persona,
    testCase.category,
    testCase.emotions
  );

  if (!oracle) {
    console.log(`${colors.yellow}❌ 未找到匹配的签文${colors.reset}`);
    return;
  }

  console.log(`${colors.green}✅ 匹配成功${colors.reset}`);
  console.log(`  签文ID: ${oracle.id}`);
  console.log(`  主题: ${oracle.theme}`);
  console.log(`  等级: ${oracle.level}`);
  console.log('');

  // AI解签
  console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`${colors.cyan}第二步：AI解签${colors.reset}`);
  console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

  try {
    const interpretation = await interpreter.interpret(
      oracle,
      testCase.userContext,
      testCase.persona
    );

    console.log(`${colors.magenta}╔════════════════════════════════════════╗${colors.reset}`);
    console.log(`${colors.magenta}║           AI 解签结果                  ║${colors.reset}`);
    console.log(`${colors.magenta}╚════════════════════════════════════════╝${colors.reset}\n`);
    
    console.log(interpretation);
    console.log('');
    
    console.log(`${colors.green}✅ 测试完成！${colors.reset}\n`);
    
  } catch (error) {
    console.log(`${colors.yellow}❌ AI解签失败: ${error.message}${colors.reset}`);
    console.log(`${colors.dim}将使用降级方案${colors.reset}\n`);
    
    const fallback = interpreter.fallbackInterpretation(oracle, testCase.persona);
    console.log(`${colors.magenta}╔════════════════════════════════════════╗${colors.reset}`);
    console.log(`${colors.magenta}║        降级方案（签文原文）            ║${colors.reset}`);
    console.log(`${colors.magenta}╚════════════════════════════════════════╝${colors.reset}\n`);
    console.log(fallback);
    console.log('');
  }
}

// 运行测试
testAIInterpretation().catch(error => {
  console.error('测试失败:', error);
  process.exit(1);
});
