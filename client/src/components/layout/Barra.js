import React, { useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import tareaContext from "../../context/tareas/tareaContext";
import proyectoContext from "../../context/proyectos/proyectoContext";

const Barra = () => {
  const authContext = useContext(AuthContext);
  const { usuario, logOut } = authContext;

  const tareasContext = useContext(tareaContext);
  const { limpiarTareas } = tareasContext;

  const proyectosContext = useContext(proyectoContext);
  const { limpiarProyectos } = proyectosContext;

  const cerrarSesion = () => {
    logOut();
    limpiarTareas();
    limpiarProyectos();
  };

  return (
    <header className="app-header">
      <p className="nombre-usuario">
        Hola <span>{usuario}</span>
      </p>
      <nav className="nav-principal">
        <a href="#!" onClick={cerrarSesion}>
          Cerrar Sesión
        </a>
      </nav>
    </header>
  );
};

export default Barra;
