
import {Pagination, Table} from "@heroui/react";
import {useMemo, useState} from "react";
import {Button, Form, Input, Label, TextField} from "@heroui/react";
import { useProducts } from "../hooks/useProducts";
import {useCategories} from "../hooks/useCategory";
import { useEffect } from "react";
import { sileo, Toaster } from "sileo";
import Swal from 'sweetalert2'



const columns = [
  {key: 'nombre', id: "nombre", name: "Nombre"},
  {key: 'precio', id: "precio", name: "Precio"},
  {key: 'descripcion', id: "descripcion", name: "Descripción"},
  {key: 'imagen', id: "imagen", name: "Imagen"},
  {key: 'categoria', id: "categoria", name: "Categoría"},
  {key: 'acciones', id: "acciones", name: "Acciones"},
];

// const products = [
//   {id: 1, name: "Playera Alien", price: 19.99, image: "https://example.com/playera-alien.jpg", category: "Playera"},
//   {id: 2, name: "Tenis Galaxy", price: 49.99, image: "https://example.com/tenis-galaxy.jpg", category: "Tenis"},
//   {id: 3, name: "Sudadera Nebula", price: 29.99, image: "https://example.com/sudadera-nebula.jpg", category: "Sudadera"},
//   {id: 4, name: "Zapatos Comet", price: 59.99, image: "https://example.com/zapatos-comet.jpg", category: "Zapatos"},
//   {
//     id: 5,
//     name: "Gorra Meteor",
//     price: 14.99,
//     image: "https://example.com/gorra-meteor.jpg",
//     category: "Gorra",
//   },   

// ];




const ROWS_PER_PAGE = 4;


export function Admin() {
  const { products, getProducts, createProduct,  updateProduct, deleteProduct  } = useProducts();
  const [page, setPage] = useState(1);

  useEffect(() => {
    getProducts();
  }, []);


  const totalPages = Math.ceil(products.length / ROWS_PER_PAGE);
  const pages = Array.from({length: totalPages}, (_, i) => i + 1);
  
  const paginatedItems = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    return products.slice(start, start + ROWS_PER_PAGE).map((p, i) => ({
      ...p,
      key: String(p.id ?? p._id ?? p.name ?? `${start + i}`),
    }));
  }, [page, products]);
  
  const start = (page - 1) * ROWS_PER_PAGE + 1;
 
  const end = Math.min(page * ROWS_PER_PAGE, products.length);
  
  //formulario 

 
  //categoria

  const {categories, getCategories } = useCategories();
  useEffect(()=>{
    getCategories()
  },[])

  //formulario 

  const [editingProduct, setEditingProduct] = useState<any>(null)

  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState(0)
  const [imagen, setImagen] = useState('')
  const [categoria, setCategoria] = useState("")
  const [descripcion, setDescripcion] = useState('')

  const handleSubmit = async (e: React.FormEvent) =>{
    e.preventDefault()
    if (!nombre || !imagen || !categoria) {
      sileo.error({ title: "Todos los campos son obligatorios" });
      return
    }
    if (editingProduct){
      const id = editingProduct._id ?? editingProduct.id;
      await updateProduct(id, {nombre, precio, imagen, categoria, descripcion

      })
      setEditingProduct(null)
    }else{
      await createProduct({nombre, precio, imagen, categoria, descripcion})
      sileo.success({ title: "👽 Producto creado exitosamente" });
    }
    setNombre('')
    setPrecio(0)
    setImagen('')
    setCategoria('')
    setDescripcion('')
  }

  //edit producto

      const handleEdit = (product: any)=>{
        setEditingProduct(product)
        setNombre(product.nombre ?? '')
        setPrecio(Number(product.precio ?? 0))
        setImagen(product.imagen ?? '')
        setDescripcion(product.descripcion ?? '')
        setCategoria(product.categoria ?? '')

      
      }

      //eliminar producto
      const handleDelete = async (id: string) => {
        const result = await Swal.fire({
          title: "¿Estás seguro?",
          text: "No podrás revertir esto",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, eliminar",
          cancelButtonText: "Cancelar"
        });
        if (result.isConfirmed) {
          await deleteProduct(id);
          Swal.fire({
            title: "Eliminado",
            text: "El producto ha sido eliminado",
            icon: "success"
          });
        }
      }
  return (


 <>
 <Toaster position="top-center" />
   <Form className="mb-4 p-3" onSubmit={handleSubmit}>
     <TextField className= "grid grid-cols-1 md:grid-cols-2 gap-4 ">
      <div className="flex flex-col">
        <Label className="text-white">Nombre del producto</Label>
        <Input type="text" name="nombre" placeholder="Playera, tenis, etc etc." value={nombre} onChange={(e) => setNombre(e.target.value)}/>
        <Label className="text-white mt-4">Precio</Label>
        <Input type="number" name="precio" placeholder="Precio del producto" className="mt-2" value={precio} onChange={(e) => setPrecio(Number(e.target.value))} />
        <Label className="text-white mt-4">Url de la imagen</Label>
        <Input type="url" name="imagen" placeholder="https://example.com/producto.jpg" className="mt-2" value={imagen} onChange={(e) => setImagen(e.target.value)} />
      </div>

      <div className="flex flex-col">
        <Label className="text-white">Categoría</Label>
        <select 
          value={categoria} 
          onChange={(e) => setCategoria(e.target.value)}
          className="w-full px-3 py-2 bg-white text-neutral-800 border border-zinc-600 rounded-lg"
        >
          <option value="">Seleccionar categoría...</option>
          {categories.map((campo) => (
            <option key={campo._id ?? campo.id} value={campo._id ?? campo.id}>
              {campo.nombre}
            </option>
          ))}
        </select>
        <Label className="text-white mt-4">Descripción</Label>
        <textarea 
          name="descripcion" 
          id="" 
          className="w-full px-3 py-2 bg-white text-neutral-800 border border-zinc-600 rounded-lg"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <Button
          type="submit"
          className="mt-4 bg-[#39ff14] text-black hover:bg-[#32cd32]"
        >
            {editingProduct ? "Actualizar" : "Agregar"}
        </Button>
      </div>
     </TextField>
       
     
   
  
   
   </Form>

    <Table className="mt-10">
      <Table.ScrollContainer>
        <Table.Content aria-label="Table with pagination" className="min-w-[600px]">
          <Table.Header columns={columns}>
            {(column) => (
              <Table.Column isRowHeader={column.id === "nombre"}>{column.name}</Table.Column>
            )}
          </Table.Header>
          <Table.Body items={paginatedItems}>
            {(product) => (
              <Table.Row>
                <Table.Collection items={columns}>
                  {(column) => {
                    if (column.id === 'acciones') {
                      return (
                        <Table.Cell>
                          <div className="flex gap-2">
                            <Button onPress={() => handleEdit(product)} className="bg-[#39ff14] hover:bg-[#32cd32] text-black" >Editar</Button>
                            <Button onPress={() => handleDelete(product._id ?? product.id)} className="bg-purple-600 hover:bg-purple-700 text-white">Eliminar</Button>
                          </div>
                        </Table.Cell>
                      );
                    }
                    if (column.id === 'imagen') {
                      return (
                        <Table.Cell>
                          <img src={product.imagen} alt={product.nombre} className="w-16 h-16 object-cover rounded" />
                        </Table.Cell>
                      );
                    }
                    if (column.id === 'categoria') {
                      const catName = categories.find(c => String(c._id) === product.categoria)?.nombre ?? product.categoria;
                      return <Table.Cell>{catName}</Table.Cell>;
                    }
                    return <Table.Cell>{product[column.id as keyof typeof product]}</Table.Cell>;
                  }}
                </Table.Collection>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
      <Table.Footer>
        <Pagination size="sm">
          <Pagination.Summary>
            {start} to {end} of {products.length} results
          </Pagination.Summary>
          <Pagination.Content>
            <Pagination.Item>
              <Pagination.Previous
                isDisabled={page === 1}
                onPress={() => setPage((p) => Math.max(1, p - 1))}
              >
                <Pagination.PreviousIcon />
                Prev
              </Pagination.Previous>
            </Pagination.Item>
            {pages.map((p) => (
              <Pagination.Item key={p}>
                <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
                  {p}
                </Pagination.Link>
              </Pagination.Item>
            ))}
            <Pagination.Item>
              <Pagination.Next
                isDisabled={page === totalPages}
                onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
                <Pagination.NextIcon />
              </Pagination.Next>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
      </Table.Footer>
    </Table>
    </>
  );
}

export default Admin

