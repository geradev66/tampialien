import productosModel from '../models/productos.js';

class ProductosController {
    // Obtener todos los productos
    async listaDeProductos(req, res) {
        try {
            const productos = await productosModel.find();
            res.json(productos);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            res.status(500).json({ error: 'Error al obtener los productos' });
        }
    }

    async crearProducto(req, res) {
        try{
            const nuevoProducto = await productosModel.create(req.body);
            res.status(201).json(nuevoProducto);    
        } catch (error) {
            console.error('Error al crear el producto:', error);
            res.status(500).json({ error: 'Error al crear el producto' });
        }
    }

    async listaProductoPorId(req, res) {
        try {
            const producto = await productosModel.findById(req.params.id);
            if (!producto) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }
            res.status(200).json(producto);
        } catch (error) {
            console.error('Error al obtener el producto:', error);
            res.status(500).json({ error: 'Error al obtener el producto' });
        }
    }

    async actualizacionProducto(req, res){
        try{
            const id = req.params.id;
            const productoActualizado = await productosModel.findByIdAndUpdate(id, req.body, { returnDocument: 'after' });
            if (!productoActualizado) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }
            res.status(200).json({result:true, message:'Producto actualizado correctamente', producto: productoActualizado});
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            res.status(500).json({ error: 'Error al actualizar el producto' });
        }
    }

    async eliminarProducto(req, res) {
        try{
            const eliminado = await productosModel.findByIdAndDelete(req.params.id)
            if (!eliminado) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }
            res.status(200).json({result:true, message:'Producto eliminado correctamente'});
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            res.status(500).json({ error: 'Error al eliminar el producto' });
        }
    }
}

export default new ProductosController();