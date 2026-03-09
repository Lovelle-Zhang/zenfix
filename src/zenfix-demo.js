/**
 * Zenfix - Demo演示模式（简化版 - 冥想抽签）
 * 自动循环展示4个AI人格的抽签流程
 */

const OracleMatcher = require('./oracle-matcher');
const AIInterpreter = require('./ai-interpreter');
const fs = require('fs');
const path = require('path');

// 彩色输出
const colors = {
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  magenta: '\x1b[35m',
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  bold: '\x1b[1m'
};

class ZenfixDemo {
  constructor() {
    this.matcher = new OracleMatcher();
    this.interpreter = new AIInterpreter();
    
    // 加载AI解签示例库
    try {
      const aiInterpretationsPath = path.join(__dirname, '../data/ai-interpretations.json');
      this.aiInterpretations = JSON.parse(fs.readFileSync(aiInterpretationsPath, 'utf8'));
      console.log('✅ AI解签示例库加载成功');
    } catch (error) {
      console.warn('⚠️  AI解签示例库加载失败，将使用降级方案');
      this.aiInterpretations = {};
    }
    
    // 演示场景
    this.scenarios = [
      {
        persona: 'zenclaw',
        personaName: 'ZenClaw - 冷峻洞察',
        category: '事业'
      },
      {
        persona: 'cyberzen',
        personaName: 'Cyber-Zen - 温暖诗意',
        category: '感情'
      },
      {
        persona: 'stoic',
        personaName: 'Stoic - 理性力量',
        category: '事业'
      },
      {
        persona: 'futureSurvivor',
        personaName: 'Future-Survivor - 长期希望',
        category: '成长'
      }
    ];
    
    this.currentIndex = 0;
  }

  /**
   * 启动Demo
   */
  async start() {
    console.log(`${colors.cyan}╔════════════════════════════════════════╗${colors.reset}`);
    console.log(`${colors.cyan}║                                        ║${colors.reset}`);
    console.log(`${colors.cyan}║        ${colors.bold}Z E N F I X  D E M O${colors.reset}${colors.cyan}          ║${colors.reset}`);
    console.log(`${colors.cyan}║                                        ║${colors.reset}`);
    console.log(`${colors.cyan}║      赛博时代的数字求签 - 演示        ║${colors.reset}`);
    console.log(`${colors.cyan}║                                        ║${colors.reset}`);
    console.log(`${colors.cyan}╚════════════════════════════════════════╝${colors.reset}\n`);
    
    console.log(`${colors.dim}自动循环展示4个AI人格...${colors.reset}\n`);
    
    await this.sleep(2000);
    
    // 无限循环
    while (true) {
      await this.runScenario(this.scenarios[this.currentIndex]);
      this.currentIndex = (this.currentIndex + 1) % this.scenarios.length;
      await this.sleep(3000);
    }
  }

  /**
   * 运行单个场景
   */
  async runScenario(scenario) {
    console.clear();
    
    // 标题
    console.log(`${colors.cyan}╔════════════════════════════════════════╗${colors.reset}`);
    console.log(`${colors.cyan}║            Z E N F I X                 ║${colors.reset}`);
    console.log(`${colors.cyan}╚════════════════════════════════════════╝${colors.reset}\n`);
    
    // 第一步：选择人格
    console.log(`${colors.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.green}第一步：选择你的AI人格${colors.reset}`);
    console.log(`${colors.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
    
    await this.typeText(`${colors.yellow}> ${scenario.personaName}${colors.reset}\n`);
    console.log(`${colors.green}✓ 已选择${colors.reset}\n`);
    await this.sleep(1000);
    
    // 第二步：选择类别
    console.log(`${colors.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.green}第二步：选择你关心的类别${colors.reset}`);
    console.log(`${colors.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
    
    await this.typeText(`${colors.yellow}> ${scenario.category}${colors.reset}\n`);
    console.log(`${colors.green}✓ 已选择${colors.reset}\n`);
    await this.sleep(1000);
    
    // 第三步：冥想
    console.log(`${colors.magenta}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.magenta}第三步：冥想${colors.reset}`);
    console.log(`${colors.magenta}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
    
    console.log(`${colors.dim}请闭上眼睛...${colors.reset}`);
    await this.sleep(800);
    console.log(`${colors.dim}在心中默念你的困惑...${colors.reset}`);
    await this.sleep(800);
    console.log(`${colors.dim}深呼吸...${colors.reset}\n`);
    await this.sleep(800);
    
    // 倒计时
    for (let i = 3; i > 0; i--) {
      process.stdout.write(`${colors.cyan}${i}...${colors.reset}`);
      await this.sleep(1000);
    }
    
    console.log(`\n\n${colors.green}✓ 冥想完成${colors.reset}\n`);
    await this.sleep(1000);
    
    // 第四步：抽签
    console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.cyan}第四步：抽签${colors.reset}`);
    console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
    
    const oracle = this.matcher.draw(scenario.persona, scenario.category);
    
    if (!oracle) {
      console.log(`${colors.yellow}❌ 抽签失败${colors.reset}`);
      return;
    }
    
    await this.sleep(1500);
    
    // 显示签文
    console.log(`\n${colors.magenta}╔════════════════════════════════════════╗${colors.reset}`);
    console.log(`${colors.magenta}║              你的签文                  ║${colors.reset}`);
    console.log(`${colors.magenta}╚════════════════════════════════════════╝${colors.reset}\n`);
    
    // 尝试使用AI解签示例
    const content = this.getInterpretation(oracle, scenario.persona);
    console.log(content);
    
    console.log(`\n${colors.dim}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
    
    await this.sleep(5000);
  }

  /**
   * 获取解签内容（优先使用AI示例）
   */
  getInterpretation(oracle, persona) {
    // 检查是否有AI解签示例
    if (this.aiInterpretations[persona] && this.aiInterpretations[persona][oracle.id]) {
      const examples = this.aiInterpretations[persona][oracle.id];
      // 随机选择一个示例
      const randomExample = examples[Math.floor(Math.random() * examples.length)];
      console.log(`${colors.green}✨ AI解签${colors.reset}\n`);
      return randomExample;
    } else {
      // 降级方案：返回签文原文
      console.log(`${colors.yellow}⚠️  使用降级方案：返回签文原文${colors.reset}\n`);
      return this.interpreter.fallbackInterpretation(oracle, persona);
    }
  }

  /**
   * 打字机效果
   */
  async typeText(text, delay = 50) {
    for (let char of text) {
      process.stdout.write(char);
      await this.sleep(delay);
    }
  }

  /**
   * 延迟
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// 启动Demo
const demo = new ZenfixDemo();
demo.start().catch(error => {
  console.error('错误:', error);
  process.exit(1);
});
