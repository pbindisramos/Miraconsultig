import React, { useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContext";
import tareaContext from "../../context/tareas/tareaContext";
import AuthContext from "../../context/auth/authContext";

const Proyecto = ({ proyecto }) => {
  const proyectosContext = useContext(proyectoContext);
  const { proyectoActual } = proyectosContext;

  //obtener funcion del context
  const tareasContext = useContext(tareaContext);
  const { obtenerTareas } = tareasContext;

  const authContext = useContext(AuthContext);
  const { usuario } = authContext;

  //Funcion para agregar proyecto actual

  const seleccionarProyecto = (id) => {
    proyectoActual(id); //fijar un proyecto actual
    obtenerTareas(id); //filtrar tareas
  };
  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => seleccionarProyecto(proyecto.id)}
      >
        {proyecto.nombre}
      </button>
    </li>
  );
};

export default Proyecto;
