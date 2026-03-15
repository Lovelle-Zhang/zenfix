// 神经接入转场协议 - 控制脚本

(function() {
  // 触感反馈函数
  function vibrate(type = 'heavy') {
    if (navigator.vibrate) {
      navigator.vibrate(type === 'heavy' ? 50 : 20);
    }
  }

  // Logo震荡时触发震动
  setTimeout(() => {
    vibrate('heavy');
  }, 2000);

  // 卡片扫描时轻微震动
  [2900, 3000, 3100, 3200].forEach(delay => {
    setTimeout(() => vibrate('light'), delay);
  });

  // 3.6秒后移除splash screen
  setTimeout(() => {
    const splash = document.getElementById('splash-screen');
    const laser = document.getElementById('laser-scan');
    if (splash) splash.remove();
    if (laser) laser.remove();
  }, 3600);
})();
