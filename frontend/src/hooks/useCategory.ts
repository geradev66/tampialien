import {useState} from 'react';
import { getCategoriesRequest, createCategoryRequest, updateCategoryRequest, deleteCategoryRequest } from '../service/categoryService';

export const useCategories = () => {
    const [categories, setCategories] = useState<any[]>([]);

    // obtener categorias
    const getCategories = async () => {
        const data = await getCategoriesRequest();
        const mapped = Array.isArray(data)
            ? data.map((c: any) => ({ ...c, id: c._id ?? c.id, name: c.nombre ?? c.name }))
            : [];
        setCategories(mapped);
        return mapped;
    };

    // crear categoria
    const createCategory = async (data: { name: string }) => {
        const newCategory = await createCategoryRequest(data);
        const mapped = { ...newCategory, id: newCategory._id ?? newCategory.id, name: newCategory.nombre ?? newCategory.name };
        setCategories(prev => [...prev, mapped]);
    };

    // actualizar categoria
    const updateCategory = async (id: string, data: { name?: string }) => {
        const res = await updateCategoryRequest(id, data);
        // el backend devuelve { result, message, categoria: {...} } o directamente el objeto
        const raw = res?.categoria ?? res;
        const mapped = { ...raw, id: raw._id ?? raw.id, name: raw.nombre ?? raw.name };
        setCategories(prev => prev.map(category => category.id === id ? mapped : category));
    };

    // eliminar categoria
    const deleteCategory = async (id: string) => {
        await deleteCategoryRequest(id);
        setCategories(prev => prev.filter(category => category.id !== id));
    };

    return {
        categories,
        getCategories,
        createCategory,
        updateCategory,
        deleteCategory
    };
}