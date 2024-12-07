import Produto from "../Model/Produto.js";

// Criar Produto
export const criarProduto = async (req, res) => {
    const { nome, descricao, preco } = req.body;

    if (!nome || !descricao || !preco) {
        return res.status(400).json({ message: "Os campos 'nome', 'descricao' e 'preco' são obrigatórios." });
    }

    try {
        const novoProduto = new Produto({ nome, descricao, preco });
        await novoProduto.save();
        res.status(201).json({ message: "Produto criado com sucesso!", produto: novoProduto });
    } catch (err) {
        res.status(500).json({ message: "Erro ao criar o produto.", error: err.message });
    }
};

// Buscar todos os Produtos
export const buscarProdutos = async (req, res) => {
    try {
        const produtos = await Produto.find();
        res.status(200).json(produtos);
    } catch (err) {
        res.status(500).json({ message: "Erro ao buscar os produtos.", error: err.message });
    }
};

export const buscarProduto = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "O parâmetro 'id' é obrigatório." });
    }

    try {
        const produto = await Produto.findById(id);

        if (!produto) {
            return res.status(404).json({ message: "Produto não encontrado." });
        }

        res.status(200).json(produto);
    } catch (err) {
        res.status(500).json({ message: "Erro ao buscar o produto.", error: err.message });
    }
};

// Editar Produto
export const editarProduto = async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, preco } = req.body;

    if (!id) {
        return res.status(400).json({ message: "O parâmetro 'id' é obrigatório." });
    }

    try {
        const produto = await Produto.findById(id);

        if (!produto) {
            return res.status(404).json({ message: "Produto não encontrado." });
        }

        produto.nome = nome;
        produto.descricao = descricao;
        produto.preco = preco;
        await produto.save();

        res.status(200).json({ message: "Produto editado com sucesso!", produto });
    } catch (err) {
        res.status(500).json({ message: "Erro ao editar o produto.", error: err.message });
    }
};

// Deletar Produto
export const deletarProduto = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "O parâmetro 'id' é obrigatório." });
    }

    try {
        const produto = await Produto.findById(id);

        if (!produto) {
            return res.status(404).json({ message: "Produto não encontrado." });
        }

        await produto.remove();
        res.status(200).json({ message: "Produto deletado com sucesso!" });
    } catch (err) {
        res.status(500).json({ message: "Erro ao deletar o produto.", error: err.message });
    }
};
