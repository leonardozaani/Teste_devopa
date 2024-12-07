import Categoria from "../Model/Categoria.js";

// Criar Categoria
export const criarCategoria = async (req, res) => {
    const { nome, descricao } = req.body;

    if (!nome || !descricao) {
        return res.status(400).json({ message: "Os campos 'nome' e 'descricao' são obrigatórios." });
    }

    try {
        const novaCategoria = new Categoria({ nome, descricao });
        await novaCategoria.save();
        res.status(201).json({ message: "Categoria criada com sucesso!", categoria: novaCategoria });
    } catch (err) {
        res.status(500).json({ message: "Erro ao criar a categoria.", error: err.message });
    }
};

// Buscar todas as Categorias
export const buscarCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find();
        res.status(200).json(categorias);
    } catch (err) {
        res.status(500).json({ message: "Erro ao buscar as categorias.", error: err.message });
    }
};

// Buscar Categoria por ID
export const buscarCategoria = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "O parâmetro 'id' é obrigatório." });
    }

    try {
        const categoria = await Categoria.findById(id);

        if (!categoria) {
            return res.status(404).json({ message: "Categoria não encontrada." });
        }

        res.status(200).json(categoria);
    } catch (err) {
        res.status(500).json({ message: "Erro ao buscar a categoria.", error: err.message });
    }
};

// Editar Categoria
export const editarCategoria = async (req, res) => {
    const { id } = req.params;
    const { nome, descricao } = req.body;

    if (!id) {
        return res.status(400).json({ message: "O parâmetro 'id' é obrigatório." });
    }

    try {
        const categoria = await Categoria.findById(id);

        if (!categoria) {
            return res.status(404).json({ message: "Categoria não encontrada." });
        }

        categoria.nome = nome;
        categoria.descricao = descricao;
        await categoria.save();

        res.status(200).json({ message: "Categoria editada com sucesso!", categoria });
    } catch (err) {
        res.status(500).json({ message: "Erro ao editar a categoria.", error: err.message });
    }
};

// Deletar Categoria
export const deletarCategoria = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "O parâmetro 'id' é obrigatório." });
    }

    try {
        const categoria = await Categoria.findById(id);

        if (!categoria) {
            return res.status(404).json({ message: "Categoria não encontrada." });
        }

        await categoria.remove();
        res.status(200).json({ message: "Categoria deletada com sucesso!" });
    } catch (err) {
        res.status(500).json({ message: "Erro ao deletar a categoria.", error: err.message });
    }
};
