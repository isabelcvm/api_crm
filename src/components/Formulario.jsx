import { Form, Formik, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Alerta from './Alerta'
import Spinner from './Spinner'


const Formulario = ({ cliente, cargando }) => {

    const navigate = useNavigate()

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
            .min(3, 'El nombre es muy corto')
            .max(20, 'El nombre es muy largo')
            .required('El nombre del cliente es obligatorio'),
        empresa: Yup.string()
            .required('El nombre de la empresa es obligatorio'),
        email: Yup.string()
            .email('Debe ser un email válido')
            .required('El email es obligatorio'),
        telefono: Yup.number()
            .positive('Número no válido')
            .integer('Número no válido')
            .typeError('Número no válido'),
        notas: '',
    })

    const handleSubmit = async (values) => {
        try {
            let respuesta
           if (cliente.id) {
            //Editando un registro
            const url = `http://localhost:4000/clientes/${cliente.id}`
            respuesta = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
           } else {
            //Nuevo registro
            const url = "http://localhost:4000/clientes"
            respuesta = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
           }

            await respuesta.json()
            navigate('/clientes')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        cargando ? <Spinner /> : (

            <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:3/4 mx-auto'>
                <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>  {cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'} </h1>

                <Formik
                    initialValues={{
                        nombre: cliente?.nombre ?? "",
                        empresa: cliente?.empresa ?? "",
                        email: cliente?.email ?? "",
                        telefono: cliente?.telefono ?? "",
                        notas: cliente?.notas ?? "",
                    }}
                    enableReinitialize={true}
                    onSubmit={async (values) => {
                        await handleSubmit(values)
                    }}
                    validationSchema={nuevoClienteSchema}
                >
                    {({ errors, touched }) => {
                        // console.log(errors);
                        return (
                            <Form className='mt-10'>
                                <div className='mb-4'>
                                    <label
                                        htmlFor="nombre"
                                        className='text-gray-800'
                                    >
                                        Nombre:</label>
                                    <Field
                                        id="nombre"
                                        className="mt-2 block w-full p-3 bg-gray-50"
                                        type="text"
                                        placeholder="Nombre del cliente"
                                        name="nombre"
                                    />
                                    {errors.nombre && touched.nombre ? (
                                        <Alerta>
                                            {errors.nombre}
                                        </Alerta>
                                    ) : null}
                                </div>

                                <div className='mb-4'>
                                    <label
                                        htmlFor="empresa"
                                        className='text-gray-800'
                                    >
                                        Nombre de la empresa:</label>
                                    <Field
                                        id="empresa"
                                        className="mt-2 block w-full p-3 bg-gray-50"
                                        type="text"
                                        placeholder="Empresa del Cliente:"
                                        name="empresa"
                                    />
                                    {errors.empresa && touched.empresa ? (
                                        <Alerta>
                                            {errors.empresa}
                                        </Alerta>
                                    ) : null}
                                </div>

                                <div className='mb-4'>
                                    <label
                                        htmlFor="email"
                                        className='text-gray-800'
                                    >
                                        Email:</label>
                                    <Field
                                        id="email"
                                        name="email"
                                        className="mt-2 block w-full p-3 bg-gray-50"
                                        type="email"
                                        placeholder="Email del cliente"
                                    />
                                    {errors.email && touched.email ? (
                                        <Alerta>
                                            {errors.email}
                                        </Alerta>
                                    ) : null}
                                </div>

                                <div className='mb-4'>
                                    <label
                                        htmlFor="telefono"
                                        className='text-gray-800'
                                    >
                                        Teléfono:</label>
                                    <Field
                                        id="telefono"
                                        name="telefono"
                                        className="mt-2 block w-full p-3 bg-gray-50"
                                        type="tel"
                                        placeholder="Teléfono del cliente"
                                    />
                                    {errors.telefono && touched.telefono ? (
                                        <Alerta>
                                            {errors.telefono}
                                        </Alerta>
                                    ) : null}
                                </div>

                                <div className='mb-4'>
                                    <label
                                        htmlFor="notas"
                                        className='text-gray-800'
                                    >
                                        Notas:</label>
                                    <Field
                                        as="textarea"
                                        id="notas"
                                        name="notas"
                                        className="mt-2 block w-full p-3 bg-gray-50 h-40"
                                        type="text"
                                        placeholder="Notas del cliente"
                                    />
                                </div>
                                <input
                                    type="submit"
                                    value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                                    className='mt-5 w-full bg-blue-500 p-3 text-white uppercase font-bold text-lg'
                                />
                            </Form>
                        )
                    }}
                </Formik>

            </div>
        )
    )
}

Formulario.defaultProps = {
    cliente: {},
    cargando: false 
}

export default Formulario