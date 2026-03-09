// Stoic签文生成器 - 添加第16-20条
const fs = require('fs');
const path = require('path');

const existingFile = path.join(__dirname, 'stoic-oracles-v2.json');
const existing = JSON.parse(fs.readFileSync(existingFile, 'utf8'));

const newOracles = [
  {
    id: "ST16",
    category: "成长",
    level: "超光速",
    theme: "勇气/行动",
    emotionTags: ["紧张", "兴奋", "坚定"],
    reality: "你知道该做什么，但需要勇气。",
    control: "可控：你的勇气、你的行动。不可控：结果如何。",
    counsel: "勇气不是不害怕，是害怕但还是去做。",
    action: "今天做那件让你害怕的事。",
    oneline: "勇气，是行动的前提。"
  },
  {
    id: "ST17",
    category: "事业",
    level: "引力场",
    theme: "选择/取舍",
    emotionTags: ["困惑", "焦虑", "纠结"],
    reality: "你面临选择，不知道该选哪个。",
    control: "可控：你的分析、你的决策。不可控：哪个选择更好。",
    counsel: "没有完美的选择，只有选择后的努力。选一个，全力以赴。",
    action: "今天做出那个决定，不再纠结。",
    oneline: "选择，比完美更重要。"
  },
  {
    id: "ST18",
    category: "感情",
    level: "超光速",
    theme: "承诺/责任",
    emotionTags: ["坚定", "温暖", "安心"],
    reality: "你准备好做出承诺了。",
    control: "可控：你的承诺、你的行动。不可控：未来会怎样。",
    counsel: "承诺不是保证未来，是保证现在的努力。",
    action: "今天对TA说：我愿意。",
    oneline: "承诺，是责任的开始。"
  },
  {
    id: "ST19",
    category: "成长",
    level: "亚光速",
    theme: "反思/总结",
    emotionTags: ["平静", "清晰", "思考"],
    reality: "你在回顾过去，总结经验。",
    control: "可控：你的反思、你的学习。不可控：过去发生的事。",
    counsel: "过去不能改变，但可以学习。总结教训，继续前进。",
    action: "今天写下三个你从过去学到的教训。",
    oneline: "反思，是智慧的来源。"
  },
  {
    id: "ST20",
    category: "事业",
    level: "超光速",
    theme: "领导/影响",
    emotionTags: ["自信", "责任", "使命"],
    reality: "你有能力影响他人了。",
    control: "可控：你的行动、你的榜样。不可控：他人的选择。",
    counsel: "领导不是控制，是影响。用行动说话，用结果证明。",
    action: "今天做一件能影响他人的事。",
    oneline: "领导，是责任的体现。"
  }
];

existing.oracles = existing.oracles.concat(newOracles);
fs.writeFileSync(existingFile, JSON.stringify(existing, null, 2), 'utf8');
console.log(`✅ Stoic签文已扩展到 ${existing.oracles.length} 条`);
