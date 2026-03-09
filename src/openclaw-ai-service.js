/**
 * Zenfix - OpenClaw AI解签服务
 * 本地HTTP服务，接收解签请求，返回AI生成的解签内容
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3737;

// 加载人格提示词
const prompts = {
  zenclaw: fs.readFileSync(path.join(__dirname, '../prompts/zenclaw-style-guide-v2.md'), 'utf8'),
  cyberzen: fs.readFileSync(path.join(__dirname, '../prompts/cyber-zen-v2.md'), 'utf8'),
  stoic: fs.readFileSync(path.join(__dirname, '../prompts/stoic-v2.md'), 'utf8'),
  futureSurvivor: fs.readFileSync(path.join(__dirname, '../prompts/future-survivor-v2.md'), 'utf8')
};

// 创建HTTP服务器
const server = http.createServer((req, res) => {
  // 设置CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  if (req.method === 'POST' && req.url === '/interpret') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const { oracle, userContext, persona } = data;
        
        console.log(`\n📥 收到解签请求: ${persona} - ${oracle.category}`);
        
        // 构建提示词
        const systemPrompt = buildSystemPrompt(persona);
        const userPrompt = buildUserPrompt(oracle, userContext, persona);
        
        // 保存请求到临时文件，供OpenClaw读取
        const requestFile = path.join(__dirname, '../temp/ai-request.json');
        const responseFile = path.join(__dirname, '../temp/ai-response.txt');
        
        // 确保temp目录存在
        const tempDir = path.join(__dirname, '../temp');
        if (!fs.existsSync(tempDir)) {
          fs.mkdirSync(tempDir, { recursive: true });
        }
        
        // 写入请求
        fs.writeFileSync(requestFile, JSON.stringify({
          systemPrompt,
          userPrompt,
          persona,
          timestamp: Date.now()
        }, null, 2));
        
        // 删除旧的响应文件
        if (fs.existsSync(responseFile)) {
          fs.unlinkSync(responseFile);
        }
        
        console.log('📝 请求已保存到:', requestFile);
        console.log('⏳ 等待OpenClaw生成解签...');
        console.log('   (请在OpenClaw中运行解签生成脚本)');
        
        // 轮询等待响应文件
        let attempts = 0;
        const maxAttempts = 60; // 60秒超时
        
        const checkResponse = setInterval(() => {
          attempts++;
          
          if (fs.existsSync(responseFile)) {
            clearInterval(checkResponse);
            
            const response = fs.readFileSync(responseFile, 'utf8');
            console.log('✅ 解签生成完成\n');
            
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ 
              success: true, 
              interpretation: response 
            }));
          } else if (attempts >= maxAttempts) {
            clearInterval(checkResponse);
            
            console.log('⏱️  超时，使用降级方案\n');
            
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ 
              success: false, 
              error: 'Timeout',
              fallback: buildFallback(oracle, persona)
            }));
          }
        }, 1000);
        
      } catch (error) {
        console.error('❌ 请求处理失败:', error.message);
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: false, error: error.message }));
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

function buildSystemPrompt(persona) {
  const descriptions = {
    zenclaw: '你是ZenClaw，一个冷峻但有洞察力的AI。你用赛博朋克美学和系统思维帮助用户看清问题本质。',
    cyberzen: '你是Cyber-Zen，一个温暖诗意的AI。你用自然意象和禅意帮助用户化解执念，回归当下。',
    stoic: '你是Stoic，一个理性但有温度的AI。你用控制二分法帮助用户区分可控和不可控。',
    futureSurvivor: '你是Future-Survivor，一个来自2076年的AI。你用长期视角帮助用户看到希望和意义。'
  };
  
  return `${descriptions[persona]}

基于签文内容，结合用户情境，生成一段个性化解读（200-300字）。
要求：保持人格特色，不重复签文原文，有温度，提供具体建议。`;
}

function buildUserPrompt(oracle, userContext, persona) {
  let content = '';
  
  switch(persona) {
    case 'zenclaw':
      content = `签文：${oracle.imagery}\n${oracle.verdict}\n${oracle.insight}`;
      break;
    case 'cyberzen':
      content = `签文：${oracle.seeing}\n${oracle.insight}\n${oracle.return}`;
      break;
    case 'stoic':
      content = `签文：${oracle.reality}\n${oracle.control}\n${oracle.counsel}`;
      break;
    case 'futureSurvivor':
      content = `签文：${oracle.future}\n${oracle.historical}\n${oracle.meaning}`;
      break;
  }
  
  return `用户情境：${userContext}\n\n${content}\n\n类别：${oracle.category}\n主题：${oracle.theme}`;
}

function buildFallback(oracle, persona) {
  // 降级方案：返回签文原文
  let content = '';
  
  switch(persona) {
    case 'zenclaw':
      content = `${oracle.imagery}\n\n${oracle.verdict}\n\n${oracle.insight}\n\n${oracle.advice}`;
      break;
    case 'cyberzen':
      content = `${oracle.seeing}\n\n${oracle.insight}\n\n${oracle.return}\n\n${oracle.practice}`;
      break;
    case 'stoic':
      content = `${oracle.reality}\n\n${oracle.control}\n\n${oracle.counsel}\n\n${oracle.action}`;
      break;
    case 'futureSurvivor':
      content = `${oracle.future}\n\n${oracle.historical}\n\n${oracle.meaning}\n\n${oracle.action}`;
      break;
  }
  
  return content;
}

server.listen(PORT, () => {
  console.log(`\n🚀 OpenClaw AI解签服务已启动`);
  console.log(`   监听端口: ${PORT}`);
  console.log(`   请求地址: http://localhost:${PORT}/interpret`);
  console.log(`\n💡 使用方法:`);
  console.log(`   1. 保持此服务运行`);
  console.log(`   2. 运行Zenfix Demo`);
  console.log(`   3. 当收到解签请求时，在OpenClaw中运行生成脚本\n`);
});
