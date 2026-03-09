const API_BASE = 'http://localhost:3000/api';

let currentQuestion = '';
let selectedPersona = '';

// 人格卡片点击事件
document.querySelectorAll('.persona-card').forEach(card => {
  card.addEventListener('click', async () => {
    const question = document.getElementById('question').value.trim();
    
    if (!question) {
      alert('请先输入你的问题');
      return;
    }
    
    currentQuestion = question;
    selectedPersona = card.dataset.persona;
    
    // 获取签文
    await getOracle();
  });
});

// 获取签文
async function getOracle() {
  try {
    const response = await fetch(`${API_BASE}/oracle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        persona: selectedPersona,
        question: currentQuestion
      })
    });
    
    const data = await response.json();
    displayOracle(data);
  } catch (error) {
    console.error('Error:', error);
    alert('获取签文失败,请重试');
  }
}

// 显示签文
function displayOracle(data) {
  const { oracle, interpretation } = data;
  
  document.getElementById('oracle-id').textContent = oracle.id;
  document.getElementById('oracle-level').textContent = oracle.level;
  document.getElementById('oracle-category').textContent = oracle.category;
  document.getElementById('oracle-imagery').textContent = oracle.imagery;
  document.getElementById('oracle-verdict').textContent = oracle.verdict;
  document.getElementById('oracle-insight').textContent = oracle.insight;
  document.getElementById('oracle-advice').textContent = oracle.advice;
  document.getElementById('oracle-task').textContent = oracle.task;
  document.getElementById('interpretation-text').textContent = interpretation;
  
  // 切换到结果页
  document.getElementById('input-stage').classList.remove('active');
  document.getElementById('result-stage').classList.add('active');
}

// 重新开始
document.getElementById('retry-btn').addEventListener('click', () => {
  document.getElementById('question').value = '';
  document.getElementById('input-stage').classList.add('active');
  document.getElementById('result-stage').classList.remove('active');
});
