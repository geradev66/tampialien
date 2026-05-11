import { useProducts } from "../hooks/useProducts";
import { useCategories } from '../hooks/useCategory';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';

const Detail = () => {
    const { id } = useParams();
    const { products, getProducts } = useProducts();
    const {categories, getCategories } = useCategories();
    const { addToCart } = useCartStore();
    const [listproducts, setListProducts] = useState<any[]>([]);

    useEffect(() =>{
        getProducts();
    }, [])

    useEffect(() => {
        getCategories()
    }, [])


    //slice para mostrar solo 4 productos relacionados
    useEffect(() => {
        if (products.length > 0) {
            setListProducts(products.slice(0, 3));
        }
    }, [products]);

    const handleAddToCart = () => {
        addToCart({ id: product._id, name: product.nombre, price: Number(product.precio), image: product.imagen });
    }
    //busqueda de producto
    const product = products.find(p => String(p._id) === id || String(p.id) === id);
    const catName = categories.find(c => String(c._id) === product?.categoria)?.nombre ?? '';

    if (!product) {
        return <p className='text-white text-center text-2xl mt-20'>Cargando...</p>;
    }

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 '>
        <img src={product.imagen} alt={product.nombre} className='w-full rounded p-3'  />
        <div className='flex flex-col p-15 gap-4'>
            <p className='text-[#39ff14] font-bold text-2xl'>{catName}</p>
            <h2 className='text-4xl text-white font-bold '>{product.nombre}</h2>
            <h2 className='text-white font-bold text-4xl'>${Number(product.precio).toFixed(2)} <span className='line-through text-2xl text-gray-700'>$39.99</span> <span className=' text-[#39ff14] text-2xl'>-25%</span> </h2>
            <p className='text-zinc-300'>{product.descripcion}</p>
            {/* selector de colores */}
            {/* <div className='flex items-center mt-4 ml-8'>
                <span className='text-white font-bold mr-4'>Color:</span>
                <button className='w-6 h-6 rounded-full bg-gray-800 border-2 border-gray-600 mr-2 cursor-pointer'></button>
                <button className='w-6 h-6 rounded-full bg-red-500 border-2 border-gray-600 mr-2 cursor-pointer'></button>
                <button className='w-6 h-6 rounded-full bg-blue-500 border-2 border-gray-600 mr-2 cursor-pointer'></button>
            </div> */}

            {/* selector de tallas */}
            <div className='flex items-center mt-4 ml-8'>
                <span className='text-white font-bold mr-4'>Talla:</span>
                <button className='bg-gray-800 text-white font-bold py-2 px-4 rounded-l hover:bg-gray-700'>S</button>
                <button className='bg-gray-800 text-white font-bold py-2 px-4 hover:bg-gray-700'>M</button>
                <button className='bg-gray-800 text-white font-bold py-2 px-4 rounded-r hover:bg-gray-700'>L</button>
            </div>


            <div className='flex items-center sm:flex-row flex-col gap-4 mt-4'>
                <button className='w-full bg-[#39ff14] text-black font-bold py-2 px-4  hover:bg-emerald-800 hover:text-white mt-4 rounded-3xl cursor-pointer' onClick={handleAddToCart}> <i className="fa-solid fa-cart-arrow-down"></i> Agregar al carrito</button>
                <button className='w-full bg-purple-600 text-white font-bold py-2 px-4  hover:bg-purple-700 mt-4 rounded-3xl ml-4 cursor-pointer'> <i className="fa-solid fa-bolt"></i> Comprar ahora </button>
            </div>
            <div className='bg-[#14252e] rounded-lg mt-10 mx-auto p-5 w-full'>
                <p className='text-white'><i className="fa-solid fa-truck text-[#39ff14]"></i> <span className='font-bold text-white'>Envío plano $5.99</span> — entrega en 5-7 días hábiles</p>
                <p className='text-white'><i className="fa-solid fa-shield text-[#39ff14]"></i> Compra 100% segura y protegida</p>
                <p className='text-white'><i className="fa-solid fa-rotate-left text-[#39ff14]"></i> Devoluciones en 30 días</p>
            </div>
            
        </div>
        {/*Categorias relacionadas*/}

        <div>
            
            <h2 className='text-2xl text-white font-bold mb-4 mt-5 p-3 text-center'>Categorías relacionadas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3">
            {listproducts.map((product) => (
                 <div className='bg-gray-800 rounded-lg text-left  mx-auto '>
                    <img src={product.imagen} alt={product.nombre} className='w-full  rounded-t-lg '/>
                    <div className='p-4'>
                        <h3 className=' text-[#39ff14] font-bold mb-4 mt-5'>{product.nombre}</h3>
                        <h2 className='text-1xl text-white font-bold mb-4 mt-5'>${product.precio.toFixed(2)}</h2>
                    </div>
                </div>  
            ))}
        </div>
      </div>
    </div>
    </>
  )
}

export default Detail
