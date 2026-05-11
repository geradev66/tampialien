import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getCartRequest, addToCartRequest, removeFromCartRequest, updateCartItemRequest } from '../service/cartService';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

type AddToCartInput = Omit<CartItem, 'quantity'>;

interface CartState {
  cart: CartItem[];
  loading: boolean;
  fetchCart: () => Promise<void>;
  addToCart: (product: AddToCartInput) => Promise<void>;
  decreaseQuantity: (productId: string) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  increaseQuantity: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  total: () => number;
}

// verificar si el usuario está logueado
const isLoggedIn = () => !!localStorage.getItem('token');

// convertir el item del backend a un item del frontend
const mapBackendItem = (item: any): CartItem => ({
  id: item.product._id ?? item.product.id,
  name: item.product.nombre ?? item.product.name,
  price: Number(item.product.precio ?? item.product.price),
  image: item.product.imagen ?? item.product.image,
  quantity: item.quantity,
});

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
    cart: [],
    loading: false,

    // obtener el carrito del backend
    fetchCart: async () => {
      if (!isLoggedIn()) return;
      set({ loading: true });
      try {
        const data = await getCartRequest();
        if (data?.items) {
          const mapped = data.items.map(mapBackendItem);
          set({ cart: mapped });
        }
      } catch {
        // fallback to local cart
      } finally {
        set({ loading: false });
      }
    },

      // agregar un producto al carrito
    addToCart: async (product) => {
      if (isLoggedIn()) {
        await addToCartRequest(product.id);
        const data = await getCartRequest();
        if (data?.items) {
          set({ cart: data.items.map(mapBackendItem) });
        }
        return;
      }
      const { cart } = get();
      const existingProduct = cart.find((item) => item.id === product.id);
      if (existingProduct) {
        set({ cart: cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )});
      } else {
        set({ cart: [...cart, { ...product, quantity: 1 }] });
      }
    },

    // disminuir la cantidad de un producto

    decreaseQuantity: async (productId) => {
      if (isLoggedIn()) {
        const { cart } = get();
        const item = cart.find((i) => i.id === productId);
        if (!item) return;
        const newQty = item.quantity - 1;
        if (newQty <= 0) {
          await removeFromCartRequest(productId);
        } else {
          await updateCartItemRequest(productId, newQty);
        }
        const data = await getCartRequest();
        if (data?.items) {
          set({ cart: data.items.map(mapBackendItem) });
        }
        return;
      }
      const { cart } = get();
      const updatedCart = cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      ).filter((item) => item.quantity > 0);
      set({ cart: updatedCart });
    },

    // eliminar un producto del carrito

    removeFromCart: async (productId) => {
      if (isLoggedIn()) {
        await removeFromCartRequest(productId);
        const data = await getCartRequest();
        if (data?.items) {
          set({ cart: data.items.map(mapBackendItem) });
        }
        return;
      }
      set({ cart: get().cart.filter((item) => item.id !== productId) });
    },

    // aumentar la cantidad de un producto

    increaseQuantity: async (productId) => {
      if (isLoggedIn()) {
        const { cart } = get();
        const item = cart.find((i) => i.id === productId);
        if (!item) return;
        await updateCartItemRequest(productId, item.quantity + 1);
        const data = await getCartRequest();
        if (data?.items) {
          set({ cart: data.items.map(mapBackendItem) });
        }
        return;
      }
      set({ cart: get().cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )});
    },

    // limpiar el carrito

    clearCart: async () => {
      if (isLoggedIn()) {
        const { cart } = get();
        for (const item of cart) {
          await removeFromCartRequest(item.id);
        }
        set({ cart: [] });
        return;
      }
      set({ cart: [] });
    },

    total: () => {
      const { cart } = get();
      return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ cart: state.cart }),
    },
  ),
);
