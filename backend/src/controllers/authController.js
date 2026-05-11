import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthController {

  // 📝 Registro
  async register(req, res) {
    try {
      console.log('register body:', req.body);
      const { nombre, email, password } = req.body;

      if (!nombre || !email || !password) {
        return res.status(400).json({ success: false, message: 'Faltan campos: nombre, email o password' });
      }

      // verificar si ya existe
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ success: false, message: "El usuario ya existe" });
      }

      // encriptar password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        nombre,
        email,
        password: hashedPassword
      });

      res.status(201).json({ success: true, message: "Usuario creado", user: { id: user._id, nombre: user.nombre, email: user.email } });

    } catch (error) {
      console.error('Error en register:', error);
      res.status(500).json({ success: false, message: "Error en registro" });
    }
  }

  // 🔐 Login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success: false, message: "Credenciales inválidas" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: "Credenciales inválidas" });
      }

      // generar token
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({
        success: true,
        token,
        user: {
          id: user._id,
          nombre: user.nombre,
          email: user.email,
          role: user.role
        }
      });

    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ success: false, message: "Error en login" });
    }
  }
}

export default new AuthController();