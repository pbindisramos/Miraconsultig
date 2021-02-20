import { LOGIN_EXITOSO, CERRAR_SESION, OBTENER_USUARIO } from "../../types";

export default (state, action) => {
  switch (action.type) {
    case LOGIN_EXITOSO:
      return {
        ...state,
        autenticado: true,
      };
    case CERRAR_SESION:
      return {
        ...state,
        autenticado: false,
        usuario: null,
      };
    case OBTENER_USUARIO:
      return {
        ...state,
        autenticado: true,
        usuario: action.payload.email,
      };

    default:
      return state;
  }
};
