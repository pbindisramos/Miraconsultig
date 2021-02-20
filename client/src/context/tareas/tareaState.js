import React, { useReducer } from "react";
import TareaContext from "./tareaContext";
import TareaReducer from "./tareaReducer";

import firebase from "../../firebase";

import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
  ESTADO_TAREA,
  TAREA_ACTUAL,
  ACTUALIZAR_TAREA,
  LIMPIAR_TAREAS,
} from "../../types/";

const TareaState = (props) => {
  const initialState = {
    tareasproyecto: [],
    errortarea: false,
    tareaseleccionada: null,
  };

  //crear dispatch
  const [state, dispatch] = useReducer(TareaReducer, initialState);

  //Crear funciones

  //obtener tareas de un proyecto
  const obtenerTareas = (id) => {
    firebase.db
      .collection("proyectos")
      .doc(id)
      .collection("tareas")
      .onSnapshot(manejarSnapshot);
  };
  function manejarSnapshot(snapshot) {
    const tareas = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    dispatch({
      type: TAREAS_PROYECTO,
      payload: tareas,
    });
  }

  //agregando tareas
  const agregarTarea = (tarea, id) => {
    try {
      firebase.db
        .collection("proyectos")
        .doc(id)
        .collection("tareas")
        .add(tarea);
    } catch (error) {
      console.log(error);
    }
    dispatch({
      type: AGREGAR_TAREA,
      payload: tarea,
    });
  };

  //mostrar error en caso de ser necesariop
  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA,
    });
  };

  //eliminar tarea por su ID
  const eliminarTarea = (id, proyecto) => {
    try {
      firebase.db
        .collection("proyectos")
        .doc(proyecto)
        .collection("tareas")
        .doc(id)
        .delete();
    } catch (error) {
      console.log(error);
    }
    dispatch({
      type: ELIMINAR_TAREA,
      payload: id,
    });
  };

  //editar estado tarea
  const actualizarTarea = (proyectoid, tareaid, estado, tarea) => {
    try {
      firebase.db
        .collection("proyectos")
        .doc(proyectoid)
        .collection("tareas")
        .doc(tareaid)
        .update({ estado });
    } catch (error) {
      console.log(error);
    }
    dispatch({
      type: ESTADO_TAREA,
      payload: tarea,
    });
  };

  //Selecciona tarea para edicion
  const guardarTareaActual = (tarea) => {
    dispatch({
      type: TAREA_ACTUAL,
      payload: tarea,
    });
  };

  //Limpiar tareas del state
  const limpiarTareas = () => {
    dispatch({
      type: LIMPIAR_TAREAS,
    });
  };

  //ActualizaTarea
  const modificarTarea = (proyectoid, tareaid, nombre, tarea) => {
    try {
      firebase.db
        .collection("proyectos")
        .doc(proyectoid)
        .collection("tareas")
        .doc(tareaid)
        .update({ nombre });
    } catch (error) {
      console.log(error);
    }
    dispatch({
      type: ACTUALIZAR_TAREA,
      payload: tarea,
    });
  };
  return (
    <TareaContext.Provider
      value={{
        tareasproyecto: state.tareasproyecto,
        errortarea: state.errortarea,
        tareaseleccionada: state.tareaseleccionada,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
        actualizarTarea,
        guardarTareaActual,
        modificarTarea,
        limpiarTareas,
      }}
    >
      {props.children}
    </TareaContext.Provider>
  );
};

export default TareaState;
