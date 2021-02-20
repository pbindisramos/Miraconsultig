import React, { useReducer, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseContext } from "../../firebase";
import AuthReducer from "./authReducer";
import AuthContext from "./authContext";

import { LOGIN_EXITOSO, CERRAR_SESION, OBTENER_USUARIO } from "../../types";

const AuthState = (props) => {
  // Crear state inicial
  const initialState = {
    autenticado: null,
    usuario: null,
    mensaje: null,
    cargando: null,
  };

  // useReducer con dispatch  para ejecutar las funciones
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    unsuscribe();
  }, []);

  const unsuscribe = () =>
    firebase.auth.onAuthStateChanged((usuario) => {
      if (usuario) {
        dispatch({
          type: OBTENER_USUARIO,
          payload: usuario,
        });
      } else {
      }
    });

  const iniciarSesion = async (usuario) => {
    const { email, password } = usuario;
    try {
      await firebase.login(email, password);
      navigate("./proyectos");
      dispatch({
        type: LOGIN_EXITOSO,
        payload: usuario,
      });
      unsuscribe();
    } catch (error) {
      console.log(error);
    }
  };

  //cerrar sesion
  const logOut = () => {
    firebase.cerrarSesion();
    navigate("/");
    dispatch({
      type: CERRAR_SESION,
    });
  };

  

  return (
    <AuthContext.Provider
      value={{
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        cargando: state.cargando,
        iniciarSesion,
        logOut,
        unsuscribe,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
