import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Layout from './pages/Layout'
import Index from './pages/Index'
import Detail from './pages/Detail'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import Login from './pages/Login'
import Register from './pages/Register'
import Admin from './pages/Admin'
import Category from './pages/Category'
import NotFound from './pages/NotFound'
import Footer from './components/Footer'
import AdminRoute from "./components/AdminRoute";


function App() {

  return (
   <>
      <Navbar />
      <Routes>
         {/* Aquí irán tus rutas */}
         <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route path='detail/:id' element={<Detail />} />
          <Route path='checkout' element={<Checkout />} />
          <Route path='order-success' element={<OrderSuccess />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
             {/* Rutas protegidas para admin */}
               
                  <Route path='admin' element={<AdminRoute> <Admin /> </AdminRoute>} />
                  <Route path='category' element={<AdminRoute> <Category /> </AdminRoute>} /> 

          {/* pagina 404 */}
          <Route path='*' element={<NotFound />} />
         </Route>
      </Routes>
       <Footer />
    </>
  )
}

export default App
