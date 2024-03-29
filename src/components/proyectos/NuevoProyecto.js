import React, { Fragment, useState, useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext'

const NuevoProyecto = () => {

    //obtener state del form
    const proyectosContext = useContext(proyectoContext);
    const { formulario, errorFormulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContext;

    //state proyecto
    const [ proyecto, guardarProyecto ] = useState({
        nombre: ''
    })

    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }

    const { nombre } = proyecto;

    //cuando usuario envia proyecto
    const onSubmitProyecto = e => {
        e.preventDefault();
        
        //validar el proyecto
        if(nombre === ''){
            mostrarError();
            return;
        }

        //agregar al state
        agregarProyecto(proyecto)

        //reiniciar form
        guardarProyecto({
            nombre: ''
        })
    }

    const onClickFormulario = () => {
        mostrarFormulario()
    }

    return ( 
        <Fragment>
            <button
                type='button'
                className='btn btn-block btn-primario'
                onClick={ onClickFormulario }
            >
                Nuevo Proyecto
            </button>
            {
                formulario
                ?
                    (
                        <form
                            className='formulario-nuevo-proyecto'
                            onSubmit={onSubmitProyecto}
                        >
                            <input
                                type='text'
                                className='input-text'
                                placeholder='Nombre Proyecto'
                                name='nombre'
                                value={nombre}
                                onChange={onChangeProyecto}
                            />

                            <input 
                                type='submit'
                                className='btn btn-block btn-primario'
                                value='Agregar Proyecto'
                            />
                        </form>
                    )
                : null }

                { errorFormulario ? <p className='mensaje error'>El nombre es obligatorio</p> : null }
        </Fragment>
     );
}
 
export default NuevoProyecto;