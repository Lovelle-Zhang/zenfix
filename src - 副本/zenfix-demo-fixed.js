/**
 * Zenfix - Demo演示模式（修复版）
 */

const fs = require('fs');
const path = require('path');

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
    // 加载签文库
    this.oracles = {
      zenclaw: JSON.parse(fs.readFileSync(path.join(__dirname, '../data/zenclaw-oracles-v2.json'), 'utf8')),
      stoic: JSON.parse(fs.readFileSync(path.join(__dirname, '../data/stoic-oracles-v2.json'), 'utf8')),
      cyberzen: JSON.parse(fs.readFileSync(path.join(__dirname, '../data/cyberzen-oracles-v2.json'), 'utf8')),
      futureSurvivor: JSON.parse(fs.readFileSync(path.join(__dirname, '../data/future-survivor-oracles-v2.json'), 'utf8'))
    };
    
    // 加载AI解签库
    this.aiInterpretations = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/ai-interpretations.json'), 'utf8'));
    
    this.scenarios = [
      { persona: 'zenclaw', personaName: 'ZenClaw - 冷峻洞察', category: '事业' },
      { persona: 'cyberzen', personaName: 'Cyber-Zen - 温暖诗意', category: '感情' },
      { persona: 'stoic', personaName: 'Stoic - 理性力量', category: '事业' },
      { persona: 'futureSurvivor', personaName: 'Future-Survivor - 长期希望', category: '成长' }
    ];
    
    this.currentIndex = 0;
  }

  async start() {
    console.log(`${colors.cyan}╔════════════════════════════════════════╗${colors.reset}`);
    console.log(`${colors.cyan}║        ${colors.bold}Z E N F I X  D E M O${colors.reset}${colors.cyan}          ║${colors.reset}`);
    console.log(`${colors.cyan}║      赛博时代的数字求签 - 演示        ║${colors.reset}`);
    console.log(`${colors.cyan}╚════════════════════════════════════════╝${colors.reset}\n`);
    
    await this.sleep(2000);
    
    while (true) {
      await this.runScenario(this.scenarios[this.currentIndex]);
      this.currentIndex = (this.currentIndex + 1) % this.scenarios.length;
      await this.sleep(3000);
    }
  }

  async runScenario(scenario) {
    console.clear();
    
    console.log(`${colors.cyan}╔════════════════════════════════════════╗${colors.reset}`);
    console.log(`${colors.cyan}║            Z E N F I X                 ║${colors.reset}`);
    console.log(`${colors.cyan}╚════════════════════════════════════════╝${colors.reset}\n`);
    
    // 选择人格
    console.log(`${colors.green}━━━ 第一步：选择AI人格 ━━━${colors.reset}\n`);
    await this.typeText(`${colors.yellow}> ${scenario.personaName}${colors.reset}\n`);
    console.log(`${colors.green}✓ 已选择${colors.reset}\n`);
    await this.sleep(1000);
    
    // 选择类别
    console.log(`${colors.green}━━━ 第二步：选择类别 ━━━${colors.reset}\n`);
    await this.typeText(`${colors.yellow}> ${scenario.category}${colors.reset}\n`);
    console.log(`${colors.green}✓ 已选择${colors.reset}\n`);
    await this.sleep(1000);
    
    // 冥想
    console.log(`${colors.magenta}━━━ 第三步：冥想 ━━━${colors.reset}\n`);
    console.log(`${colors.dim}请闭上眼睛...在心中默念你的困惑...深呼吸...${colors.reset}\n`);
    
    for (let i = 3; i > 0; i--) {
      process.stdout.write(`${colors.cyan}${i}...${colors.reset}`);
      await this.sleep(1000);
    }
    
    console.log(`\n\n${colors.green}✓ 冥想完成${colors.reset}\n`);
    await this.sleep(1000);
    
    // 抽签
    console.log(`${colors.cyan}━━━ 第四步：抽签 ━━━${colors.reset}\n`);
    
    const categoryOracles = this.oracles[scenario.persona].filter(o => o.category === scenario.category);
    const oracle = categoryOracles[Math.floor(Math.random() * categoryOracles.length)];
    
    await this.sleep(1500);
    
    // 显示签文
    console.log(`\n${colors.magenta}╔════════════════════════════════════════╗${colors.reset}`);
    console.log(`${colors.magenta}║              你的签文                  ║${colors.reset}`);
    console.log(`${colors.magenta}╚════════════════════════════════════════╝${colors.reset}\n`);
    
    const interpretation = this.aiInterpretations[scenario.persona][oracle.id][0];
    console.log(`${colors.green}✨ AI解签${colors.reset}\n`);
    console.log(interpretation);
    
    console.log(`\n${colors.dim}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);
    
    await this.sleep(5000);
  }

  async typeText(text, delay = 50) {
    for (let char of text) {
      process.stdout.write(char);
      await this.sleep(delay);
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

const demo = new ZenfixDemo();
demo.start().catch(error => {
  console.error('错误:', error);
  process.exit(1);
});
