// 赛博禅宗人格模块

const CyberZen = {
  // 初始化
  init() {
    document.body.classList.add('cyber-zen');
    this.playWoodenFish();
    this.addVisualizer();
  },

  // 木鱼音效
  playWoodenFish() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      const delay = audioCtx.createDelay();
      const feedback = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(delay);
      delay.connect(feedback);
      feedback.connect(delay);
      delay.connect(audioCtx.destination);

      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
      delay.delayTime.value = 0.3;
      feedback.gain.value = 0.4;

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.5);
    } catch (e) {
      console.log('音效初始化失败');
    }
  },

  // 16进制跳动效果
  glitchText(element, finalText) {
    const chars = '0123456789ABCDEF';
    let iterations = 0;
    const maxIterations = 20;
    
    const interval = setInterval(() => {
      element.textContent = finalText
        .split('')
        .map((char, index) => {
          if (index < iterations) return finalText[index];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');
      
      iterations += 1;
      if (iterations > maxIterations) {
        clearInterval(interval);
        element.textContent = finalText;
      }
    }, 30);
  },

  // 渲染结果
  render(fortune) {
    const resultBox = document.querySelector('.result-box');
    resultBox.innerHTML = `
      <div class="cz-seed">>> SOURCE_SEED: [ 赛博禅宗 ]</div>
      
      <div class="cz-module">
        <div class="cz-label">[ 现实锚点 ]</div>
        <div class="cz-content">赛博禅宗协议接入成功</div>
      </div>
      
      <div class="cz-module">
        <div class="cz-label">[ 频谱感知 ]</div>
        <div class="cz-vibes" id="cz-vibes">${fortune.text}</div>
      </div>
      
      <div class="cz-module">
        <div class="cz-label">[ 核心定论 ]</div>
        <div class="cz-resolution" id="cz-resolution">「 ${fortune.interpretation.core} 」</div>
      </div>
      
      <div class="cz-module">
        <div class="cz-label">[ 维度透视 ]</div>
        <div class="cz-content" id="cz-perspective">${fortune.interpretation.perspective}</div>
      </div>
      
      <div class="cz-module">
        <div class="cz-label">[ 行为干预 ]</div>
        <div class="cz-content" id="cz-intervention">${fortune.interpretation.intervention}</div>
      </div>
      
      <div class="cz-module">
        <div class="cz-label">[ 算力执行 ]</div>
        <div class="cz-action" id="cz-action">> EXEC: ${fortune.interpretation.action}</div>
      </div>
      
      <div class="cz-log">>>> SYSTEM_LOG: CAUSALITY_LOCKED // 因果律已锁定</div>
      
      <button id="btn-restart" class="btn">> RESTART_PROTOCOL</button>
    `;

    // 应用跳动效果
    setTimeout(() => {
      ['cz-vibes', 'cz-resolution', 'cz-perspective', 'cz-intervention', 'cz-action'].forEach((id, i) => {
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) this.glitchText(el, el.textContent);
        }, i * 300);
      });
    }, 500);
  },

  // 添加波纹可视化
  addVisualizer() {
    const visualizer = document.createElement('div');
    visualizer.className = 'cz-visualizer';
    visualizer.innerHTML = '<div class="cz-wave"></div>';
    document.body.appendChild(visualizer);
  },

  // 清理
  cleanup() {
    document.body.classList.remove('cyber-zen');
    const visualizer = document.querySelector('.cz-visualizer');
    if (visualizer) visualizer.remove();
  }
};

// 导出
window.CyberZen = CyberZen;
