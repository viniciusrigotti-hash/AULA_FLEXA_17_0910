const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensagem: 'Minha API está funcionando!' });
});

app.get('/saudacao/:nome', (req, res) => {
  res.json({ mensagem: `Olá, ${req.params.nome}!` });
});

app.get('/buscar', (req, res) => {
  res.json({ pesquisa: req.query.termo ?? '' });
});

app.post('/eco', (req, res) => {
  res.json({ recebido: req.body });
});

app.listen(PORT, () => {
  console.log(`Servidor em http://localhost:${PORT}`);
});