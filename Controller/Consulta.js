import Categoria from "../Model/Categoria.js";
import Produto from "../Model/Produto.js";
import Consulta from "../Model/Consulta.js";

export const consultarCategoriasComProdutos = async (req, res) => {
    try {
        const categorias = await Categoria.find().populate("produtos");
        res.status(200).json(categorias);
    } catch (err) {
        res.status(500).json({ message: "Erro ao consultar dados.", error: err.message });
    }
};

export const consultarProdutosPorCategoria = async (req, res) => {
    const { id } = req.params;
    try {
        const produtos = await Produto.find({ categorias: id });
        res.status(200).json(produtos);
    } catch (err) {
        res.status(500).json({ message: "Erro ao consultar produtos.", error: err.message });
    }
};

// Criar Consulta
export const criarConsulta = async (req, res) => {
    const { paciente, medico, data, descricao } = req.body;

    if (!paciente || !medico || !data || !descricao) {
        return res.status(400).json({ message: "Os campos 'paciente', 'medico', 'data' e 'descricao' são obrigatórios." });
    }

    try {
        const novaConsulta = new Consulta({ paciente, medico, data, descricao });
        await novaConsulta.save();
        res.status(201).json({ message: "Consulta criada com sucesso!", consulta: novaConsulta });
    } catch (err) {
        res.status(500).json({ message: "Erro ao criar a consulta.", error: err.message });
    }
};

// Buscar todas as Consultas
export const buscarConsultas = async (req, res) => {
    try {
        const consultas = await Consulta.find();
        res.status(200).json(consultas);
    } catch (err) {
        res.status(500).json({ message: "Erro ao buscar as consultas.", error: err.message });
    }
};

// Buscar Consulta por ID
export const buscarConsulta = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "O parâmetro 'id' é obrigatório." });
    }

    try {
        const consulta = await Consulta.findById(id);

        if (!consulta) {
            return res.status(404).json({ message: "Consulta não encontrada." });
        }

        res.status(200).json(consulta);
    } catch (err) {
        res.status(500).json({ message: "Erro ao buscar a consulta.", error: err.message });
    }
};

// Editar Consulta
export const editarConsulta = async (req, res) => {
    const { id } = req.params;
    const { paciente, medico, data, descricao } = req.body;

    if (!id) {
        return res.status(400).json({ message: "O parâmetro 'id' é obrigatório." });
    }

    try {
        const consulta = await Consulta.findById(id);

        if (!consulta) {
            return res.status(404).json({ message: "Consulta não encontrada." });
        }

        consulta.paciente = paciente;
        consulta.medico = medico;
        consulta.data = data;
        consulta.descricao = descricao;
        await consulta.save();

        res.status(200).json({ message: "Consulta editada com sucesso!", consulta });
    } catch (err) {
        res.status(500).json({ message: "Erro ao editar a consulta.", error: err.message });
    }
};

// Deletar Consulta
export const deletarConsulta = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "O parâmetro 'id' é obrigatório." });
    }

    try {
        const consulta = await Consulta.findById(id);

        if (!consulta) {
            return res.status(404).json({ message: "Consulta não encontrada." });
        }

        await consulta.remove();
        res.status(200).json({ message: "Consulta deletada com sucesso!" });
    } catch (err) {
        res.status(500).json({ message: "Erro ao deletar a consulta.", error: err.message });
    }
};
