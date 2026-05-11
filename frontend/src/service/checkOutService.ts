const API = 'http://localhost:3000/checkout';

const getToken = () => localStorage.getItem('token');

export const createPayPalOrder = async () => {
  const res = await fetch(`${API}/create-order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    }
  });
  return res.json();
};

export const capturePayPalOrder = async (orderID: string) => {
  const res = await fetch(`${API}/capture-order/${orderID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    }
  });
  return res.json();
};
