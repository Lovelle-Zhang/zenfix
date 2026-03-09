const express = require('express');
const app = express();
const PORT = 3000;

// 测试路由
app.get('/', (req, res) => {
  res.send('<h1>Zenfix Test</h1><p>Server is working!</p>');
});

app.listen(PORT, () => {
  console.log(`Test server running on http://localhost:${PORT}`);
});
