const API_URL = '/api';

let state = { persona: null, category: null };

async function init() {
  await loadPersonas();
  setupEventListeners();
}

async function loadPersonas() {
  const res = await fetch(`${API_URL}/personas`);
  const personas = await res.json();
  
  const container = document.getElementById('persona-list');
  personas.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<h3>${p.name}</h3><p>${p.desc}</p>`;
    card.onclick = () => selectPersona(p.id);
    container.appendChild(card);
  });
}

function selectPersona(persona) {
  state.persona = persona;
  showStep('step-category');
  loadCategories();
}

async function loadCategories() {
  const res = await fetch(`${API_URL}/categories`);
  const categories = await res.json();
  
  const container = document.getElementById('category-list');
  container.innerHTML = '';
  categories.forEach(c => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<h3>${c}</h3>`;
    card.onclick = () => selectCategory(c);
    container.appendChild(card);
  });
}

function selectCategory(category) {
  state.category = category;
  showStep('step-meditation');
  startMeditation();
}

function startMeditation() {
  const countdown = document.querySelector('.countdown');
  let count = 3;
  
  const timer = setInterval(() => {
    countdown.textContent = count;
    count--;
    
    if (count < 0) {
      clearInterval(timer);
      drawOracle();
    }
  }, 1000);
}

async function drawOracle() {
  const res = await fetch(`${API_URL}/draw`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(state)
  });
  
  const result = await res.json();
  showResult(result.interpretation);
}

function showResult(text) {
  showStep('step-result');
  const container = document.getElementById('interpretation');
  container.textContent = '';
  
  let i = 0;
  const typewriter = setInterval(() => {
    if (i < text.length) {
      container.textContent += text[i];
      i++;
    } else {
      clearInterval(typewriter);
    }
  }, 30);
}

function showStep(stepId) {
  document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
  document.getElementById(stepId).classList.add('active');
}

function setupEventListeners() {
  document.getElementById('btn-restart').onclick = () => {
    state = { persona: null, category: null };
    showStep('step-persona');
  };
}

init();
