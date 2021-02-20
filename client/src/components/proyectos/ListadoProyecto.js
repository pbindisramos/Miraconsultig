import React, { useContext, useEffect } from "react";
import Proyecto from "./Proyecto";
import proyectoContext from "../../context/proyectos/proyectoContext";
import { FirebaseContext } from "../../firebase";

const ListadoProyectos = () => {
  //extraer proyectos del context
  const proyectosContext = useContext(proyectoContext);
  const { proyectos, obtenerProyectos } = proyectosContext;

  const { usuario } = useContext(FirebaseContext);

  //const authContext = useContext(AuthContext);
  //const { usuario } = authContext;

  //useeffect
  useEffect(() => {
    obtenerProyectos(usuario);
  }, [usuario]);

  //revisar si es que hay algo
  if (proyectos.length === 0) return <p>No hay proyectos, crea uno</p>;

  return (
    <ul className="listado-proyectos">
      {proyectos.map((proyecto) => (
        <Proyecto key={proyecto.id} proyecto={proyecto} />
      ))}
    </ul>
  );
};

export default ListadoProyectos;
