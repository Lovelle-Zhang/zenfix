// Stoic签文生成器 - 添加第11-15条
const fs = require('fs');
const path = require('path');

const existingFile = path.join(__dirname, 'stoic-oracles-v2.json');
const existing = JSON.parse(fs.readFileSync(existingFile, 'utf8'));

const newOracles = [
  {
    id: "ST11",
    category: "事业",
    level: "亚光速",
    theme: "耐心/积累",
    emotionTags: ["焦虑", "不安", "怀疑"],
    reality: "你在做一件需要长期积累的事，但看不到结果。",
    control: "可控：你的坚持、你的努力。不可控：结果何时出现。",
    counsel: "罗马不是一天建成的。专注过程，结果会来。",
    action: "今天做一件为长期目标积累的小事。",
    oneline: "耐心，是智者的美德。"
  },
  {
    id: "ST12",
    category: "感情",
    level: "超光速",
    theme: "信任/开放",
    emotionTags: ["紧张", "期待", "温暖"],
    reality: "你想打开心扉，但害怕受伤。",
    control: "可控：你的选择、你的勇气。不可控：对方的反应。",
    counsel: "信任是冒险，但不信任是孤独。选择勇敢。",
    action: "今天对TA分享一个你的脆弱。",
    oneline: "信任，是关系的基石。"
  },
  {
    id: "ST13",
    category: "成长",
    level: "引力场",
    theme: "挫折/韧性",
    emotionTags: ["沮丧", "疲惫", "怀疑"],
    reality: "你遇到了挫折，想放弃。",
    control: "可控：你的态度、你的选择。不可控：挫折的大小。",
    counsel: "挫折是考验，不是惩罚。通过它，你会更强。",
    action: "今天重新尝试一次你失败的事。",
    oneline: "挫折，是成长的阶梯。"
  },
  {
    id: "ST14",
    category: "事业",
    level: "超光速",
    theme: "专注/效率",
    emotionTags: ["清晰", "专注", "充实"],
    reality: "你进入了心流状态，效率极高。",
    control: "可控：你的专注、你的时间管理。不可控：外界干扰。",
    counsel: "保护这个状态，减少干扰，最大化产出。",
    action: "今天关掉所有通知，专注工作2小时。",
    oneline: "专注，是效率的源泉。"
  },
  {
    id: "ST15",
    category: "感情",
    level: "亚光速",
    theme: "理解/包容",
    emotionTags: ["困惑", "不满", "期待"],
    reality: "你不理解对方的行为，感到不满。",
    control: "可控：你的理解、你的包容。不可控：对方的行为。",
    counsel: "每个人都有自己的逻辑。试着理解，而不是改变。",
    action: "今天问TA：你为什么这样做？",
    oneline: "理解，是爱的开始。"
  }
];

existing.oracles = existing.oracles.concat(newOracles);
fs.writeFileSync(existingFile, JSON.stringify(existing, null, 2), 'utf8');
console.log(`✅ Stoic签文已扩展到 ${existing.oracles.length} 条`);
