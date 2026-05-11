import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto"
      },
      nombre: String,
      precio: Number,
      quantity: Number
    }
  ],
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: "pending" // pending | paid
  },
  paypalOrderId: String
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);