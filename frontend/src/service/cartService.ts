const API = 'http://localhost:3000/cart';

const getToken = () => localStorage.getItem('token');

export const getCartRequest = async () => {
  const res = await fetch(API, {
    headers: { 'Authorization': `Bearer ${getToken()}` }
  });
  return res.json();
};

export const addToCartRequest = async (productId: string, quantity: number = 1) => {
  const res = await fetch(`${API}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify({ productId, quantity })
  });
  return res.json();
};

export const updateCartItemRequest = async (productId: string, quantity: number) => {
  const res = await fetch(`${API}/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify({ productId, quantity })
  });
  return res.json();
};

export const removeFromCartRequest = async (productId: string) => {
  const res = await fetch(`${API}/${productId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${getToken()}` }
  });
  return res.json();
};

export const getCartTotalRequest = async () => {
  const res = await fetch(`${API}/total`, {
    headers: { 'Authorization': `Bearer ${getToken()}` }
  });
  return res.json();
};
