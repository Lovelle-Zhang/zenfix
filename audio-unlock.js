// 手机端音频修复 - 增强版
(function() {
  let audioContext = null;
  let audioUnlocked = false;
  
  function initAudioContext() {
    if (audioContext) return audioContext;
    
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return null;
    
    audioContext = new AudioContext();
    return audioContext;
  }
  
  function unlockAudio() {
    if (audioUnlocked) return;
    
    const ctx = initAudioContext();
    if (!ctx) return;
    
    // 创建一个静音音频来解锁
    const buffer = ctx.createBuffer(1, 1, 22050);
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start(0);
    
    // 恢复音频上下文
    if (ctx.state === 'suspended') {
      ctx.resume().then(() => {
        audioUnlocked = true;
        console.log('Audio unlocked for mobile');
      });
    } else {
      audioUnlocked = true;
    }
  }
  
  // 在用户第一次交互时解锁
  document.addEventListener('click', unlockAudio, { once: true });
  document.addEventListener('touchstart', unlockAudio, { once: true });
  
  // 确保音频上下文始终处于运行状态
  document.addEventListener('visibilitychange', function() {
    if (!document.hidden && audioContext && audioContext.state === 'suspended') {
      audioContext.resume();
    }
  });
})();
