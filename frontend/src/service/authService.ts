const API = `${import.meta.env.VITE_API_URL}/auth`;

export const loginRequest = async (data: { email: string; password: string }) => {
  const res = await fetch(`${API}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const registerRequest = async (data: { nombre?: string; email: string; password: string }) => {
  const res = await fetch(`${API}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return res.json();
};
