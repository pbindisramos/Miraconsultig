import React, { useReducer } from "react";

import firebase from "../../firebase";

import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";
import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
  LIMPIAR_PROYECTOS,
} from "../../types";

const ProyectoState = (props) => {
  const initialState = {
    proyectos: [],
    formulario: false,
    errorformulario: false,
    proyecto: null,
  };

  //creacion del dispatch para ejecutar las acciones
  //const [usuarioAutenticado, guardarUsuarioAutenticado] = useState(null);

  const [state, dispatch] = useReducer(proyectoReducer, initialState);

  //serie de funciones crud
  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO,
    });
  };

  //Agregar proyecto
  const agregarProyecto = (proyecto) => {
    try {
      firebase.db.collection("proyectos").add({
        nombre: proyecto.nombre,
        createBy: firebase.auth.currentUser.email,
      });
    } catch (error) {
      console.log(error);
    }
    dispatch({
      type: AGREGAR_PROYECTO,
      payload: proyecto,
    });
  };
  //validar formulario
  const mostrarError = () => {
    dispatch({
      type: VALIDAR_FORMULARIO,
    });
  };

  //obtener los proyectos
  const obtenerProyectos = (usuario) => {
    if (usuario) {
      firebase.db
        .collection("proyectos")
        .where("createBy", "==", usuario.email)
        .onSnapshot(manejarSnapshot);
    }
  };
  function manejarSnapshot(snapshot) {
    const proyectos = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    dispatch({
      type: OBTENER_PROYECTOS,
      payload: proyectos,
    });
  }

  //selecciona el proyecto actual
  const proyectoActual = (proyectoId) => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyectoId,
    });
  };

  //eliminar proyecto
  const eliminarProyecto = (proyectoId) => {
    firebase.db.collection("proyectos").doc(proyectoId).delete();
    try {
    } catch (error) {
      console.log(error);
    }
    dispatch({
      type: ELIMINAR_PROYECTO,
      payload: proyectoId,
    });
  };

  //limpiar tareas
  const limpiarProyectos = () => {
    dispatch({
      type: LIMPIAR_PROYECTOS,
    });
  };

  return (
    <proyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario,
        errorformulario: state.errorformulario,
        proyecto: state.proyecto,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
        proyectoActual,
        eliminarProyecto,
        limpiarProyectos,
      }}
    >
      {props.children}
    </proyectoContext.Provider>
  );
};

export default ProyectoState;
