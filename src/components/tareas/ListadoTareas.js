import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Tarea from "./Tarea";
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const ListadoTareas = () => {
    
    //STATE DE PROYECTOS    
    const proyectosContext = useContext(proyectoContext);
    const { proyecto, eliminarProyecto } = proyectosContext;

    //obtener state tareas
    const tareasContext = useContext(tareaContext);
    const { tareasProyecto } = tareasContext;

    //si no hay proyecto seleccionado
    if(!proyecto) return <h2>Selecciona un proyecto</h2>

    //array destructuring para extraer proyectoactual
    const [ proyectoActual ] = proyecto;
    
    
    return ( 
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>

            <ul className='listado-tareas'>
                { tareasProyecto.length === 0
                    ? ( <li className='tarea'><p>No hay tareas</p></li> )
                    : <TransitionGroup>
                        {
                            tareasProyecto.map(tarea => (
                                <CSSTransition
                                    key={tarea._id}
                                    timeout={200}
                                    classNames='tarea'
                                >
                                    <Tarea
                                        tarea={tarea}
                                    />
                                </CSSTransition>
                            ))
                        }
                    </TransitionGroup>

                }

            </ul>
            <button
                type='button'
                className='btn btn-eliminar'
                onClick={() => eliminarProyecto(proyectoActual._id)}
            >
                Eliminar Proyecto &times;
            </button>
        </Fragment>
     );
}
 
export default ListadoTareas;