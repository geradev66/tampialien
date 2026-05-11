import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const ADMIN_EMAIL    = "admin@tampialien.com";
const ADMIN_PASSWORD = "Admin1234!";
const ADMIN_NOMBRE   = "Administrador";

async function seed() {
  await mongoose.connect(process.env.DB_CONECTION_STRING);
  console.log("Conectado a la base de datos ✅");

  const exists = await User.findOne({ email: ADMIN_EMAIL });
  if (exists) {
    console.log(`El usuario admin ya existe: ${ADMIN_EMAIL}`);
    await mongoose.disconnect();
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);

  await User.create({
    nombre: ADMIN_NOMBRE,
    email: ADMIN_EMAIL,
    password: hashedPassword,
    role: "admin",
  });

  console.log("✅ Admin creado:");
  console.log(`   Email:    ${ADMIN_EMAIL}`);
  console.log(`   Password: ${ADMIN_PASSWORD}`);

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Error en seed:", err);
  process.exit(1);
});
