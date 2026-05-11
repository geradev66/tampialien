import categoriaModel from '../models/categoria.js';

class CategoriaController {
    // Obtener todas las categorias
    async listaDeCategorias(req, res) {
        try {
            const categorias = await categoriaModel.find();
            res.json(categorias);
        } catch (error) {
            console.error('Error al obtener las categorias:', error);
            res.status(500).json({ error: 'Error al obtener las categorias' });
        }
    }

    async crearCategoria(req, res) {
        try{
            const nombre = req.body.nombre ?? req.body.name;
            if (!nombre) return res.status(400).json({ error: 'El campo nombre es requerido' });
            const nuevaCategoria = await categoriaModel.create({ nombre });
            res.status(201).json(nuevaCategoria);    
        } catch (error) {
            console.error('Error al crear la categoria:', error);
            res.status(500).json({ error: 'Error al crear la categoria' });
        }
    }

    async listaCategoriaPorId(req, res) {
        try {
            const categoria = await categoriaModel.findById(req.params.id);
            if (!categoria) {
                return res.status(404).json({ error: 'Categoria no encontrada' });
            }
            res.status(200).json(categoria);
        } catch (error) {
            console.error('Error al obtener la categoria:', error);
            res.status(500).json({ error: 'Error al obtener la categoria' });
        }
    }

    async actualizacionCategoria(req, res){
        try{
            const id = req.params.id;
            const update = { nombre: req.body.nombre ?? req.body.name };
            const categoriaActualizada = await categoriaModel.findByIdAndUpdate(id, update, { new: true });
            if (!categoriaActualizada) {
                return res.status(404).json({ error: 'Categoria no encontrada' });
            }
            res.status(200).json({result:true, message:'Categoria actualizada correctamente', categoria: categoriaActualizada});
        }
        catch (error) {
            console.error('Error al actualizar la categoria:', error);
            res.status(500).json({ error: 'Error al actualizar la categoria' });
        }
    }

    async eliminarCategoria(req, res) {
        try{
            const eliminado = await categoriaModel.findByIdAndDelete(req.params.id)
            if (!eliminado) {
                return res.status(404).json({ error: 'Categoria no encontrada' });
            }
            res.status(200).json({result:true, message:'Categoria eliminada correctamente'});
        } catch (error) {
            console.error('Error al eliminar la categoria:', error);
            res.status(500).json({ error: 'Error al eliminar la categoria' });
        }
}

}
export default new CategoriaController();