import express from "express";
import CartController from "../controllers/cartController.js";
import auth from "../middlewares/auth.js";



const router = express.Router();

// 🛒 Obtener carrito del usuario
router.get("/", auth, CartController.getCart);

// ➕ Agregar producto al carrito
router.post("/add", auth, CartController.addToCart);

// 🔄 Actualizar cantidad
router.put("/update", auth, CartController.updateItem);

// 🗑️ Eliminar producto del carrito
router.delete("/:productId", auth,CartController.removeItem);

// 🧮 Obtener total
router.get("/total", auth, CartController.getTotal);

export default router;