import React, { } from "react";
import { Route, Navigate, } from "react-router-dom";

import firebase from "../../firebase";

// const authContext = useContext(AuthContext);
// const { unsuscribe, usuario, autenticado } = authContext;

firebase.auth.onAuthStateChanged(user => {
  if(user) {
      localStorage.setItem('token', "1") 
  } else {localStorage.removeItem('token')}
})
 
const RutaPrivada = ({
  component: Component,
  path,
  redirect,
  isAuth,
  ...props
}) => {


  if(!localStorage.getItem("token")) {
    return <Navigate to="/"/>
   }

  return <Route {...props}  component={<Component {...props}/> } />;
};

export default RutaPrivada;
