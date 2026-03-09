# Zenfix 签文库设计

## 一、签文数据结构

```typescript
interface Oracle {
  id: string;              // 唯一标识，如 "ORC-001"
  category: OracleCategory; // 类别
  level: OracleLevel;      // 等级
  content: string;         // 签文内容（20-50字）
  keywords: string[];      // 关键词（3-5个）
  emotionTags: EmotionTag[]; // 情绪标签
  interpretation: {        // 传统解释（可选）
    brief: string;         // 简要解释
    detailed?: string;     // 详细解释
  };
  metadata: {
    createdAt: string;
    author: string;
    source?: string;       // 来源（原创/改编）
  };
}

enum OracleCategory {
  CAREER = "事业",
  LOVE = "感情",
  HEALTH = "健康",
  WEALTH = "财运",
  RELATIONSHIP = "人际",
  GROWTH = "成长"
}

enum OracleLevel {
  EXCELLENT = "上上",
  GOOD = "上",
  MEDIUM = "中",
  POOR = "下",
  VERY_POOR = "下下"
}

enum EmotionTag {
  ANXIETY = "焦虑",
  CONFUSION = "迷茫",
  HOPE = "希望",
  FEAR = "恐惧",
  LONELINESS = "孤独",
  PRESSURE = "压力",
  DOUBT = "怀疑",
  EXPECTATION = "期待"
}
```

## 二、签文创作原则

### 2.1 内容要求

**长度**：20-50字（中文）

**风格**：
- 诗意但不晦涩
- 有意境但不空洞
- 可以有多重解读
- 避免过于直白的预言

**好的签文示例**：
> "晨雾终会散去，但你要先学会在雾中行走。"

**差的签文示例**：
> "你会遇到贵人，事业会成功。"（太直白、太确定）

### 2.2 情绪覆盖

每个类别都要覆盖主要情绪：
- 焦虑型（40%）- 最常见
- 迷茫型（30%）
- 希望型（20%）
- 其他（10%）

### 2.3 等级分布

**上上签（10%）**：
- 给予强烈的肯定和希望
- 但不是空洞的承诺

**上签（25%）**：
- 积极但提醒需要努力

**中签（30%）**：
- 中性，强调平衡和等待

**下签（25%）**：
- 提醒困难，但给出应对方法

**下下签（10%）**：
- 直面困境，但提供转机的可能性
- 绝不绝望，总有出路

---

## 三、初始签文库（MVP版本）

### 类别：事业 (Career)

#### ORC-CAR-001 [上上签]
```json
{
  "id": "ORC-CAR-001",
  "category": "事业",
  "level": "上上",
  "content": "种子在黑暗中积蓄力量，破土而出只是时间问题。",
  "keywords": ["积累", "突破", "时机"],
  "emotionTags": ["期待", "焦虑"],
  "interpretation": {
    "brief": "你的努力正在积累，突破即将到来。"
  }
}
```

#### ORC-CAR-002 [上签]
```json
{
  "id": "ORC-CAR-002",
  "category": "事业",
  "level": "上",
  "content": "逆风的鸟飞得更高，但要先学会借力。",
  "keywords": ["挑战", "策略", "成长"],
  "emotionTags": ["压力", "怀疑"],
  "interpretation": {
    "brief": "困难是成长的机会，但需要智慧应对。"
  }
}
```

#### ORC-CAR-003 [中签]
```json
{
  "id": "ORC-CAR-003",
  "category": "事业",
  "level": "中",
  "content": "河流不争先，却能到达大海。",
  "keywords": ["耐心", "坚持", "自然"],
  "emotionTags": ["焦虑", "迷茫"],
  "interpretation": {
    "brief": "不必急于求成，保持方向比速度更重要。"
  }
}
```

#### ORC-CAR-004 [下签]
```json
{
  "id": "ORC-CAR-004",
  "category": "事业",
  "level": "下",
  "content": "暴风雨中的船需要更稳的舵手。",
  "keywords": ["困境", "掌控", "冷静"],
  "emotionTags": ["恐惧", "压力"],
  "interpretation": {
    "brief": "当前处境艰难，需要冷静和专注。"
  }
}
```

#### ORC-CAR-005 [下下签]
```json
{
  "id": "ORC-CAR-005",
  "category": "事业",
  "level": "下下",
  "content": "森林大火后，新芽最先破土。",
  "keywords": ["重生", "破坏", "机会"],
  "emotionTags": ["绝望", "恐惧"],
  "interpretation": {
    "brief": "旧的秩序崩塌，但新的可能性正在孕育。"
  }
}
```

### 类别：感情 (Love)

#### ORC-LOV-001 [上上签]
```json
{
  "id": "ORC-LOV-001",
  "category": "感情",
  "level": "上上",
  "content": "两棵树的根在地下相遇，地上的枝叶才会交织。",
  "keywords": ["深度", "连接", "理解"],
  "emotionTags": ["期待", "希望"],
  "interpretation": {
    "brief": "真正的连接建立在深层理解之上。"
  }
}
```

#### ORC-LOV-002 [上签]
```json
{
  "id": "ORC-LOV-002",
  "category": "感情",
  "level": "上",
  "content": "月亮不会因为云的遮挡而停止发光。",
  "keywords": ["坚持", "信任", "耐心"],
  "emotionTags": ["怀疑", "焦虑"],
  "interpretation": {
    "brief": "暂时的困难不会改变本质，保持信任。"
  }
}
```

#### ORC-LOV-003 [中签]
```json
{
  "id": "ORC-LOV-003",
  "category": "感情",
  "level": "中",
  "content": "湖面的涟漪需要时间才能平静。",
  "keywords": ["等待", "平静", "时间"],
  "emotionTags": ["迷茫", "焦虑"],
  "interpretation": {
    "brief": "关系需要时间沉淀，不要急于求答案。"
  }
}
```

#### ORC-LOV-004 [下签]
```json
{
  "id": "ORC-LOV-004",
  "category": "感情",
  "level": "下",
  "content": "镜子碎了，拼回去的裂痕永远都在。",
  "keywords": ["裂痕", "接受", "放手"],
  "emotionTags": ["痛苦", "怀疑"],
  "interpretation": {
    "brief": "有些伤害无法完全修复，需要考虑是否继续。"
  }
}
```

#### ORC-LOV-005 [下下签]
```json
{
  "id": "ORC-LOV-005",
  "category": "感情",
  "level": "下下",
  "content": "枯萎的花不会再开，但种子已经落地。",
  "keywords": ["结束", "新生", "放手"],
  "emotionTags": ["绝望", "痛苦"],
  "interpretation": {
    "brief": "这段关系可能已经结束，但新的可能性正在孕育。"
  }
}
```

### 类别：健康 (Health)

#### ORC-HEA-001 [上上签]
```json
{
  "id": "ORC-HEA-001",
  "category": "健康",
  "level": "上上",
  "content": "身体是一座会自我修复的花园。",
  "keywords": ["恢复", "自愈", "信任"],
  "emotionTags": ["希望", "期待"],
  "interpretation": {
    "brief": "身体有强大的自愈能力，给它时间和支持。"
  }
}
```

#### ORC-HEA-002 [上签]
```json
{
  "id": "ORC-HEA-002",
  "category": "健康",
  "level": "上",
  "content": "疲惫的土地需要休耕，而非更多的耕种。",
  "keywords": ["休息", "恢复", "平衡"],
  "emotionTags": ["压力", "焦虑"],
  "interpretation": {
    "brief": "身体在提醒你需要休息，倾听它的声音。"
  }
}
```

#### ORC-HEA-003 [中签]
```json
{
  "id": "ORC-HEA-003",
  "category": "健康",
  "level": "中",
  "content": "树的健康不在于长得快，而在于根扎得深。",
  "keywords": ["基础", "稳定", "长期"],
  "emotionTags": ["焦虑", "迷茫"],
  "interpretation": {
    "brief": "健康是长期工程，关注基础比追求速效更重要。"
  }
}
```

#### ORC-HEA-004 [下签]
```json
{
  "id": "ORC-HEA-004",
  "category": "健康",
  "level": "下",
  "content": "警报响起时，不是关掉警报，而是检查火源。",
  "keywords": ["警示", "重视", "行动"],
  "emotionTags": ["恐惧", "焦虑"],
  "interpretation": {
    "brief": "身体的信号不能忽视，需要认真对待。"
  }
}
```

#### ORC-HEA-005 [下下签]
```json
{
  "id": "ORC-HEA-005",
  "category": "健康",
  "level": "下下",
  "content": "冬天最冷的时候，春天已经在路上。",
  "keywords": ["困境", "希望", "坚持"],
  "emotionTags": ["绝望", "恐惧"],
  "interpretation": {
    "brief": "当前可能很艰难，但要相信身体的韧性。"
  }
}
```

---

## 四、签文创作工作流

### 4.1 创作步骤

1. **确定类别和等级**
2. **选择核心情绪**
3. **寻找自然意象**（水、树、山、云、光等）
4. **构建隐喻**
5. **提炼成20-50字**
6. **添加关键词和标签**

### 4.2 质量检查

每条签文都要问：
- ✅ 是否有诗意？
- ✅ 是否有多重解读空间？
- ✅ 是否避免了直白的预言？
- ✅ 是否能引发思考？
- ✅ 是否适合AI进一步解读？

---

_创建时间: 2026-03-06_  
_状态: 初始版本（15条示例）_  
_目标: 扩展到100条（MVP）_  
_文档维护: 贾维斯 🦞_
