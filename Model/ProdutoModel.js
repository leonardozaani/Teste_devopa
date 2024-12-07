import mongoose from "mongoose";

const produtoSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: [true, "O campo 'nome' é obrigatório."],
            trim: true,
            minlength: [3, "O 'nome' deve ter pelo menos 3 caracteres."],
        },
        descricao: {
            type: String,
            required: [true, "O campo 'descricao' é obrigatório."],
            trim: true,
        },
        preco: {
            type: Number,
            required: [true, "O campo 'preco' é obrigatório."],
            min: [0, "O preço não pode ser negativo."],
        },
        categoriaId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Categoria", 
            required: [true, "O campo 'categoriaId' é obrigatório."],
        },
        estoque: {
            type: Number,
            default: 0,
            min: [0, "O estoque não pode ser negativo."],
        },
    },
    {
        timestamps: true, 
    }
);


const Produto = mongoose.model("Produto", produtoSchema);

export default Produto;
