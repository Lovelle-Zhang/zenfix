// Future-Survivor签文生成器 - 添加第11-15条
const fs = require('fs');
const path = require('path');

const existingFile = path.join(__dirname, 'future-survivor-oracles-v2.json');
const existing = JSON.parse(fs.readFileSync(existingFile, 'utf8'));

const newOracles = [
  {
    id: "FS11",
    category: "事业",
    level: "亚光速",
    theme: "耐心/长期",
    emotionTags: ["焦虑", "怀疑", "疲惫"],
    future: "2076年的你会说：幸好当时我没有放弃。",
    historical: "历史上所有的成就，都需要长期的坚持。",
    meaning: "你现在的坚持，是在为未来铺路。不要因为看不到结果就放弃。",
    action: "今天继续做那件你坚持了很久的事。",
    oneline: "坚持，是通往未来的唯一路。"
  },
  {
    id: "FS12",
    category: "感情",
    level: "超光速",
    theme: "勇气/表白",
    emotionTags: ["紧张", "兴奋", "期待"],
    future: "2076年的你会说：幸好当时我说出来了。",
    historical: "历史上最美的爱情，都始于勇敢的表白。",
    meaning: "不说出来，永远不会有答案。勇敢一次，不管结果如何。",
    action: "今天对TA说出你的感受。",
    oneline: "勇气，是爱情的开始。"
  },
  {
    id: "FS13",
    category: "成长",
    level: "引力场",
    theme: "困境/坚韧",
    emotionTags: ["沮丧", "疲惫", "怀疑"],
    future: "2076年的你会说：那段困境，让我变得更强。",
    historical: "历史上所有的强者，都经历过至暗时刻。",
    meaning: "困境是磨刀石，不是终点。熬过去，你会感谢现在的自己。",
    action: "今天做一件让你感到有力量的事。",
    oneline: "困境，是成长的催化剂。"
  },
  {
    id: "FS14",
    category: "事业",
    level: "超光速",
    theme: "创新/突破",
    emotionTags: ["兴奋", "自信", "清晰"],
    future: "2076年的历史书会写：那是一个创新的时代。",
    historical: "每个时代的突破，都来自敢于创新的人。",
    meaning: "你的创新，可能改变未来。不要害怕，去做。",
    action: "今天尝试一个新的方法或想法。",
    oneline: "创新，是未来的钥匙。"
  },
  {
    id: "FS15",
    category: "感情",
    level: "亚光速",
    theme: "经营/维护",
    emotionTags: ["平静", "温暖", "坚定"],
    future: "2076年的你会说：那个人陪我走过了一生。",
    historical: "历史上最长久的关系，都需要用心经营。",
    meaning: "爱情不是一见钟情，是长期陪伴。用心经营，才能长久。",
    action: "今天为这段关系做一件小事。",
    oneline: "经营，是爱情的保鲜剂。"
  }
];

existing.oracles = existing.oracles.concat(newOracles);
fs.writeFileSync(existingFile, JSON.stringify(existing, null, 2), 'utf8');
console.log(`✅ Future-Survivor签文已扩展到 ${existing.oracles.length} 条`);
