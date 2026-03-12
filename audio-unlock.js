// 手机端音频修复
(function() {
  // 解锁音频上下文（移动端需要）
  let audioUnlocked = false;
  
  function unlockAudio() {
    if (audioUnlocked) return;
    
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const buffer = ctx.createBuffer(1, 1, 22050);
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start(0);
    
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    
    audioUnlocked = true;
  }
  
  // 在任何用户交互时解锁音频
  document.addEventListener('click', unlockAudio, { once: true });
  document.addEventListener('touchstart', unlockAudio, { once: true });
})();
