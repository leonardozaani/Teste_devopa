import Usuario from "../Model/UsuariosModel.js";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = "Senha"; 


router.post("/cadastro", async (req, res) => {
    const { usuario, senha } = req.body;

    if (!usuario || !senha) {
        return res.status(400).json({ message: "Usuário e senha são obrigatórios." });
    }

    try {
        
        const usuarioExistente = await Usuario.findOne({ usuario });
        if (usuarioExistente) {
            return res.status(400).json({ message: "Usuário já cadastrado." });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const novoUsuario = new Usuario({ usuario, senha: hashedPassword });
        await novoUsuario.save();

        res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (err) {
        res.status(500).json({ message: "Erro ao cadastrar usuário.", error: err.message });
    }
});


router.post("/login", async (req, res) => {
    const { usuario, senha } = req.body;

    if (!usuario || !senha) {
        return res.status(400).json({ message: "Usuário e senha são obrigatórios." });
    }

    try {
        
        const usuario = await Usuario.findOne({ usuario });
        if (!usuario) {
            return res.status(401).json({ message: "Credenciais inválidas." });
        }

        
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(401).json({ message: "Credenciais inválidas." });
        }

        
        const token = jwt.sign({ id: usuario._id, usuario: usuario.usuario }, JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ message: "Login bem-sucedido.", token });
    } catch (err) {
        res.status(500).json({ message: "Erro ao realizar login.", error: err.message });
    }
});

export default router;
