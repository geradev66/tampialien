import ovni from '../../public/cow.png'

const NotFound = () => {
  return (
    <>
    <div className='flex flex-col md:flex-row gap-8 p-4 justify-center items-start mb-[22em]'>
        <div className='flex flex-col gap-4 items-center'>
        <h2 className='text-white text-2xl'>👽 404 Not Found</h2>
        <p className='text-white'>Esta Página fue abducida por extraterrestres.</p>
        {/** animación de arriba abajo a la imagen */}
        <img src={ovni} alt="Ovni" className="w-150 h-150 mt-4 animate-float" />
        </div>
    </div>
      
    </>
  )
}

export default NotFound
