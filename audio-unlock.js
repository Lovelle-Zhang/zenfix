// 手机端音频修复 - 使用HTML5 Audio
(function() {
  let audioUnlocked = false;
  
  // 重写playBellSound函数，使用HTML5 audio
  window.playBellSound = function() {
    const audio = document.getElementById('bell-sound');
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(e => {
        console.log('Audio play failed:', e);
      });
    }
  };
  
  // 在用户第一次交互时解锁音频
  function unlockAudio() {
    if (audioUnlocked) return;
    
    const audio = document.getElementById('bell-sound');
    if (audio) {
      // 播放并立即暂停，解锁音频
      audio.play().then(() => {
        audio.pause();
        audio.currentTime = 0;
        audioUnlocked = true;
        console.log('Audio unlocked for mobile');
      }).catch(e => {
        console.log('Audio unlock failed:', e);
      });
    }
  }
  
  document.addEventListener('click', unlockAudio, { once: true });
  document.addEventListener('touchstart', unlockAudio, { once: true });
})();
