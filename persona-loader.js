// Zenfix 人格加载器
// 在 index.html 的 </body> 前引入此文件

(function() {
  // 动态加载人格模块
  window.loadPersona = async function(personaId) {
    try {
      // 加载人格配置
      const configRes = await fetch('data/personas.json');
      const config = await configRes.json();
      const persona = config.personas.find(p => p.id === personaId);
      
      if (!persona) {
        console.error('人格不存在:', personaId);
        return null;
      }
      
      // 动态加载CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = persona.styleFile;
      document.head.appendChild(link);
      
      // 动态加载JS模块
      const script = document.createElement('script');
      script.src = persona.moduleFile;
      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
      
      // 加载签文数据
      const dataRes = await fetch(persona.dataFile);
      const data = await dataRes.json();
      
      return { persona, data };
      
    } catch (error) {
      console.error('加载人格失败:', error);
      return null;
    }
  };
  
  // 渲染人格结果
  window.renderPersonaResult = function(personaId, categoryId, fortune) {
    if (personaId === 'cyber-zen' && window.CyberZen) {
      CyberZen.init();
      CyberZen.render(fortune);
    } else {
      // 默认渲染（保持原有逻辑）
      renderClassicResult(fortune);
    }
  };
  
  // 默认古典风格渲染（占位）
  function renderClassicResult(fortune) {
    const resultBox = document.querySelector('.result-box');
    if (resultBox) {
      resultBox.innerHTML = `
        <div class="interpretation">
          <p><strong>签文：</strong>${fortune.text}</p>
          <p><strong>解析：</strong>${fortune.interpretation.core}</p>
          <p>${fortune.interpretation.perspective}</p>
          <p><strong>建议：</strong>${fortune.interpretation.intervention}</p>
          <p><strong>行动：</strong>${fortune.interpretation.action}</p>
        </div>
      `;
    }
  }
})();
