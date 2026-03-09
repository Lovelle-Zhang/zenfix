// ZenClaw签文生成器 - 添加第16-20条
const fs = require('fs');
const path = require('path');

const existingFile = path.join(__dirname, 'zenclaw-oracles-v2.json');
const existing = JSON.parse(fs.readFileSync(existingFile, 'utf8'));

const newOracles = [
  {
    id: "0x10",
    category: "成长",
    level: "亚光速",
    theme: "自我怀疑",
    emotionTags: ["怀疑", "焦虑", "不安"],
    imagery: "代码通过了测试，但你还在检查是不是有隐藏的bug。",
    verdict: "自我怀疑不是弱点，是你在追求更高标准。",
    insight: "完美主义者总是怀疑自己。但要知道，够好就是好。",
    advice: "设定一个标准，达到了就发布，不要无限优化。",
    task: "今天完成一件事后，不要再检查，直接提交。"
  },
  {
    id: "0x11",
    category: "事业",
    level: "超光速",
    theme: "协作/团队",
    emotionTags: ["兴奋", "信任", "期待"],
    imagery: "多个微服务协同工作，系统运行流畅。",
    verdict: "好的团队，是1+1>2的系统。",
    insight: "单打独斗有上限，协作才能指数增长。找到对的人，建立信任。",
    advice: "主动分享，主动协作，建立连接。",
    task: "今天主动帮助一个同事或队友。"
  },
  {
    id: "0x12",
    category: "感情",
    level: "引力场",
    theme: "误解/沟通",
    emotionTags: ["委屈", "愤怒", "困惑"],
    imagery: "数据包在传输中损坏，接收方解析出错。",
    verdict: "误解不是故意，是协议没对齐。",
    insight: "很多冲突源于误解。重新发送，确认接收，问题就解决了。",
    advice: "不要假设对方懂你的意思，明确表达，确认理解。",
    task: "今天主动澄清一个可能的误解。"
  },
  {
    id: "0x13",
    category: "成长",
    level: "超光速",
    theme: "自信/认可",
    emotionTags: ["自豪", "兴奋", "满足"],
    imagery: "你的代码被merge到主分支，团队点赞。",
    verdict: "认可不是虚荣，是你价值的证明。",
    insight: "享受这个时刻，你值得。但不要停下，继续创造价值。",
    advice: "庆祝成就，然后设定下一个目标。",
    task: "今天奖励自己一件小礼物。"
  },
  {
    id: "0x14",
    category: "事业",
    level: "亚光速",
    theme: "学习/成长",
    emotionTags: ["困惑", "好奇", "期待"],
    imagery: "你在读一份复杂的技术文档，慢慢理解。",
    verdict: "学习曲线陡峭，但你在爬升。",
    insight: "新知识总是难的，但每一次理解都是进步。坚持下去。",
    advice: "不要急，一点一点啃，总会懂的。",
    task: "今天花30分钟学习一个新概念。"
  }
];

existing.oracles = existing.oracles.concat(newOracles);
fs.writeFileSync(existingFile, JSON.stringify(existing, null, 2), 'utf8');
console.log(`✅ ZenClaw签文已扩展到 ${existing.oracles.length} 条`);
