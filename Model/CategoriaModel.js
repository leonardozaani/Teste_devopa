import mongoose from "mongoose";

const CategoriaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
}, { timestamps: true });

const Categoria = mongoose.model("Categoria", CategoriaSchema);

export default Categoria;