const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

///////////////////////////////////////////////////////////////////////////////////////////////

app.get("/", (req, res) => {
  res.json( "API online" );
});

app.get("/status", (req, res) => {
  res.json({ online: true, curso: "Node" });
});

app.get("/produtos", (req, res) => {
  let idCounter = 1;
  res.json({ id: idCounter++, nome: "Monitor", preco: 249.99}, { id: idCounter++, nome: "Mouse", preco: 59.99}, { id: idCounter++, nome: "Teclado", preco: 199.99});
});

///////////////////////////////////////////////////////////////////////////////////////////////

app.listen(PORT, () => {
  console.log(`Servidor em http://localhost:${PORT}`);
});
