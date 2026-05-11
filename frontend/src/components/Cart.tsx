import { Button, Drawer } from "@heroui/react";
import { useCartStore } from '../store/useCartStore';
import { Card } from "@heroui/react";
import { Link } from "react-router-dom";

const Cart = () => {

    const { cart, clearCart, removeFromCart, decreaseQuantity, total, increaseQuantity } = useCartStore();
    const empty = cart.length === 0;

    const handleRemoveFromCart = (id: any) => {
        removeFromCart(id);
    }
    const handleDecreaseQuantity = (id: any) => {
        decreaseQuantity(id);
    }
    const handleClearCart = () => {
        clearCart();
    }

    const handleIncreaseQuantity = (id: any) => {
        increaseQuantity(id);
    }
  return (
    <>

        <Drawer >
            <Button variant="secondary" className="bg-[#39ff14] text-black font-bold"><i className="fa-solid fa-cart-arrow-down"></i> Carrito ({cart.length})</Button>
            <Drawer.Backdrop >
              <Drawer.Content placement="right">
                <Drawer.Dialog>
                  <Drawer.Header>
                    <Drawer.Heading>Carrito intergaláctico <span className="text-2xl">🛸</span></Drawer.Heading>
                  </Drawer.Header>
                  <Drawer.Body>
                    {empty ? (
                        <div className="flex flex-col justify-center items-center h-100 mt-40">
                            <p className="text-[5rem]">👽</p>
                            <p className="text-gray-400 text-xl mt-4">Tu carrito está vacío</p>
                        </div>
                      
                    ) : (
                      <>
                        {cart.map((item: any) => (
                          <Card key={item.id} className= "mt-2" >
                            <Card.Content>
                              <div className="flex items-center ">
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded mr-4" />
                                <p>{item.name}</p>
  
                              </div>
                              <div className="flex items-center gap-4 justify-center mt-5" >
                                <button onClick={() => handleIncreaseQuantity(item.id)} className="bg-[#39ff14] text-black font-bold hover:bg-emerald-800 hover:text-white p-2 rounded-3xl w-10 h-10 cursor-pointer">+</button>
                                <p className="text-1xl font-bold">{item.quantity}</p>
                                <button onClick={() => handleDecreaseQuantity(item.id)} className="bg-purple-700 text-black font-bold text-white hover:bg-purple-800 hover:text-white p-2 rounded-3xl w-10 h-10 cursor-pointer">-</button>
                              </div>
                              <div className= "flex justify-between">
                                 <p className="text-2xl font-bold">${item.price} MXN</p>
                                <button onClick={() => handleRemoveFromCart(item.id)} className="bg-red-500 text-white hover:bg-red-600 hover:white cursor-pointer p-2 rounded-3xl">Eliminar</button>
                              </div>

                             </Card.Content>
                          </Card>
                        ))}
                        
                      </>
                    )}
                         
                  </Drawer.Body>
                  <Drawer.Footer>
                  <div className="flex flex-col gap-2">
                  <p className="text-2xl font-bold text-center">Total: ${total()}</p>
                      <div className="flex justify-between gap-2">
                        <Button onClick={handleClearCart}>Limpiar carrito</Button>
                        <Button slot="close" variant="secondary" className="bg-gray-500 text-white font-bold">
                          Cancelar
                        </Button>
                        <Link to="/checkout" slot="close" className="bg-[#39ff14] text-black font-bold hover:bg-emerald-800 hover:text-white rounded-3xl p-2">
                          Confirmar
                        </Link>
                      </div>
                    </div>
     
                  </Drawer.Footer>
                </Drawer.Dialog>
              </Drawer.Content>
            </Drawer.Backdrop>
        </Drawer>
    </>
  )
}

export default Cart
