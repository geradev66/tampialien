import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import mongoose from "mongoose";
import Categoria from "../models/categoria.js";
import Producto from "../models/productos.js";

const categorias = [
  { nombre: "Playeras", descripcion: "Playeras alienígenas" },
  { nombre: "Tenis", descripcion: "Tenis espaciales" },
  { nombre: "Sudaderas", descripcion: "Sudaderas galácticas" },
  { nombre: "Gorras", descripcion: "Gorras extraterrestres" },
  { nombre: "Accesorios", descripcion: "Accesorios alien" },
];

const productos = [
  { nombre: "Playera Alien Clásica", precio: 299, descripcion: "Playera 100% algodón con diseño alienígena clásico", imagen: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500", categoria: null },
  { nombre: "Tenis Nebulosa", precio: 899, descripcion: "Tenis ligeros con diseño de nebulosa", imagen: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500", categoria: null },
  { nombre: "Sudadera Galaxy", precio: 649, descripcion: "Sudadera con capucha y estampado galáctico", imagen: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500", categoria: null },
  { nombre: "Gorra Alien", precio: 199, descripcion: "Gorra ajustable con bordado alien", imagen: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500", categoria: null },
  { nombre: "Tenis Estelar", precio: 999, descripcion: "Tenis con luces LED estilo espacio", imagen: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500", categoria: null },
  { nombre: "Playera UFO", precio: 349, descripcion: "Playera con diseño de ovni", imagen: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500", categoria: null },
  { nombre: "Sudadera Cometa", precio: 749, descripcion: "Sudadera con estampado de cometa", imagen: "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=500", categoria: null },
  { nombre: "Gorra Espacial", precio: 229, descripcion: "Gorra con parche bordado del espacio", imagen: "https://images.unsplash.com/photo-1620325867502-221eb13169be?w=500", categoria: null },
];

async function seed() {
  await mongoose.connect(process.env.DB_CONECTION_STRING);
  console.log("Conectado a la base de datos ✅");

  await Categoria.deleteMany({});
  await Producto.deleteMany({});

  const cats = await Categoria.insertMany(categorias);
  console.log(`${cats.length} categorías creadas ✅`);

  const productosConCategoria = productos.map((p, i) => ({
    ...p,
    categoria: cats[i % cats.length]._id,
  }));

  await Producto.insertMany(productosConCategoria);
  console.log(`${productosConCategoria.length} productos creados ✅`);

  await mongoose.disconnect();
  console.log("Seed completado 👽");
}

seed().catch((err) => {
  console.error("Error en seed:", err);
  process.exit(1);
});
