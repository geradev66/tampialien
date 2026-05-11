import mongoose from "mongoose";

const categoriaSchema = new mongoose.Schema({
    nombre: { type: String, required: true }
}, {versionKey: false});

const Categoria = mongoose.model("categorias", categoriaSchema);

export default Categoria;
