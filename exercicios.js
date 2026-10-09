const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

///////////////////////////////////////////////////////////////////////////////////////////////

app.get("/", (req, res) => {
  res.json({ mensagem: "sem caminho" });
});

app.get("/ola", (req, res) => {
  res.json({ mensagem: "olá turma!" });
});

app.get("/sobre", (req, res) => {
  res.json({ mensagem: "cibersistemas pra automação" });
});

app.get("/contato", (req, res) => {
  res.json({ mensagem: "thiago@flexa.com" });
});

app.get("/aluno", (req, res) => {
  res.json({ nome: "vinicius", idade: "dinhero", oi: "paçoca" });
});

app.get("/fruta", (req, res) => {
  res.json({ nome: "pera", cidade: "maçã", oi: "banana" });
});

app.post("/fruta", (req, res) => {
  console.log(req.body);
  res.json({ recebido: req.body });
});

app.get("/soma", (req, res) => {
  const soma = 5 + 3;
  res.json({ soma: `${soma}` });
});

app.get("/saudacao/:nome", (req, res) => {
  res.json({ mensagem: `Olá ${req.params.nome}` });
});

app.get("/boasvinda s", (req, res) => {
  res.send(`Bem-vindo, ${req.query.nome || "visitante"}.`);
});

///////////////////////////////////////////////////////////////////////////////////////////////

app.listen(PORT, () => {
  console.log(`Servidor em http://localhost:${PORT}`);
});