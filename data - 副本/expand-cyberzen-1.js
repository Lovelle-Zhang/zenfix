// Cyber-Zen签文生成器 - 添加第11-15条
const fs = require('fs');
const path = require('path');

const existingFile = path.join(__dirname, 'cyber-zen-oracles-v2.json');
const existing = JSON.parse(fs.readFileSync(existingFile, 'utf8'));

const newOracles = [
  {
    id: "CZ11",
    category: "事业",
    level: "超光速",
    theme: "灵感/创造",
    emotionTags: ["兴奋", "清晰", "充实"],
    seeing: "灵感像闪电，突然照亮了整个夜空。",
    insight: "创造的时刻，是宇宙在通过你说话。",
    return: "抓住这个瞬间，不要分析，不要怀疑，直接创造。",
    practice: "今天做一件创造性的事，不管结果如何。",
    oneline: "创造，是最接近神性的时刻。"
  },
  {
    id: "CZ12",
    category: "感情",
    level: "亚光速",
    theme: "陪伴/日常",
    emotionTags: ["平静", "温暖", "满足"],
    seeing: "两棵树并排生长，根系在地下交织。",
    insight: "最好的爱，是平淡的陪伴。",
    return: "不需要轰轰烈烈，只需要每天在一起。珍惜这份平凡。",
    practice: "今天和TA做一件平常的小事。",
    oneline: "陪伴，是最长情的告白。"
  },
  {
    id: "CZ13",
    category: "成长",
    level: "超光速",
    theme: "接纳/完整",
    emotionTags: ["平静", "释然", "自信"],
    seeing: "镜子里的你，终于看起来顺眼了。",
    insight: "接纳自己，是成长的终点。",
    return: "你不需要变成别人，你只需要成为完整的自己。",
    practice: "今天对镜子里的自己说：我接纳你。",
    oneline: "完整，比完美更重要。"
  },
  {
    id: "CZ14",
    category: "事业",
    level: "引力场",
    theme: "迷失/方向",
    emotionTags: ["迷茫", "焦虑", "疲惫"],
    seeing: "你在森林里走，不知道哪里是出口。",
    insight: "迷失不可怕，可怕的是不敢停下来。",
    return: "停下来，坐下来，听听森林的声音。方向会自己出现。",
    practice: "今天什么都不做，只是静坐。",
    oneline: "停下来，是为了更好地出发。"
  },
  {
    id: "CZ15",
    category: "感情",
    level: "超光速",
    theme: "感恩/珍惜",
    emotionTags: ["温暖", "感动", "满足"],
    seeing: "阳光透过树叶，洒在你们身上。",
    insight: "有些时刻，值得永远记住。",
    return: "感恩这个人出现在你的生命里。不管未来如何，现在就是最好的礼物。",
    practice: "今天对TA说：谢谢你在我身边。",
    oneline: "感恩，是最美的情感。"
  }
];

existing.oracles = existing.oracles.concat(newOracles);
fs.writeFileSync(existingFile, JSON.stringify(existing, null, 2), 'utf8');
console.log(`✅ Cyber-Zen签文已扩展到 ${existing.oracles.length} 条`);
