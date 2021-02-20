import React, { Fragment, useContext } from "react";
import Tarea from "./Tarea";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";

const ListadoTareas = () => {
  //obtener state del formulario
  const proyectosContext = useContext(proyectoContext);
  const { proyecto, eliminarProyecto } = proyectosContext;

  //obtener funcion del context
  const tareasContext = useContext(tareaContext);
  const { tareasproyecto } = tareasContext;

  //
  if (!proyecto) return <h2>Selecciona un proyecto</h2>;
  //destructuring
  const [proyectoActual] = proyecto;

  const onClickEliminar = () => {
    eliminarProyecto(proyectoActual.id);
  };
  return (
    <Fragment>
      <h2>Proyecto: {proyectoActual.nombre} </h2>

      <ul className="listado-tareas">
        {tareasproyecto.length === 0 ? (
          <li className="tarea">
            <p>No hay tareas</p>
          </li>
        ) : (
          tareasproyecto.map((tarea) => <Tarea key={tarea.id} tarea={tarea} />)
        )}
      </ul>
      <button
        type="button"
        className="btn btn-primario"
        onClick={onClickEliminar}
      >
        Eliminar proyecto &times;{" "}
      </button>
    </Fragment>
  );
};

export default ListadoTareas;
