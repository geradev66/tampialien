import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useProducts } from "../hooks/useProducts";
import { useCartStore } from '../store/useCartStore';

const Catalogo = () => {
  const { products, getProducts } = useProducts();
  const { addToCart } = useCartStore();

  const handleAddToCart = (product: any) => {
    addToCart({ id: product._id, name: product.nombre, price: Number(product.precio), image: product.imagen });
  }

  useEffect(() =>{
    getProducts();
  }, [])

  return (
    <>
      <div className='mt-32'>
        <h2 className='text-4xl text-white font-bold text-center py-10'>Catálogo de productos</h2>
        <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-8 '>
          {products.map((product) => (
          <div className='bg-gray-800 rounded-lg text-center   mx-auto' key={product._id}>
            <img src={product.imagen} alt={product.nombre} className='w-full  rounded-t-lg h-90'  />
            <h3 className='text-2xl text-white font-bold mb-4 mt-5'>{product.nombre}</h3>
            <h2 className='text-white mb-4'>Precio: <span className='text-2xl text-[#39ff14]'>${product.precio.toFixed(2)}</span></h2>
            <div className='flex justify-center gap-4'>
              <button className='bg-[#39ff14] text-black font-bold py-2 px-4  hover:bg-emerald-800 hover:text-white mb-4 rounded-3xl cursor-pointer' onClick={() => handleAddToCart(product)}> <i className="fa-solid fa-cart-arrow-down"></i> Comprar</button>
            <Link to={`/detail/${product._id}`} className='bg-purple-600 text-white font-bold py-2 px-4  hover:bg-purple-700 mb-4 rounded-3xl cursor-pointer'> <i className="fa-solid fa-info-circle"></i> Detalles</Link>
            </div>
            
          </div>
          ))}


        </div>

      </div>
    </>
  )
}

export default Catalogo
