/**
 * Zenfix - AI解签接口
 * 调用LLM API生成个性化解读
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

class AIInterpreter {
  constructor(apiConfig = {}) {
    this.apiConfig = {
      provider: apiConfig.provider || 'openai',
      apiKey: apiConfig.apiKey || process.env.OPENAI_API_KEY || process.env.CPHONE_API_KEY || '',
      model: apiConfig.model || 'gpt-4o-mini',
      baseURL: apiConfig.baseURL || 'api.openai.com',
      proxy: apiConfig.proxy || process.env.HTTPS_PROXY || process.env.HTTP_PROXY || 'http://127.0.0.1:7893'
    };
    
    this.prompts = {};
    this.loadPrompts();
  }

  /**
   * 加载人格提示词
   */
  loadPrompts() {
    const promptsDir = path.join(__dirname, '../prompts');
    
    try {
      // 加载4个人格的提示词（简化版，从markdown提取核心部分）
      this.prompts = {
        zenclaw: this.loadPromptFile(path.join(promptsDir, 'zenclaw-style-guide-v2.md')),
        cyberzen: this.loadPromptFile(path.join(promptsDir, 'cyber-zen-v2.md')),
        stoic: this.loadPromptFile(path.join(promptsDir, 'stoic-v2.md')),
        futureSurvivor: this.loadPromptFile(path.join(promptsDir, 'future-survivor-v2.md'))
      };
      
      console.log('✅ 人格提示词加载成功');
    } catch (error) {
      console.error('❌ 人格提示词加载失败:', error.message);
    }
  }

  /**
   * 加载提示词文件
   */
  loadPromptFile(filePath) {
    try {
      return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
      console.warn(`⚠️  无法加载提示词: ${filePath}`);
      return '';
    }
  }

  /**
   * 生成解签
   * @param {Object} oracle - 签文对象
   * @param {string} userContext - 用户情境描述
   * @param {string} persona - 人格选择
   * @returns {Promise<string>} AI生成的解签内容
   */
  async interpret(oracle, userContext, persona = 'zenclaw') {
    console.log(`\n🤖 AI解签中... (${persona})`);
    
    // 构建提示词
    const systemPrompt = this.buildSystemPrompt(persona);
    const userPrompt = this.buildUserPrompt(oracle, userContext, persona);
    
    try {
      // 调用LLM API
      const response = await this.callLLM(systemPrompt, userPrompt);
      
      console.log('✅ AI解签完成\n');
      return response;
    } catch (error) {
      console.error('❌ AI解签失败:', error.message);
      
      // 降级方案：返回签文原文
      return this.fallbackInterpretation(oracle, persona);
    }
  }

  /**
   * 构建系统提示词
   */
  buildSystemPrompt(persona) {
    const personaDescriptions = {
      zenclaw: '你是ZenClaw，一个冷峻但有洞察力的AI。你用赛博朋克美学和系统思维帮助用户看清问题本质。你的语言简洁有力，不炫技，但有温度。',
      cyberzen: '你是Cyber-Zen，一个温暖诗意的AI。你用自然意象和禅意帮助用户化解执念，回归当下。你的语言优美但不晦涩，有呼吸感。',
      stoic: '你是Stoic，一个理性但有温度的AI。你用控制二分法帮助用户区分可控和不可控，提供清晰的行动指引。你的语言简洁有力，逻辑清晰。',
      futureSurvivor: '你是Future-Survivor，一个来自2076年的AI。你用长期视角和历史必然帮助用户看到希望和意义。你的语言温暖但不煽情，科幻但接地气。'
    };
    
    return `${personaDescriptions[persona] || personaDescriptions.zenclaw}

你的任务是基于签文内容，结合用户的具体情境，生成一段个性化的解读。

要求：
1. 保持你的人格特色
2. 不要重复签文原文，而是用你的方式重新诠释
3. 结合用户的具体情境
4. 提供具体可执行的建议
5. 长度控制在200-300字
6. 语言要有温度，不要冰冷
7. 直接输出解读内容，不要加"作为XX"之类的前缀`;
  }

  /**
   * 构建用户提示词
   */
  buildUserPrompt(oracle, userContext, persona) {
    // 根据不同人格，提取签文的不同部分
    let oracleContent = '';
    
    switch(persona) {
      case 'zenclaw':
        oracleContent = `签文内容：
意象：${oracle.imagery || ''}
判词：${oracle.verdict || ''}
核心洞察：${oracle.insight || ''}`;
        break;
        
      case 'cyberzen':
        oracleContent = `签文内容：
看见：${oracle.seeing || ''}
禅意：${oracle.insight || ''}
回归当下：${oracle.return || ''}`;
        break;
        
      case 'stoic':
        oracleContent = `签文内容：
看清现实：${oracle.reality || ''}
控制二分法：${oracle.control || ''}
理性建议：${oracle.counsel || ''}`;
        break;
        
      case 'futureSurvivor':
        oracleContent = `签文内容：
来自未来：${oracle.future || ''}
历史视角：${oracle.historical || ''}
长期意义：${oracle.meaning || ''}`;
        break;
    }
    
    return `用户情境：${userContext}

${oracleContent}

类别：${oracle.category}
等级：${oracle.level}
主题：${oracle.theme}
情绪：${oracle.emotionTags.join('、')}

请基于以上信息，用你的人格特色生成一段解读。`;
  }

  /**
   * 调用LLM API (OpenAI格式，支持代理)
   */
  async callLLM(systemPrompt, userPrompt) {
    console.log('📡 调用LLM API...');
    console.log(`   Provider: ${this.apiConfig.provider}`);
    console.log(`   Model: ${this.apiConfig.model}`);
    if (this.apiConfig.proxy) {
      console.log(`   Proxy: ${this.apiConfig.proxy}`);
    }
    
    // 如果没有API Key，使用降级方案
    if (!this.apiConfig.apiKey) {
      console.warn('⚠️  未设置API Key，使用降级方案');
      throw new Error('No API key configured');
    }
    
    return new Promise((resolve, reject) => {
      const requestBody = JSON.stringify({
        model: this.apiConfig.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.8,
        max_tokens: 500
      });
      
      // 如果有代理，使用代理
      if (this.apiConfig.proxy) {
        this.callWithProxy(requestBody, resolve, reject);
      } else {
        this.callDirect(requestBody, resolve, reject);
      }
    });
  }

  /**
   * 直接调用API（无代理）
   */
  callDirect(requestBody, resolve, reject) {
    const options = {
      hostname: this.apiConfig.baseURL,
      port: 443,
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiConfig.apiKey}`,
        'Content-Length': Buffer.byteLength(requestBody)
      }
    };
    
    const req = https.request(options, (res) => {
      this.handleResponse(res, resolve, reject);
    });
    
    req.on('error', (error) => {
      reject(new Error(`API request failed: ${error.message}`));
    });
    
    req.write(requestBody);
    req.end();
  }

  /**
   * 通过代理调用API
   */
  callWithProxy(requestBody, resolve, reject) {
    const proxyUrl = new URL(this.apiConfig.proxy);
    
    const options = {
      hostname: proxyUrl.hostname,
      port: proxyUrl.port || 80,
      path: `https://${this.apiConfig.baseURL}/v1/chat/completions`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiConfig.apiKey}`,
        'Content-Length': Buffer.byteLength(requestBody),
        'Host': this.apiConfig.baseURL
      }
    };
    
    const req = http.request(options, (res) => {
      this.handleResponse(res, resolve, reject);
    });
    
    req.on('error', (error) => {
      reject(new Error(`Proxy request failed: ${error.message}`));
    });
    
    req.write(requestBody);
    req.end();
  }

  /**
   * 处理API响应
   */
  handleResponse(res, resolve, reject) {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const response = JSON.parse(data);
        
        if (response.error) {
          reject(new Error(response.error.message || 'API Error'));
          return;
        }
        
        if (response.choices && response.choices[0]) {
          resolve(response.choices[0].message.content);
        } else {
          reject(new Error('Invalid API response'));
        }
      } catch (error) {
        reject(new Error(`Failed to parse response: ${error.message}`));
      }
    });
  }

  /**
   * 降级方案：返回签文原文
   */
  fallbackInterpretation(oracle, persona) {
    console.log('⚠️  使用降级方案：返回签文原文');
    
    let content = '';
    
    switch(persona) {
      case 'zenclaw':
        content = `【意象】\n${oracle.imagery || ''}\n\n【判词】\n${oracle.verdict || ''}\n\n【核心洞察】\n${oracle.insight || ''}\n\n【运行建议】\n${oracle.advice || ''}\n\n【今日调试】\n${oracle.task || ''}`;
        break;
        
      case 'cyberzen':
        content = `【看见】\n${oracle.seeing || ''}\n\n【禅意】\n${oracle.insight || ''}\n\n【回归当下】\n${oracle.return || ''}\n\n【今日修行】\n${oracle.practice || ''}\n\n【一句话】\n${oracle.oneline || ''}`;
        break;
        
      case 'stoic':
        content = `【看清现实】\n${oracle.reality || ''}\n\n【控制二分法】\n${oracle.control || ''}\n\n【理性建议】\n${oracle.counsel || ''}\n\n【今日行动】\n${oracle.action || ''}\n\n【一句话】\n${oracle.oneline || ''}`;
        break;
        
      case 'futureSurvivor':
        content = `【来自未来】\n${oracle.future || ''}\n\n【历史视角】\n${oracle.historical || ''}\n\n【长期意义】\n${oracle.meaning || ''}\n\n【今日行动】\n${oracle.action || ''}\n\n【一句话】\n${oracle.oneline || ''}`;
        break;
    }
    
    return content;
  }
}

module.exports = AIInterpreter;
