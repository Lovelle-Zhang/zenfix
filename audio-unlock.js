// 手机端音频修复 - 顺序播放
(function() {
  let audioUnlocked = false;
  const audio = document.getElementById('bell-sound');
  
  // 重写playBellSound函数，顺序播放
  window.playBellSound = function() {
    if (!audio) return;
    
    // 重置到开头并播放
    audio.currentTime = 0;
    audio.play().catch(e => {
      console.log('Audio play failed:', e);
    });
  };
  
  // 在用户第一次交互时解锁音频
  function unlockAudio() {
    if (audioUnlocked || !audio) return;
    
    audio.play().then(() => {
      audio.pause();
      audio.currentTime = 0;
      audioUnlocked = true;
      console.log('Audio unlocked');
    }).catch(e => {
      console.log('Audio unlock failed:', e);
    });
  }
  
  document.addEventListener('click', unlockAudio, { once: true });
  document.addEventListener('touchstart', unlockAudio, { once: true });
})();
