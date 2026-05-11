import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    descripcion: { type: String, default: '' },
    imagen: { type: String, required: true },
    // relacion con categoria
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categorias',
        required: true
    }
}, {versionKey: false});

const Producto = mongoose.model("productos", productoSchema);

export default Producto;
