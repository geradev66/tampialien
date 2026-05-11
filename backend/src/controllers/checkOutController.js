import axios from "axios";
import Cart from "../models/cart.js";
import Order from "../models/orders.js";

const getAccessToken = async () => {
  const response = await axios({
    url: `${process.env.PAYPAL_BASE}/v1/oauth2/token`,
    method: "post",
    data: "grant_type=client_credentials",
    auth: {
      username: process.env.PAYPAL_CLIENT_ID,
      password: process.env.PAYPAL_SECRET
    }
  });

  return response.data.access_token;
};

class CheckoutController {

  // 💳 Crear orden PayPal
  async createOrder(req, res) {
    try {
      const userId = req.user.id;

      const cart = await Cart.findOne({ user: userId })
        .populate("items.product");

      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ error: "Carrito vacío" });
      }

      // 🔥 calcular total REAL
      const total = cart.items.reduce((acc, item) => {
        return acc + item.product.precio * item.quantity;
      }, 0);

      const accessToken = await getAccessToken();

      const response = await axios.post(
        `${process.env.PAYPAL_BASE}/v2/checkout/orders`,
        {
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "MXN",
                value: total.toFixed(2)
              }
            }
          ]
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      res.json({
        id: response.data.id
      });

    } catch (error) {
      console.error(error.response?.data || error.message);
      res.status(500).json({ error: "Error creando orden" });
    }
  }

  // ✅ Capturar pago
async captureOrder(req, res) {
  try {
    const { orderID } = req.params;
    const userId = req.user.id;

    const accessToken = await getAccessToken();

    const response = await axios.post(
      `${process.env.PAYPAL_BASE}/v2/checkout/orders/${orderID}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    // 🔍 obtener carrito
    const cart = await Cart.findOne({ user: userId })
      .populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Carrito vacío" });
    }

    // 💰 calcular total REAL
    const total = cart.items.reduce((acc, item) => {
      return acc + item.product.precio * item.quantity;
    }, 0);

    // 🧾 crear orden en Mongo
    const newOrder = await Order.create({
      user: userId,
      items: cart.items.map(item => ({
        product: item.product._id,
        nombre: item.product.nombre,
        precio: item.product.precio,
        quantity: item.quantity
      })),
      total,
      status: "paid",
      paypalOrderId: orderID
    });

    // 🧹 limpiar carrito
    cart.items = [];
    await cart.save();

    res.json({
      msg: "Pago exitoso",
      order: newOrder
    });

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Error capturando pago" });
  }
}
}

export default new CheckoutController();