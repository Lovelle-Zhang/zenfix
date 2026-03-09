/**
 * Zenfix - 命令行原型（简化版 - 冥想抽签）
 * 新流程：选择人格 → 选择类别 → 冥想3秒 → 抽签 → 显示签文
 */

const readline = require('readline');
const OracleMatcher = require('./oracle-matcher');
const AIInterpreter = require('./ai-interpreter');

// 彩色输出 - 赛博朋克霓虹配色
const colors = {
  cyan: '\x1b[96m',        // 霓虹青（主色调 - 边框）
  green: '\x1b[92m',       // 霓虹绿（成功提示）
  yellow: '\x1b[93m',      // 霓虹黄（选项高亮）
  magenta: '\x1b[95m',     // 霓虹紫（强调 - 签文标题）
  reset: '\x1b[0m',
  dim: '\x1b[90m',         // 暗灰（次要信息）
  bold: '\x1b[1m'
};

class ZenfixCLI {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    this.matcher = new OracleMatcher();
    this.interpreter = new AIInterpreter();
    
    this.selectedPersona = null;
    this.selectedCategory = null;
  }

  /**
   * 启动CLI
   */
  async start() {
    this.showWelcome();
    await this.selectPersona();
  }

  /**
   * 显示欢迎界面
   */
  showWelcome() {
    console.clear();
    console.log(`${colors.cyan}╔════════════════════════════════════════╗${colors.reset}`);
    console.log(`${colors.cyan}║                                        ║${colors.reset}`);
    console.log(`${colors.cyan}║              Z E N F I X               ║${colors.reset}`);
    console.log(`${colors.cyan}║                                        ║${colors.reset}`);
    console.log(`${colors.cyan}║          量子启示·意识导航             ║${colors.reset}`);
    console.log(`${colors.cyan}║                                        ║${colors.reset}`);
    console.log(`${colors.cyan}╚════════════════════════════════════════╝${colors.reset}\n`);
  }

  /**
   * 选择人格
   */
  async selectPersona() {
    console.log(`${colors.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.green}第一步：选择你的AI人格${colors.reset}`);
    console.log(`${colors.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
    
    const personas = this.matcher.getPersonas();
    const personaKeys = Object.keys(personas);
    
    personaKeys.forEach((key, index) => {
      console.log(`${colors.yellow}${index + 1}.${colors.reset} ${personas[key]}`);
    });
    
    console.log('');
    
    const answer = await this.question(`${colors.cyan}请选择 (1-${personaKeys.length}): ${colors.reset}`);
    const choice = parseInt(answer);
    
    if (choice >= 1 && choice <= personaKeys.length) {
      this.selectedPersona = personaKeys[choice - 1];
      console.log(`${colors.green}✓ 已选择: ${personas[this.selectedPersona]}${colors.reset}\n`);
      await this.selectCategory();
    } else {
      console.log(`${colors.yellow}⚠️  无效选择，请重新选择${colors.reset}\n`);
      await this.selectPersona();
    }
  }

  /**
   * 选择类别
   */
  async selectCategory() {
    console.log(`${colors.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.green}第二步：选择你关心的类别${colors.reset}`);
    console.log(`${colors.green}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
    
    const categories = this.matcher.getCategories();
    
    categories.forEach((category, index) => {
      console.log(`${colors.yellow}${index + 1}.${colors.reset} ${category}`);
    });
    
    console.log('');
    
    const answer = await this.question(`${colors.cyan}请选择 (1-${categories.length}): ${colors.reset}`);
    const choice = parseInt(answer);
    
    if (choice >= 1 && choice <= categories.length) {
      this.selectedCategory = categories[choice - 1];
      console.log(`${colors.green}✓ 已选择: ${this.selectedCategory}${colors.reset}\n`);
      await this.meditation();
    } else {
      console.log(`${colors.yellow}⚠️  无效选择，请重新选择${colors.reset}\n`);
      await this.selectCategory();
    }
  }

  /**
   * 冥想环节
   */
  async meditation() {
    console.log(`${colors.magenta}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.magenta}第三步：冥想${colors.reset}`);
    console.log(`${colors.magenta}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
    
    console.log(`${colors.dim}请闭上眼睛...${colors.reset}`);
    await this.sleep(1000);
    console.log(`${colors.dim}在心中默念你的困惑...${colors.reset}`);
    await this.sleep(1000);
    console.log(`${colors.dim}深呼吸...${colors.reset}\n`);
    await this.sleep(1000);
    
    // 倒计时3秒
    for (let i = 3; i > 0; i--) {
      process.stdout.write(`${colors.cyan}${i}...${colors.reset}`);
      await this.sleep(1000);
    }
    
    console.log(`\n\n${colors.green}✓ 冥想完成${colors.reset}\n`);
    
    await this.drawOracle();
  }

  /**
   * 抽签
   */
  async drawOracle() {
    console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
    console.log(`${colors.cyan}第四步：抽签${colors.reset}`);
    console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
    
    // 随机抽签
    const oracle = this.matcher.draw(this.selectedPersona, this.selectedCategory);
    
    if (!oracle) {
      console.log(`${colors.yellow}❌ 抽签失败，请重试${colors.reset}`);
      this.rl.close();
      return;
    }
    
    await this.sleep(1000);
    
    await this.showOracle(oracle);
  }

  /**
   * 显示签文（分段+打字机效果）
   */
  async showOracle(oracle) {
    console.log(`\n${colors.magenta}╔════════════════════════════════════════╗${colors.reset}`);
    console.log(`${colors.magenta}║              你的签文                  ║${colors.reset}`);
    console.log(`${colors.magenta}╚════════════════════════════════════════╝${colors.reset}\n`);
    
    await this.sleep(500);
    
    // 根据不同人格，分段显示签文
    await this.showOracleByPersona(oracle, this.selectedPersona);
    
    console.log(`\n${colors.dim}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
    
    // 询问是否继续
    const answer = await this.question(`${colors.cyan}继续抽签？(y/n): ${colors.reset}`);
    
    if (answer.toLowerCase() === 'y') {
      console.clear();
      this.showWelcome();
      await this.selectPersona();
    } else {
      console.log(`\n${colors.green}感谢使用 Zenfix${colors.reset}`);
      console.log(`${colors.dim}愿你找到内心的答案${colors.reset}\n`);
      this.rl.close();
    }
  }

  /**
   * 根据人格分段显示签文
   */
  async showOracleByPersona(oracle, persona) {
    // 先显示基本信息
    console.log(`${colors.dim}签文 ${oracle.id} | ${oracle.category} | ${oracle.level}${colors.reset}`);
    console.log(`${colors.dim}${oracle.theme}${colors.reset}\n`);
    await this.sleep(800);
    
    switch(persona) {
      case 'zenclaw':
        await this.showZenClawOracle(oracle);
        break;
      case 'cyberzen':
        await this.showCyberZenOracle(oracle);
        break;
      case 'stoic':
        await this.showStoicOracle(oracle);
        break;
      case 'futureSurvivor':
        await this.showFutureSurvivorOracle(oracle);
        break;
    }
  }

  /**
   * ZenClaw签文显示
   */
  async showZenClawOracle(oracle) {
    // 意象
    console.log(`${colors.cyan}【意象】${colors.reset}`);
    await this.sleep(300);
    await this.typeText(oracle.imagery);
    console.log('\n');
    await this.sleep(1000);
    
    // 判词
    console.log(`${colors.cyan}【判词】${colors.reset}`);
    await this.sleep(300);
    await this.typeText(oracle.verdict);
    console.log('\n');
    await this.sleep(1000);
    
    // 核心洞察
    console.log(`${colors.cyan}【核心洞察】${colors.reset}`);
    await this.sleep(300);
    await this.typeText(oracle.insight);
    console.log('\n');
    await this.sleep(1000);
    
    // 运行建议
    console.log(`${colors.cyan}【运行建议】${colors.reset}`);
    await this.sleep(300);
    await this.typeText(oracle.advice);
    console.log('\n');
    await this.sleep(1000);
    
    // 今日调试
    console.log(`${colors.cyan}【今日调试】${colors.reset}`);
    await this.sleep(300);
    await this.typeText(oracle.task);
    console.log('');
  }

  /**
   * Cyber-Zen签文显示
   */
  async showCyberZenOracle(oracle) {
    // 看见
    console.log(`${colors.cyan}【看见】${colors.reset}`);
    await this.sleep(300);
    await this.typeText(oracle.seeing);
    console.log('\n');
    await this.sleep(1000);
    
    // 禅意
    console.log(`${colors.cyan}【禅意】${colors.reset}`);
    await this.sleep(300);
    await this.typeText(oracle.insight);
    console.log('\n');
    await this.sleep(1000);
    
    // 回归当下
    console.log(`${colors.cyan}【回归当下】${colors.reset}`);
    await this.sleep(300);
    await this.typeText(oracle.return);
    console.log('\n');
    await this.sleep(1000);
    
    // 今日修行
    console.log(`${colors.cyan}【今日修行】${colors.reset}`);
    await this.sleep(300);
    await this.typeText(oracle.practice);
    console.log('\n');
    await this.sleep(1000);
    
    // 一句话
    console.log(`${colors.cyan}【一句话】${colors.reset}`);
    await this.sleep(300);
    await this.typeText(oracle.oneline);
    console.log('');
  }

  /**
   * Stoic签文显示
   */
  async showStoicOracle(oracle) {
    // 看清现实
    console.log(`${colors.cyan}【看清现实】${colors.reset}`);
    await this.sleep(300);
    await this.typeText(oracle.reality);
    console.log('\n');
    await this.sleep(1000);
    
    // 控制二分法
    console.log(`${colors.cyan}【控制二分法】${colors.reset}`);
    await this.sleep(300);
    await this.typeText(oracle.control);
    console.log('\n');
    await this.sleep(1000);
    
    // 理性建议
    console.log(`${colors.cyan}【理性建议】${colors.reset}`);
    await this.sleep(300);
    await this.typeText(oracle.counsel);
    console.log('\n');
    await this.sleep(1000);
    
    // 今日行动
    console.log(`${colors.cyan}【今日行动】${colors.reset}`);
    await this.sleep(300);
    await this.typeText(oracle.action);
    console.log('\n');
    await this.sleep(1000);
    
    // 一句话
    console.log(`${colors.cyan}【一句话】${colors.reset}`);
    await this.sleep(300);
    await this.typeText(oracle.oneline);
    console.log('');
  }

  /**
   * Future-Survivor签文显示
   */
  async showFutureSurvivorOracle(oracle) {
    // 来自未来
    console.log(`${colors.cyan}【来自未来】${colors.reset}`);
    await this.sleep(300);
    await this.typeText(oracle.future);
    console.log('\n');
    await this.sleep(1000);
    
    // 历史视角
    console.log(`${colors.cyan}【历史视角】${colors.reset}`);
    await this.sleep(300);
    await this.typeText(oracle.historical);
    console.log('\n');
    await this.sleep(1000);
    
    // 长期意义
    console.log(`${colors.cyan}【长期意义】${colors.reset}`);
    await this.sleep(300);
    await this.typeText(oracle.meaning);
    console.log('\n');
    await this.sleep(1000);
    
    // 今日行动
    console.log(`${colors.cyan}【今日行动】${colors.reset}`);
    await this.sleep(300);
    await this.typeText(oracle.action);
    console.log('\n');
    await this.sleep(1000);
    
    // 一句话
    console.log(`${colors.cyan}【一句话】${colors.reset}`);
    await this.sleep(300);
    await this.typeText(oracle.oneline);
    console.log('');
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
   * 辅助方法：提问
   */
  question(prompt) {
    return new Promise((resolve) => {
      this.rl.question(prompt, (answer) => {
        resolve(answer);
      });
    });
  }

  /**
   * 辅助方法：延迟
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// 启动CLI
const cli = new ZenfixCLI();
cli.start().catch(error => {
  console.error('错误:', error);
  process.exit(1);
});
