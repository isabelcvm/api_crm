import { Outlet, Link, useLocation } from 'react-router-dom'

const Layout = () => {

  const location = useLocation();
  const urlActual = location.pathname;
  
  return (
    <div className='md:flex md:min-h-screen' >

      {/* Este div sera el más pequeno, para el sidebar */}
      <div className='md:w-1/4 bg-blue-900 px-5 py-10'>
        <h2 className='font-black text-center text-4xl text-white' >CRM - Clientes</h2>
        
        <nav className='mt-10'>
          <Link 
            to="/clientes" 
            className= {` ${urlActual === '/clientes' ? 'text-blue-300' : 'text-white' } text-white text-2xl block mt-2 hover:text-blue-300 `}
          >Clientes
          </Link>

          <Link 
            to="/clientes/nuevo" 
            className={` ${urlActual === '/clientes/nuevo' ? 'text-blue-300' : 'text-white' } text-white text-2xl block mt-2 hover:text-blue-300 `}> 
           Nuevo Clientes
          </Link>
        </nav>

      </div>

      {/* Este div sera para el espacio más grande, que tendrá el contenido principal */}
      <div className="md:w-3/4 p-10 md:h-screen overflow-scroll">
        <Outlet />
      </div>

    </div>
  )
}

export default Layout