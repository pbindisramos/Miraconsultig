import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Proyectos from "./components/proyectos/Proyectos";
import AuthState from "./context/auth/authState";
import ProyectoState from "./context/proyectos/proyectoState";
import TareaState from "./context/tareas/tareaState.js";
import AlertaState from "./context/alertas/alertaState";
import useAutenticacion from "./hooks/useAutenticacion";
import firebase, { FirebaseContext } from "./firebase";
import RutaPrivada from "./components/rutas/RutaPrivada";



function App() {
  const usuario = useAutenticacion();
  console.log(usuario);

  return (
    <FirebaseContext.Provider value={{ firebase, usuario }}>
      <AuthState>
        <ProyectoState>
          <TareaState>
            <AlertaState>
              <div>
                <Routes>
                  <Route path="/" element={<Login />} />
                  <RutaPrivada path="/proyectos" element={<Proyectos />} />
                </Routes>
              </div>
            </AlertaState>
          </TareaState>
        </ProyectoState>
      </AuthState>
    </FirebaseContext.Provider>
  );
}

export default App;
