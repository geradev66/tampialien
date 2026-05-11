import express from "express";
import CheckoutController from "../controllers/checkoutController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/create-order", auth, CheckoutController.createOrder);
router.post("/capture-order/:orderID", auth, CheckoutController.captureOrder);

export default router;