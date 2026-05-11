import { Link } from "react-router-dom";
import { useCartStore } from '../store/useCartStore';
import PayPalButton from '../components/PayPalButton';

const Checkout = () => {
    const { cart, total } = useCartStore();
    const emptyCart = cart.length === 0;

    // si no esta logueado y dar click en el boton de paypal que salga un sweetalert2 con el mensaje de que debe estar logueado para poder comprar


  return (
    <>
    <div className='grid grid-cols-1 md:grid-cols-2 p-4'>
        <div>
        <h2 className='text-white text-2xl'><i className="fa-solid fa-truck text-[#39ff14]"></i> Información de envio</h2>
        <p className='text-white'>La compra se realizará con PayPal y debe estar registrado en la plataforma.</p>
        {!emptyCart && (
        <div className="mt-7">
            <PayPalButton />
        </div>
    )}
        </div>
        <div className="p-10">
            <h2 className='text-white text-2xl'><i className="fa-solid fa-receipt text-[#39ff14]"></i> Resumen de compra</h2>
            {emptyCart ? (
                <div className="bg-gray-800 rounded-lg p-6 text-center flex flex-col items-center">
                    <h2 className="text-white text-2xl mb-4">Tu carrito está vacío</h2>
                    <span className="text-5xl">👽</span>
                    <Link to="/" className="mt-4 inline-block text-black px-4 py-2 rounded hover:bg-emerald-700 transition hover:text-white bg-[#39ff14] rounded-4xl">Explorar productos</Link>
                </div>
            ) : (
                <div className="bg-gray-800 rounded-lg p-6">
                    {cart.map((item) => (
                        <div key={item.id} className="flex items-center mb-4">
                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded mr-4" />
                            <div>
                                <h3 className="text-white text-lg">{item.name}</h3>
                                <p className="text-gray-400">Cantidad: {item.quantity}</p>
                                <p className="text-gray-400">Precio: ${item.price}</p>
                            </div>
                        </div>
                    ))}
                    <div className="border-t border-gray-700 pt-4 mt-4">
                        <p className="text-white text-xl font-bold">Total: ${total()}</p>
                    </div>
                </div>
            )}
        </div>
    </div>
  
    </>
  )
}
export default Checkout
