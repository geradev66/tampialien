
import {Pagination, Table} from "@heroui/react";
import { useEffect, useMemo, useState } from "react";
import {Button, Form, Input, Label, TextField} from "@heroui/react";
import {useCategories} from "../hooks/useCategory";
import { sileo, Toaster } from "sileo";
import Swal from 'sweetalert2'

const columns = [
  {key: 'name', id: "name", name: "Nombre"},
  {key: 'actions', id: "actions", name: "Actions"},
];




const ROWS_PER_PAGE = 4;


export function Category() {
  const [page, setPage] = useState(1);
  const { categories, getCategories, createCategory, updateCategory, deleteCategory } = useCategories();

  useEffect(() => {
    getCategories();
      console.log(getCategories());
  }, []);
  
  const totalPages = Math.ceil(categories.length / ROWS_PER_PAGE);
  
  const pages = Array.from({length: totalPages}, (_, i) => i + 1);
  
  const paginatedItems = useMemo(() => {
    
    const start = (page - 1) * ROWS_PER_PAGE;
    return categories.slice(start, start + ROWS_PER_PAGE).map((c, i) => ({
      ...c,
      key: String(c.id ?? c.name ?? `${start + i}`),
    }));
  }, [page, categories]);
  const start = (page - 1) * ROWS_PER_PAGE + 1;
  const end = Math.min(page * ROWS_PER_PAGE, categories.length);
  
  


  //formulario 

  const [editingCategory, setEditingCategory] = useState<any>(null);


  const [name, setName] = useState('');

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  if (!name) {
    sileo.error({ title: "Todos los campos son obligatorios" });
    return;
  }
  if (editingCategory) {
    await updateCategory(editingCategory, { name });
    setEditingCategory(null);
  } else {
    await createCategory({ name });
    sileo.success({ title: "👽 Categoría creada exitosamente" });
  }
  setName('');
}


//editar producto

const handleEdit = (category: any) => {
  setEditingCategory(category.id ?? category._id ?? category);
  setName(category.name ?? category.nombre ?? '');
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
          await deleteCategory(id);
          Swal.fire({
            title: "Eliminado",
            text: "La categoría ha sido eliminada",
            icon: "success"
          });
        }
      }


  return (


 <> 
 <Toaster position="top-center" />
   <Form className="mb-4 p-3" onSubmit={handleSubmit}>
     <TextField className= "grid grid-cols-1 gap-4 ">
      <div className="flex flex-col">
        <Label className="text-white">Nombre de la categoría</Label>
        <Input type="text" name="search" placeholder="Playera, tenis, etc etc." value={name} onChange={(e) => setName(e.target.value)} />
      </div>
     </TextField>
       
       {/* si se va a editar que ponga el boton de actualizar en vez de agregar */}        
        <Button type="submit" className="bg-[#39ff14] hover:bg-[#32cd32] text-black mt-4">{editingCategory ? "Actualizar" : "Agregar"}</Button>
   
  
   
   </Form>

    <Table className="mt-10">
      <Table.ScrollContainer>
        <Table.Content aria-label="Table with pagination" className="min-w-[600px]">
          <Table.Header columns={columns}>
            {(column) => (
              <Table.Column isRowHeader={column.id === "name"}>{column.name}</Table.Column>
            )}
          </Table.Header>
          <Table.Body items={paginatedItems}>
            {(category) => (
              <Table.Row>
                <Table.Collection items={columns}>
                  {(column) => {
                    if (column.id === 'actions') {
                      return (
                        <Table.Cell>
                          <div className="flex gap-2">
                            {/* terminario si se da editar que salga el boton actualizar */}
                            <Button className="bg-[#39ff14] hover:bg-[#32cd32] text-black" onClick={() => handleEdit(category)}>Editar</Button>
                            <Button className="bg-purple-700 hover:bg-purple-900 " onClick={() => handleDelete(category.id ?? category._id ?? category)}>Eliminar</Button>
                          </div>
                        </Table.Cell>
                      );
                    }
                    return <Table.Cell>{category[column.id as keyof typeof category]}</Table.Cell>;
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
            {start} to {end} of {categories.length} results
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

export default Category

