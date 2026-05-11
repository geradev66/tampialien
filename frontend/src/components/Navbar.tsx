import { useState } from "react";
import Logo from '../../public/app_logo.png';
import Cart from "./Cart";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const isAdmin = user?.email === "admin@tampialien.com";

  return (
    <>
      <nav className="container mx-auto flex flex-col md:flex-row items-center justify-between py-4 relative md:p-9">
        <div className="flex items-center gap-2">
             <Link to="/" className="cursor-pointer"><img src={Logo} alt="Logo" className="h-8 " /></Link>
             <Link to="/" className="cursor-pointer"><h2 className="text-white font-bold text-2xl">Tampi<span className="text-[#39ff14]">Alien</span></h2></Link>
        </div>
       

        <div className="flex items-center gap-4">
          <ul className="hidden md:flex gap-5">
            <li className="text-white">Home</li>
            <li className="text-white">About</li>
            <li className="text-white">Contact</li>
          </ul>

          <button
            className="md:hidden text-white p-2 rounded focus:outline-none"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {open && (
          <div className="absolute top-full right-4 mt-2  bg-gray-800 rounded-md py-3 px-4 shadow-lg md:hidden z-50 w-full text-center ">
            <ul className="flex flex-col gap-3">
              <li className="text-white hover:bg-[#39ff14] p-2 hover:text-black cursor-pointer">Home</li>
              <li className="text-white hover:bg-[#39ff14] p-2 hover:text-black cursor-pointer">About</li>
              <li className="text-white hover:bg-[#39ff14] p-2 hover:text-black cursor-pointer">Contact</li>
            </ul>
          </div>
        )}

        <div className="flex items-center gap-2">
        <Cart />
        {user ? (
          <>
            {isAdmin && (
              <>
                <Link to="/admin" className="bg-[#39ff14] text-black font-bold hover:bg-emerald-800 hover:text-white rounded-3xl p-2">Admin</Link>
                <Link to="/category" className="bg-purple-600 text-white font-bold hover:bg-purple-700 rounded-3xl p-2">Categorías</Link>
              </>
            )}
            <button onClick={logout} className="bg-red-600 text-white font-bold hover:bg-red-700 rounded-3xl p-2 cursor-pointer">Logout</button>
          </>
        ) : (
          <Link to="/login" className="bg-[#39ff14] text-black font-bold hover:bg-emerald-800 hover:text-white rounded-3xl p-2">Login</Link>
        )}
        </div>



      </nav>
    </>
  );
};

export default Navbar;
