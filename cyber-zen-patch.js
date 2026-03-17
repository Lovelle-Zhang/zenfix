// 赛博禅宗集成补丁
// 在 app.js 末尾添加此代码

// 保存原始的显示结果函数
const originalShowResult = window.showResult || function() {};

// 重写显示结果函数
window.showResult = async function(selectedPersona, selectedCategory) {
  // 如果选择的是赛博禅宗
  if (selectedPersona === 'cyber-zen') {
    const result = await loadPersona('cyber-zen');
    if (result) {
      const category = result.data.persona.categories.find(c => c.id === selectedCategory);
      if (category) {
        const fortune = category.fortunes[Math.floor(Math.random() * category.fortunes.length)];
        renderPersonaResult('cyber-zen', selectedCategory, fortune);
        return;
      }
    }
  }
  
  // 其他人格使用原始逻辑
  originalShowResult(selectedPersona, selectedCategory);
};

// 在人格列表中添加赛博禅宗选项
document.addEventListener('DOMContentLoaded', function() {
  const personaList = document.getElementById('persona-list');
  if (personaList && !document.querySelector('[data-persona="cyber-zen"]')) {
    const cyberZenCard = document.createElement('div');
    cyberZenCard.className = 'card';
    cyberZenCard.setAttribute('data-persona', 'cyber-zen');
    cyberZenCard.innerHTML = `
      <h3>赛博禅宗</h3>
      <p>数字维摩诘</p>
    `;
    personaList.appendChild(cyberZenCard);
  }
});
