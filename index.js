import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import usuarios from "./Controller/Usuarios.js";
import produtos from "./Controller/Produto.js";
import categorias from "./Controller/Categoria.js";

dotenv.config();

const app = express(); 
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;

app.use(bodyParser.json());

// Rotas para usuários
app.post("/usuarios", usuarios.criarUsuario);
app.get("/usuarios", usuarios.buscarUsuarios);
app.get("/usuarios/:id", usuarios.buscarUsuario);
app.put("/usuarios/:id", usuarios.editarUsuario);
app.delete("/usuarios/:id", usuarios.deletarUsuario);

// Rotas para produtos
app.post("/produtos", produtos.criarProduto);
app.get("/produtos", produtos.buscarProdutos);
app.get("/produtos/:id", produtos.buscarProduto);
app.put("/produtos/:id", produtos.editarProduto);
app.delete("/produtos/:id", produtos.deletarProduto);

// Rotas para categorias
app.post("/categorias", categorias.criarCategoria);
app.get("/categorias", categorias.buscarCategorias);
app.get("/categorias/:id", categorias.buscarCategoria);
app.put("/categorias/:id", categorias.editarCategoria);
app.delete("/categorias/:id", categorias.deletarCategoria);

mongoose
  .connect(mongoURI)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
