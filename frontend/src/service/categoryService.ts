const API = 'http://localhost:3000/categorias';

const getToken  = () => localStorage.getItem('token');

export const getCategoriesRequest = async () => {
    const res = await fetch(API);
    return res.json();
}

export const createCategoryRequest = async (data: { name: string }) => {
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

export const updateCategoryRequest = async (id: string, data: { name?: string }) => {
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


export const deleteCategoryRequest = async (id: string) => {
    const res = await fetch(`${API}/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    });
    return res.json();
}

