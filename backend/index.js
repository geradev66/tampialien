import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
const appModule = await import("./src/app.js");
const app = appModule.default;

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`El puerto ${PORT} a sido abducido 👽`);
});
