import { useNavigate } from 'react-router-dom'

const Cliente = ({cliente, handleEliminar}) => {

    const { nombre, empresa, email, telefono, notas, id } = cliente;
    const navigate = useNavigate()

  return (
    <tr className='border-b hover:bg-gray-100'>
        <td className='p-3'>{nombre}  </td>
        <td className='p-3'>
            <p> <span className='text-gray-800 uppercase font-bold'>Email:</span> {email} </p>  
            <p> <span className='text-gray-800 uppercase font-bold'>Tel:</span> {telefono} </p>  
        </td>
        <td className='p-3'>{empresa}  </td>
        <td>

            <button
                type='button'
                className='block w-full p-2 bg-yellow-500 hover:bg-yellow-600 text-white my-2 text-xm'
                onClick={() => navigate(`/clientes/${id}`)}
            >Ver
            </button>

            <button
                type='button'
                className='block w-full p-2 bg-blue-600 hover:bg-blue-700 text-white my-2 text-xm'
                onClick={() => navigate(`/clientes/editar/${id}`)}
            >Editar
            </button>

            <button
                type='button'
                className='block w-full p-2 bg-red-600 hover:bg-red-700 text-white text-xm'
                onClick={() => handleEliminar(id)}
            >Eliminar
            </button>
        </td>
    </tr>
  )
}

export default Cliente