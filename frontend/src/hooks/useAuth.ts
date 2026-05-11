import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { loginRequest, registerRequest } from '../service/authService';
import { useCartStore } from '../store/useCartStore';

type Credentials = { nombre?: string; email: string; password: string };

export const useAuth = () => {
  const { user, setUser, loading } = useContext(AuthContext) as { user: any; setUser: (u: any) => void; loading: boolean };
  const fetchCart = useCartStore((s) => s.fetchCart);

  const login = async (data: Credentials) => {
    const res = await loginRequest(data);

    if (res.token) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      setUser(res.user);
      fetchCart();
    }

    if (res.token) return { success: true, ...res };
    return { success: false, message: res.message || res.error || 'Credenciales inválidas' };
  };

  const register = async (data: Credentials) => {
    const res = await registerRequest(data);
    if (res.success) return { success: true, message: res.message };
    return { success: false, message: res.message || res.error || 'Error desconocido en el registro' };
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    useCartStore.setState({ cart: [] });
  };

  return { user, loading, login, register, logout };
};
