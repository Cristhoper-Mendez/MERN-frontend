import React, { useReducer } from 'react';
import alertaReducer from "./alertaReducer";
import alertasContext from "./alertasContext";

import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../../types";


const AlertState = props => {
    const initialState = {
        alerta: null
    }

    const [state, dispatch] = useReducer(alertaReducer, initialState);

    //funciones
    const mostrarAlerta = (msg, categoria) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                msg,
                categoria
            }
        });

        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 5000);
    }

    return(
        <alertasContext.Provider
            value={{
                alerta: state.alerta,

                mostrarAlerta
            }}
        >
            {props.children}
        </alertasContext.Provider>
    )
}

export default AlertState;