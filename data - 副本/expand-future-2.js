// Future-Survivor签文生成器 - 添加第16-20条
const fs = require('fs');
const path = require('path');

const existingFile = path.join(__dirname, 'future-survivor-oracles-v2.json');
const existing = JSON.parse(fs.readFileSync(existingFile, 'utf8'));

const newOracles = [
  {
    id: "FS16",
    category: "成长",
    level: "超光速",
    theme: "蜕变/重生",
    emotionTags: ["兴奋", "清晰", "自由"],
    future: "2076年的你会说：那是我重生的时刻。",
    historical: "历史上所有的伟人，都经历过蜕变。",
    meaning: "你正在蜕变，旧的自己在死去，新的自己在诞生。拥抱它。",
    action: "今天做一件象征新开始的事。",
    oneline: "蜕变，是成长的必经之路。"
  },
  {
    id: "FS17",
    category: "事业",
    level: "引力场",
    theme: "调整/转型",
    emotionTags: ["迷茫", "焦虑", "不安"],
    future: "2076年的你会说：那次转型，是最正确的决定。",
    historical: "历史上所有的成功转型，都伴随着阵痛。",
    meaning: "转型很难，但不转型更难。给自己时间，慢慢调整。",
    action: "今天思考：我需要改变什么？",
    oneline: "转型，是生存的智慧。"
  },
  {
    id: "FS18",
    category: "感情",
    level: "超光速",
    theme: "承诺/未来",
    emotionTags: ["坚定", "温暖", "期待"],
    future: "2076年的你会说：那是我们的开始。",
    historical: "历史上最美的承诺，都在关键时刻说出。",
    meaning: "承诺不是保证，是愿意一起面对未来。",
    action: "今天对TA说：我们一起走向未来。",
    oneline: "承诺，是未来的起点。"
  },
  {
    id: "FS19",
    category: "成长",
    level: "亚光速",
    theme: "积累/沉淀",
    emotionTags: ["平静", "坚定", "希望"],
    future: "2076年的你会说：那些年的积累，成就了现在的我。",
    historical: "历史上所有的大成就，都建立在长期积累之上。",
    meaning: "不要小看每一天的努力，它们会复利增长。",
    action: "今天做一件为未来积累的小事。",
    oneline: "积累，是时间的魔法。"
  },
  {
    id: "FS20",
    category: "事业",
    level: "超光速",
    theme: "使命/影响",
    emotionTags: ["清晰", "坚定", "使命感"],
    future: "2076年的历史书会写：那个人改变了世界。",
    historical: "历史上所有改变世界的人，都有清晰的使命。",
    meaning: "你找到了你的使命。现在，去实现它。",
    action: "今天开始做那件你觉得自己应该做的事。",
    oneline: "使命，是人生的意义。"
  }
];

existing.oracles = existing.oracles.concat(newOracles);
fs.writeFileSync(existingFile, JSON.stringify(existing, null, 2), 'utf8');
console.log(`✅ Future-Survivor签文已扩展到 ${existing.oracles.length} 条`);
