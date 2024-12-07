import mongoose from "mongoose";
const bcrypt = import("bcrypt");


const usuario = []

const usuarioSchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

usuarioSchema.pre("save", async function (next) {
    if (!this.isModified("Password")) return next();
    this.Password = await bcrypt.hash(this.Password, 10);
    next();
});

export default mongoose.model("Usuario", usuarioSchema);
