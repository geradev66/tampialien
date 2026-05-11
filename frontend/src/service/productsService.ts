const API = 'http://localhost:3000/productos';

const getToken  = () => localStorage.getItem('token');

export const getProductsRequest = async () => {
    const res = await fetch(API);
    return res.json();
};

export const createProductRequest = async (data: { nombre?: string; precio?: number; descripcion?: string;  imagen?: string;  categoria?: string; }) => {
    const res = await fetch(API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(data)
    });
    return res.json();
}


export const updateProductRequest = async (id: string, data: { nombre?: string; precio?: number; descripcion?: string;  imagen?: string;  categoria?: string; }) => {
    const res = await fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify(data)
    });
    return res.json();
}


export const deleteProductRequest = async (id: string) => {
    const res = await fetch(`${API}/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    });
    return res.json();
}   