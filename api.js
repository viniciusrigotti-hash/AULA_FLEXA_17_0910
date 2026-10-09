const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let produtos = [
  { id: 1, nome: 'Mouse', preco: 59.90, estoque: 12 },
  { id: 2, nome: 'Teclado', preco: 99.90, estoque: 8 }
];
let proximoId = 3;

function validarProduto(dados) {
  if (!dados || typeof dados.nome !== 'string' ||
      !dados.nome.trim() ||
      typeof dados.preco !== 'number' ||
      !Number.isFinite(dados.preco) || dados.preco < 0 ||
      !Number.isInteger(dados.estoque) || dados.estoque < 0) {
    return false;
  }
  return true;
}

// GET — listar produtos
app.get('/produtos', (req, res) => {
  res.json(produtos);
});

// GET — consultar por ID
app.get('/produtos/:id', (req, res) => {
  const id = Number(req.params.id);
  const produto = produtos.find(p => p.id === id);
  if (!produto) {
    return res.status(404).json({ erro: 'Produto não encontrado' });
  }
  res.json(produto);
});

// POST — cadastrar produto
app.post('/produtos', (req, res) => {
  if (!validarProduto(req.body)) {
    return res.status(400).json({ erro: 'Informe nome, preco e estoque válidos' });
  }
  const { nome, preco, estoque } = req.body;
  const produto = { id: proximoId++, nome: nome.trim(), preco, estoque };
  produtos.push(produto);
  res.status(201).location(`/produtos/${produto.id}`).json(produto);
});

// PUT — atualizar produto inteiro
app.put('/produtos/:id', (req, res) => {
  const id = Number(req.params.id);
  const indice = produtos.findIndex(p => p.id === id);
  if (indice === -1) {
    return res.status(404).json({ erro: 'Produto não encontrado' });
  }
  if (!validarProduto(req.body)) {
    return res.status(400).json({ erro: 'Dados inválidos' });
  }
  const { nome, preco, estoque } = req.body;
  produtos[indice] = { id, nome: nome.trim(), preco, estoque };
  res.json(produtos[indice]);
});

// DELETE — excluir produto
app.delete('/produtos/:id', (req, res) => {
  const id = Number(req.params.id);
  const indice = produtos.findIndex(p => p.id === id);
  if (indice === -1) {
    return res.status(404).json({ erro: 'Produto não encontrado' });
  }
  produtos.splice(indice, 1);
  res.status(204).send();
});

// Rota desconhecida
app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

// Middleware centralizado de erros
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    erro: err.status === 400 ? 'JSON inválido' : 'Erro interno do servidor'
  });
});

app.listen(PORT, () => {
  console.log(`API em http://localhost:${PORT}`);
});