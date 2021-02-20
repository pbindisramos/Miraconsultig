import React, {useContext} from "react";
import { Navigate, Route } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import Barra from "../layout/Barra";
import FormTarea from "../tareas/FormTarea";
import ListadoTareas from "../tareas/ListadoTareas";
import AuthContext from "../../context/auth/authContext";

const Proyectos = () => {

  const authContext = useContext(AuthContext);
  const { usuario } = authContext;


  // if(usuario == null) {
  //   return <Navigate to="/"/>
  // } 

  return (
    <div className="contenedor-app">
      <Sidebar />
      <div className="seccion-principal">
        <Barra />
        <main>
          <FormTarea />
          <div className="contenedor-tareas"></div>
          <ListadoTareas />
        </main>
      </div>
    </div>
  );
};

export default Proyectos;
