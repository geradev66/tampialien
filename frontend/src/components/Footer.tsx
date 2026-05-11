import Logo from '../../public/app_logo.png';

const Footer = () => {
  return (
    <>
        <div className="p-6 bg-gray-900">
            <div className="flex items-center gap-2 container mx-auto justify-between">
                <div className='flex items-center gap-2'>
                    <img src={Logo} alt="Logo" className="h-8" />
                    <h2 className="text-white font-bold text-2xl">Tampi<span className="text-[#39ff14]">Alien</span></h2>
                </div>

                   <p className='text-white'>© 2026 TampiAlien. All rights reserved.</p> 
            </div>

        </div>
    </>
  )
}

export default Footer
