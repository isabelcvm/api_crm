import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Spinner from '../components/Spinner'

const VerCliente = () => {

    const [cliente, setCliente] = useState({})
    const [cargando, setCargando] = useState(true)
    const { id } = useParams()

    useEffect(() => {
        const obtenerClienteAPI = async () => {
            try {
                const url = `http://localhost:4000/clientes/${id}`
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()

                setCliente(resultado);
            } catch (error) {
                console.log(error)
            }

            setTimeout(() => {    
                setCargando(!cargando)
            }, 300);
        }
        obtenerClienteAPI()
    }, [])



    return (

        cargando ? <Spinner /> :
            Object.keys(cliente).length === 0 ?
                <p> No hay resultados </p> :
                (

                    <div>
                        <>
                            <h1 className='font-black text-4xl text-blue-900' >Ver Cliente: {cliente.nombre}</h1>
                            <p className='mb-3'>Información del Cliente</p>

                            <p className='text-3xl text-gray-600 mt-3'>
                                <span className='font-bold uppercase pr-2 text-gray-800'> Cliente:</span>
                                {cliente.nombre}
                            </p>

                            <p className='text-2xl text-gray-600 mt-3'>
                                <span className='font-bold uppercase pr-2 text-gray-800'> Email:</span>
                                {cliente.email}
                            </p>

                            {cliente.telefono && (
                                <p className='text-2xl text-gray-600 mt-3'>
                                    <span className='font-bold uppercase pr-2 text-gray-800'> Teléfono:</span>
                                    {cliente.telefono}
                                </p>
                            )}

                            <p className='text-2xl text-gray-600 mt-3'>
                                <span className='font-bold uppercase pr-2 text-gray-800'> Empresa:</span>
                                {cliente.empresa}
                            </p>

                            {cliente.notas && (
                                <p className='text-2xl text-gray-600 mt-3'>
                                    <span className='font-bold uppercase pr-2 text-gray-800'> Notas:</span>
                                    {cliente.notas}
                                </p>
                            )}
                        </>
                    </div>
                )
    )
}

export default VerCliente