
import { Outlet } from 'react-router-dom'


const Layout = () => {
  return (
    <>
    <main className='container mx-auto py-8'>
      <Outlet />
    </main>
   
      
    </>
  )
}

export default Layout
