import React, { useContext, useState, useEffect } from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    //extraer si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    //state del form
    const [ tarea, guardarTarea ] = useState({
        nombre: ''
    })

    //obtener funcion de context de tareas
    const tareasContext = useContext(tareaContext);
    const { tareaSeleccionada, errorTarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea } = tareasContext;

    //effect que detecta tarea seleccionada
    useEffect(() => {
        if(tareaSeleccionada !== null){
            guardarTarea(tareaSeleccionada)
        } else {
            guardarTarea({
                nombre: ''
            })
        }
    }, [tareaSeleccionada]);

    //si no hay proyecto seleccionado
    if(!proyecto) return null;

    //array destructuring para extraer proyectoactual
    const [ proyectoActual ] = proyecto;

    //leer valores del formulario
    const handlerChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    //extraer el nombre del proyecto
    const { nombre } = tarea;

    //funcion que hace submit
    const onSubmit = e => {
        e.preventDefault();

        ///validar
        if(nombre.trim() === ''){
            validarTarea();
            return;
        }

        //revisar si es edicion o nueva tarea
        if(tareaSeleccionada === null){
            //tarea nueva
            //agregar nueva tarea al state
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        } else {
            //actualizar la tarea existente
            actualizarTarea(tarea);
            //limpia tarea seleccionada
            limpiarTarea();
        }
  
        //reiniciar form
        guardarTarea({
            nombre: ''
        })

        //refrescar las tareas
        obtenerTareas(proyectoActual.id)
    }

    return ( 
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className='input-text'
                        placeholder='Nombre Tarea'
                        name='nombre'
                        value={nombre}
                        onChange={handlerChange}
                    />
                </div>

                <div className="contenedor-input">
                    <input
                        type='submit'
                        className='btn btn-primario btn-submit btn-block'
                        value={tareaSeleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>
            { errorTarea ? <p className='mensaje error'>El nombre de la tarea es obligatorio</p> : null }
        </div>
     );
}
 
export default FormTarea;