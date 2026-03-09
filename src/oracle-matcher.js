/**
 * Zenfix - 签文匹配引擎（简化版 - 随机抽签）
 * 基于类别随机抽取签文
 */

const fs = require('fs');
const path = require('path');

class OracleMatcher {
  constructor() {
    this.oracles = {
      zenclaw: [],
      cyberzen: [],
      stoic: [],
      futureSurvivor: []
    };
    
    this.loadOracles();
  }

  /**
   * 加载所有签文库
   */
  loadOracles() {
    const dataDir = path.join(__dirname, '../data');
    
    try {
      // 加载4个人格的签文库
      this.oracles.zenclaw = this.loadOracleFile(path.join(dataDir, 'zenclaw-oracles-v2.json'));
      this.oracles.cyberzen = this.loadOracleFile(path.join(dataDir, 'cyber-zen-oracles-v2.json'));
      this.oracles.stoic = this.loadOracleFile(path.join(dataDir, 'stoic-oracles-v2.json'));
      this.oracles.futureSurvivor = this.loadOracleFile(path.join(dataDir, 'future-survivor-oracles-v2.json'));
      
      console.log('✅ 签文库加载成功');
      console.log(`   - ZenClaw: ${this.oracles.zenclaw.length}条`);
      console.log(`   - Cyber-Zen: ${this.oracles.cyberzen.length}条`);
      console.log(`   - Stoic: ${this.oracles.stoic.length}条`);
      console.log(`   - Future-Survivor: ${this.oracles.futureSurvivor.length}条`);
    } catch (error) {
      console.error('❌ 签文库加载失败:', error.message);
    }
  }

  /**
   * 加载单个签文文件
   */
  loadOracleFile(filePath) {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      const json = JSON.parse(data);
      
      // 处理两种格式：直接数组 或 { oracles: [...] }
      if (Array.isArray(json)) {
        return json;
      } else if (json.oracles && Array.isArray(json.oracles)) {
        return json.oracles;
      } else {
        console.warn(`⚠️  签文文件格式不正确: ${filePath}`);
        return [];
      }
    } catch (error) {
      console.warn(`⚠️  无法加载签文: ${filePath}`);
      return [];
    }
  }

  /**
   * 随机抽签
   * @param {string} persona - 人格选择 (zenclaw/cyberzen/stoic/futureSurvivor)
   * @param {string} category - 类别 (事业/感情/健康/财运/人际/成长)
   * @returns {Object|null} 匹配的签文
   */
  draw(persona, category) {
    console.log(`\n🎯 抽签中...`);
    console.log(`   人格: ${persona}`);
    console.log(`   类别: ${category}`);
    
    // 获取该人格的所有签文
    const personaOracles = this.oracles[persona] || [];
    
    if (personaOracles.length === 0) {
      console.log('❌ 该人格没有签文');
      return null;
    }
    
    // 筛选该类别的签文
    const categoryOracles = personaOracles.filter(oracle => oracle.category === category);
    
    if (categoryOracles.length === 0) {
      console.log(`⚠️  该类别没有签文，从所有签文中随机抽取`);
      // 如果该类别没有签文，从所有签文中随机抽取
      return this.randomPick(personaOracles);
    }
    
    // 从该类别的签文中随机抽取
    return this.randomPick(categoryOracles);
  }

  /**
   * 从数组中随机选择一个元素
   */
  randomPick(array) {
    if (array.length === 0) return null;
    
    const index = Math.floor(Math.random() * array.length);
    const oracle = array[index];
    
    console.log(`\n✨ 抽到签文:`);
    console.log(`   签文ID: ${oracle.id}`);
    console.log(`   类别: ${oracle.category}`);
    console.log(`   等级: ${oracle.level}`);
    console.log(`   主题: ${oracle.theme}`);
    
    return oracle;
  }

  /**
   * 获取所有可用的类别
   */
  getCategories() {
    return ['事业', '感情', '健康', '财运', '人际', '成长'];
  }

  /**
   * 获取所有可用的人格
   */
  getPersonas() {
    return {
      zenclaw: 'ZenClaw - 冷峻洞察',
      cyberzen: 'Cyber-Zen - 温暖诗意',
      stoic: 'Stoic - 理性力量',
      futureSurvivor: 'Future-Survivor - 长期希望'
    };
  }
}

module.exports = OracleMatcher;
