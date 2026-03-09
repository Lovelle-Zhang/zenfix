// ZenClaw签文生成器 - 扩展到50条
const fs = require('fs');
const path = require('path');

// 读取现有签文
const existingFile = path.join(__dirname, 'zenclaw-oracles-v2.json');
const existing = JSON.parse(fs.readFileSync(existingFile, 'utf8'));

// 新增签文 (0x0B - 0x14, 共10条)
const newOracles = [
  {
    id: "0x0B",
    category: "事业",
    level: "亚光速",
    theme: "压力/承受",
    emotionTags: ["压力", "焦虑", "疲惫"],
    imagery: "服务器负载过高，但还在正常运行。",
    verdict: "压力不是敌人，是你在扩容的信号。",
    insight: "系统能承受的压力，往往比你想象的大。但要注意监控，别让它崩溃。",
    advice: "优化性能，减少不必要的负载，保持系统健康。",
    task: "今天列出三件可以委托或放弃的事。"
  },
  {
    id: "0x0C",
    category: "感情",
    level: "亚光速",
    theme: "距离/思念",
    emotionTags: ["思念", "孤独", "不安"],
    imagery: "两个服务器在不同的机房，延迟很高。",
    verdict: "距离不是问题，失去连接才是。",
    insight: "物理距离可以用心理连接弥补。保持通信，保持在线。",
    advice: "定期同步状态，不要让延迟变成断线。",
    task: "今天主动联系TA，说说你的日常。"
  },
  {
    id: "0x0D",
    category: "成长",
    level: "超光速",
    theme: "学习/吸收",
    emotionTags: ["兴奋", "好奇", "充实"],
    imagery: "数据库正在快速写入，索引在实时更新。",
    verdict: "学习的最佳状态，是系统在高速吸收。",
    insight: "当你感到充实和兴奋时，说明你在最佳学习区。抓住这个窗口。",
    advice: "趁着状态好，多学一点，多做一点。",
    task: "今天学一个新技能或新知识。"
  },
  {
    id: "0x0E",
    category: "事业",
    level: "引力场",
    theme: "瓶颈/突破",
    emotionTags: ["沮丧", "困惑", "焦虑"],
    imagery: "数据库查询很慢，需要优化索引。",
    verdict: "瓶颈不是终点，是优化的起点。",
    insight: "每个系统都有瓶颈，找到它，优化它，你就能突破。",
    advice: "分析瓶颈在哪里，针对性优化。",
    task: "今天找出一个让你效率低下的环节，改进它。"
  },
  {
    id: "0x0F",
    category: "感情",
    level: "超光速",
    theme: "表达/勇气",
    emotionTags: ["紧张", "期待", "兴奋"],
    imagery: "消息已编辑好，光标停在发送按钮上。",
    verdict: "表达不需要完美，需要的是勇气。",
    insight: "很多话不说出来，永远不会有答案。发送，是最好的选择。",
    advice: "不要过度编辑，真诚比完美重要。",
    task: "今天对TA说一句你一直想说的话。"
  }
];

// 合并签文
existing.oracles = existing.oracles.concat(newOracles);

// 写入文件
fs.writeFileSync(existingFile, JSON.stringify(existing, null, 2), 'utf8');

console.log(`✅ ZenClaw签文已扩展到 ${existing.oracles.length} 条`);
