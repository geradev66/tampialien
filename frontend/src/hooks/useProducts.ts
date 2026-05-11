import {useState} from 'react';
import { getProductsRequest, createProductRequest, updateProductRequest, deleteProductRequest } from '../service/productsService';

export const useProducts = () => {
    const [products, setProducts] = useState<any[]>([]);

    // obtener productos
    const getProducts = async () => {
        const data = await getProductsRequest();
        setProducts(data);
        return data;
    };

    // crear producto
    const createProduct = async (product: any) =>{
        const newProduct = await createProductRequest(product);
        if (newProduct?.error || newProduct?.errors) return;
        setProducts([...products, newProduct]);
    }

    // actualizar producto
    const updateProduct = async (id: any, updatedProduct: any) => {
        const data = await updateProductRequest(id, updatedProduct);
        const productData = data?.producto ?? data;
        if (productData?.error || productData?.errors) return;
        setProducts(products.map(product => (product._id ?? product.id) === id ? productData : product));
    }

    // eliminar producto
    const deleteProduct = async (id: any) => {
        await deleteProductRequest(id);
        setProducts(products.filter(product => (product._id ?? product.id) !== id));
    }

    return {
        products,
        getProducts,
        createProduct,
        updateProduct,
        deleteProduct
    };
}