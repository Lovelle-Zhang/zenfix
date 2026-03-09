# Zenfix 技术架构设计

## 一、系统架构概览

```
┌─────────────────────────────────────────────────────────┐
│                    客户端层 (Client)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   iOS App    │  │  Android App │  │   Web App    │  │
│  │ React Native │  │ React Native │  │    React     │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                    API网关层 (Gateway)                    │
│              GraphQL / REST API                          │
│              认证、限流、日志                              │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                    业务服务层 (Services)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  签文服务    │  │  AI解签服务  │  │  艺术生成    │  │
│  │  Oracle Svc  │  │  AI Service  │  │  Art Service │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  用户服务    │  │  互助服务    │  │  订阅服务    │  │
│  │  User Svc    │  │ Community Svc│  │  Sub Service │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                    数据层 (Data)                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  PostgreSQL  │  │     Redis    │  │      S3      │  │
│  │  主数据库    │  │    缓存层    │  │   媒体存储   │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                  第三方服务层 (External)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   OpenAI     │  │  Stability   │  │   Stripe     │  │
│  │   GPT-4      │  │  Stable Diff │  │   支付       │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## 二、技术栈选型

### 2.1 前端 (Mobile App)

**推荐：React Native**

优势：
- 跨平台（iOS + Android）
- 丰富的生态系统
- 性能优秀
- 支持生物反馈传感器

关键库：
- `react-native-reanimated` - 流畅动画
- `react-native-sensors` - 生物反馈（心率、压力）
- `react-native-canvas` - 生成式艺术渲染
- `react-native-haptic-feedback` - 触觉反馈

### 2.2 后端 (API Server)

**推荐：Node.js + NestJS**

优势：
- TypeScript全栈
- 模块化架构
- 内置依赖注入
- 易于扩展

备选：
- Python + FastAPI（如果AI/ML工作负载重）

### 2.3 数据库

**主数据库：PostgreSQL**
- 用户数据
- 签文库
- 订阅记录

**缓存层：Redis**
- 会话管理
- 热点数据缓存
- 实时统计（"3,421人与你感知到同样的波动"）

**媒体存储：S3 / OSS**
- 生成的艺术图
- 用户上传的内容

### 2.4 AI服务

**文本生成：OpenAI GPT-4 / Claude**
- 多维人格解签
- 心流建议生成
- 情感分析

**图像生成：Stable Diffusion / DALL-E**
- 数字护身符
- 流沙画 / 星云图
- 根据情绪状态生成

**微调策略**：
- 收集心理学干预文献
- 哲学著作（斯多葛、禅宗）
- 治愈系文学
- Fine-tune专属模型

### 2.5 生物反馈技术

**心率检测**：
- iOS: HealthKit
- Android: Google Fit API
- 或通过摄像头检测（PPG技术）

**压力感应**：
- 触摸压力传感器
- 长按时长和力度变化

## 三、核心模块设计

### 3.1 量子观测引擎 (Quantum Oracle Engine)

**输入**：
- 用户生物反馈数据（心率、压力）
- 时间戳
- 地理位置（可选）
- 历史抽签记录

**处理**：
- 混合真随机数源（random.org）
- 生物数据哈希
- 量子叙事包装

**输出**：
- 签文ID
- 置信度分数
- 量子纠缠可视化参数

### 3.2 AI解签服务 (AI Interpretation Service)

**人格系统**：
```typescript
interface AIPersona {
  id: string;
  name: string; // "斯多葛学派" | "赛博禅宗" | "未来幸存者"
  systemPrompt: string;
  tone: string;
  temperature: number;
  maxTokens: number;
}
```

**解签流程**：
1. 接收签文ID + 用户上下文
2. 选择AI人格
3. 调用LLM生成解签内容
4. 结构化输出（心流建议 + 概率图谱 + 哲学慰藉）

### 3.3 生成式艺术引擎 (Generative Art Engine)

**输入**：
- 签文内容
- 用户情绪状态（从生物反馈推断）
- 视觉风格偏好

**生成策略**：
- Stable Diffusion + ControlNet
- 风格提示词模板库
- 后处理（滤镜、色调调整）

**输出**：
- 高分辨率艺术图（2048x2048）
- 缩略图（用于UI）
- 元数据（生成参数、种子）

### 3.4 互助系统 (Community Service)

**全球共振统计**：
- Redis实时计数
- 按签文类型/情绪分类
- 匿名化处理

**光点系统**：
- 用户可留下匿名鼓励
- 随机分发给同类签文的其他用户
- 防滥用机制（每日限额、内容审核）

## 四、数据模型设计

### 4.1 核心实体

**User (用户)**
```typescript
{
  id: UUID,
  username: string,
  email: string,
  subscriptionTier: 'free' | 'daily' | 'premium',
  createdAt: timestamp,
  preferences: {
    defaultPersona: string,
    visualStyle: string,
    notificationSettings: object
  }
}
```

**Oracle (签文)**
```typescript
{
  id: UUID,
  category: string, // 事业、感情、健康、财运、人际
  level: string, // 上上、上、中、下、下下
  content: string,
  keywords: string[],
  emotionTags: string[], // 焦虑、迷茫、希望、恐惧
  createdAt: timestamp
}
```

**Reading (解签记录)**
```typescript
{
  id: UUID,
  userId: UUID,
  oracleId: UUID,
  personaUsed: string,
  biofeedback: {
    heartRate?: number,
    pressure?: number,
    duration: number
  },
  interpretation: string,
  actionSuggestion: string,
  artworkUrl: string,
  createdAt: timestamp
}
```

**LightPoint (光点)**
```typescript
{
  id: UUID,
  fromUserId: UUID, // 匿名化
  emotionTag: string,
  message: string,
  receivedCount: number,
  createdAt: timestamp
}
```

## 五、技术挑战与解决方案

### 5.1 生物反馈准确性

**挑战**：移动设备的传感器精度有限

**方案**：
- 不追求医疗级精度
- 重点在于"仪式感"和"参与感"
- 数据用于叙事，而非诊断

### 5.2 AI生成内容质量

**挑战**：避免生成陈词滥调或不当内容

**方案**：
- 精心设计的系统提示词
- 内容审核层（敏感词过滤）
- 人工审核 + 用户反馈循环
- 持续微调模型

### 5.3 实时统计的可扩展性

**挑战**："3,421人与你感知到同样的波动"需要实时统计

**方案**：
- Redis HyperLogLog（近似计数，内存高效）
- 按情绪标签分桶
- 每分钟更新一次（不需要绝对实时）

### 5.4 生成式艺术的成本控制

**挑战**：每次解签都生成图像，成本高昂

**方案**：
- 免费用户：预生成模板库（1000+张）
- 付费用户：实时生成
- 缓存相似请求的结果
- 批量生成降低单价

## 六、安全与隐私

### 6.1 数据隐私

- 生物反馈数据不存储原始值，只存储哈希
- 用户可随时删除所有历史记录
- 互助系统完全匿名化

### 6.2 内容审核

- AI生成内容的敏感词过滤
- 用户生成内容（光点）的审核机制
- 防止有害信息传播

### 6.3 心理健康责任

- 明确声明：Zenfix不是心理治疗工具
- 提供专业心理咨询资源链接
- 检测高风险情绪时推荐寻求专业帮助

## 七、部署架构

**推荐：云原生架构**

- **容器化**：Docker + Kubernetes
- **CI/CD**：GitHub Actions
- **监控**：Prometheus + Grafana
- **日志**：ELK Stack
- **CDN**：CloudFlare（全球加速）

**成本优化**：
- 初期：单体应用 + 单服务器
- 扩展：微服务 + 自动扩缩容

---

_创建时间: 2026-03-06_  
_文档维护: 贾维斯 🦞_
