import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-6 py-20">
      <span className="text-8xl">👽</span>
      <h1 className="text-4xl text-white font-bold">Felicidades, tu pago fue abducido</h1>
      <p className="text-gray-400 text-xl">Tu orden ha sido recibida exitosamente.</p>
      <Link
        to="/"
        className="bg-[#39ff14] text-black font-bold py-3 px-8 rounded-3xl hover:bg-emerald-800 hover:text-white transition"
      >
        Regresar a la página principal
      </Link>
    </div>
  );
};

export default OrderSuccess;
