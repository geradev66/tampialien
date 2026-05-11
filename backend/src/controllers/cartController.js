import Cart from "../models/Cart.js";

class CartController {

  // 🛒 Obtener carrito del usuario
  async getCart(req, res) {
    try {
      const userId = req.user.id;

      let cart = await Cart.findOne({ user: userId })
        .populate("items.product");

      if (!cart) {
        cart = await Cart.create({ user: userId, items: [] });
      }

      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener carrito" });
    }
  }

  // ➕ Agregar producto al carrito
  async addToCart(req, res) {
    try {
      const userId = req.user.id;
      const { productId, quantity } = req.body;

      let cart = await Cart.findOne({ user: userId });

      if (!cart) {
        cart = await Cart.create({ user: userId, items: [] });
      }

      const existingItem = cart.items.find(
        item => item.product.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += quantity || 1;
      } else {
        cart.items.push({
          product: productId,
          quantity: quantity || 1
        });
      }

      await cart.save();

      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: "Error al agregar producto" });
    }
  }

  // 🔄 Actualizar cantidad
  async updateItem(req, res) {
    try {
      const userId = req.user.id;
      const { productId, quantity } = req.body;

      const cart = await Cart.findOne({ user: userId });

      if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

      const item = cart.items.find(
        item => item.product.toString() === productId
      );

      if (!item) return res.status(404).json({ error: "Producto no encontrado" });

      item.quantity = quantity;

      await cart.save();

      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar carrito" });
    }
  }

  // 🗑️ Eliminar producto del carrito
  async removeItem(req, res) {
    try {
      const userId = req.user.id;
      const { productId } = req.params;

      const cart = await Cart.findOne({ user: userId });

      if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

      cart.items = cart.items.filter(
        item => item.product.toString() !== productId
      );

      await cart.save();

      res.json(cart);
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar producto" });
    }
  }

  // 🧮 Calcular total (para checkout)
  async getTotal(req, res) {
    try {
      const userId = req.user.id;

      const cart = await Cart.findOne({ user: userId })
        .populate("items.product");

      if (!cart) return res.json({ total: 0 });

      const total = cart.items.reduce((acc, item) => {
        return acc + item.product.precio * item.quantity;
      }, 0);

      res.json({ total });
    } catch (error) {
      res.status(500).json({ error: "Error al calcular total" });
    }
  }
}

export default new CartController();