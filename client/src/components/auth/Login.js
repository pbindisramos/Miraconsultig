import React, { useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import AlertaContext from "../../context/alertas/alertaContext";
import logomira from "./logomira2.png"

const Login = () => {
  const alertaContext = useContext(AlertaContext);
  const { alerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { iniciarSesion } = authContext;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("el email no es valido")
        .required("El email es obligatorio"),
      password: Yup.string().required("La contraseña es obligatoria"),
    }),
    onSubmit: (usuario) => {
      iniciarSesion(usuario);
    },
  });

  return (
      
      <div className="form-usuario">
        <img src={logomira} alt="logomira" width="400" height="250" className="logo" />
        {alerta ? (
          <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
        ) : null}
        <div className="contenedor-form sombra-dark">
          <h1>Iniciar Sesión</h1>

          <form onSubmit={formik.handleSubmit}>
            <div className="campo-form">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Tu Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="alerta alerta-error">
                  <p>{formik.errors.email}</p>
                </div>
              ) : null}
            </div>
            <div className="campo-form">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Tu Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="alerta alerta-error">
                  <p>{formik.errors.password}</p>
                </div>
              ) : null}
            </div>
            <div className="campo-form">
              <input
                type="submit"
                className="btn btn-primario btn-block"
                value="Iniciar Sesión"
              />
            </div>
          </form>
        </div>
      </div>
    
    
    
  );
};

export default Login;
