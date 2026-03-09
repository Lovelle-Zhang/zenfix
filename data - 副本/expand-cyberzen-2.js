// Cyber-Zen签文生成器 - 添加第16-20条
const fs = require('fs');
const path = require('path');

const existingFile = path.join(__dirname, 'cyber-zen-oracles-v2.json');
const existing = JSON.parse(fs.readFileSync(existingFile, 'utf8'));

const newOracles = [
  {
    id: "CZ16",
    category: "成长",
    level: "亚光速",
    theme: "耐心/等待",
    emotionTags: ["焦虑", "不安", "期待"],
    seeing: "种子在土里，看不见，但在发芽。",
    insight: "成长需要时间，急不来。",
    return: "相信过程，相信时间。你在做的事，都在积累。",
    practice: "今天不要检查进度，只是继续做。",
    oneline: "耐心，是成长的养分。"
  },
  {
    id: "CZ17",
    category: "事业",
    level: "超光速",
    theme: "突破/飞跃",
    emotionTags: ["兴奋", "自信", "清晰"],
    seeing: "鸟儿展翅，第一次飞离地面。",
    insight: "突破的时刻，总是令人激动。",
    return: "享受这个飞翔的感觉，但不要忘记，飞得越高，越要稳。",
    practice: "今天做一件你以前不敢做的事。",
    oneline: "突破，是成长的证明。"
  },
  {
    id: "CZ18",
    category: "感情",
    level: "引力场",
    theme: "疏离/反思",
    emotionTags: ["孤独", "困惑", "不安"],
    seeing: "两个人在同一个房间，但心在不同的地方。",
    insight: "疏离不是距离，是心的距离。",
    return: "问问自己：我们还在同一个频道吗？如果不在，要不要调回来？",
    practice: "今天和TA聊聊彼此的感受。",
    oneline: "疏离，是关系的警报。"
  },
  {
    id: "CZ19",
    category: "成长",
    level: "超光速",
    theme: "自由/解脱",
    emotionTags: ["轻松", "释然", "喜悦"],
    seeing: "枷锁打开了，你终于可以自由呼吸。",
    insight: "自由不是得到什么，是放下什么。",
    return: "享受这份轻盈，但记住，自由也意味着责任。",
    practice: "今天做一件让你感到自由的事。",
    oneline: "自由，是最大的礼物。"
  },
  {
    id: "CZ20",
    category: "事业",
    level: "亚光速",
    theme: "坚持/韧性",
    emotionTags: ["疲惫", "坚定", "希望"],
    seeing: "竹子在风中弯曲，但不会折断。",
    insight: "韧性比力量更重要。",
    return: "你可以弯曲，可以休息，但不要放弃。风会停的。",
    practice: "今天坚持做一件你想放弃的事。",
    oneline: "坚持，是最朴素的力量。"
  }
];

existing.oracles = existing.oracles.concat(newOracles);
fs.writeFileSync(existingFile, JSON.stringify(existing, null, 2), 'utf8');
console.log(`✅ Cyber-Zen签文已扩展到 ${existing.oracles.length} 条`);
