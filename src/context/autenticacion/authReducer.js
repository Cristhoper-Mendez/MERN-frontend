import { 
    REGISTRO_ERROR,
    REGISTRO_EXITOSO,
    OBTENER_USUARIO,
    LOGIN_ERROR,
    LOGIN_EXITOSO,
    CERRAR_SESION
 } from "../../types";

export default (state, action) => {
    switch(action.type) {
        case REGISTRO_EXITOSO:
        case LOGIN_EXITOSO:
            localStorage.setItem('token', action.payload.token);

            return {
                ...state,
                autenticado: true,
                mensaje: null,
                cargando: false
            }
        
        case OBTENER_USUARIO:
            return {
                ...state,
                usuario: action.payload,
                autenticado: true,
                cargando: false
            }

        case CERRAR_SESION:
        case LOGIN_ERROR:
        case REGISTRO_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                usuario: null,
                autenticado: null,
                mensaje: action.payload,
                cargando: false
            }

        default:
            return state;
    }
}