
const API = 'http://localhost:3000/auth';

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
