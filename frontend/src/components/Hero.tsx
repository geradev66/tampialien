
import {Button} from "@heroui/react";

const Hero = () => {

  return (
    <div>
      <div className="flex flex-col items-center justify-center text-center gap-4">
        <p className="font-semibold text-gray-400 text-2xl">Established 2026 desde el cosmos</p>
        <h2 className='text-white text-[4rem] sm:text-5xl md:text-9xl'>TAMPI<br></br>
          <span className="text-[#39ff14] shadow-green-500 text-[1.5em]">ALIEN</span>
        </h2>
        <p className="text-gray-400 text-[16px] md:text-2xl ">Merchandise de otro mundo para fans y coleccionistas de sci-fi. <br></br>Ropa, arte y artefactos del universo alienígena.</p>
        <div>
          <Button variant="primary" className="bg-[#39ff14] text-black font-bold w-[19em] hover:bg-emerald-900 hover:text-white">Explorar<i className="fa-solid fa-arrow-down"></i></Button>
          <Button variant="secondary" className="bg-gray-800 text-white font-bold ml-4">Contáctanos <i className="fa-solid fa-address-book"></i></Button>
        </div>
      </div>
    </div>
  )
}

export default Hero
