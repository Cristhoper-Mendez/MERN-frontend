import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alertas/alertasContext";
import AuthContext from "../../context/autenticacion/authContext";

const Login = (props) => {
  //extraer valores del context
  const alertaContext = useContext(AlertaContext);
  const { alerta, mostrarAlerta } = alertaContext;

  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, iniciarSesion } = authContext;

  //en caso de que el password o usuario no existe
  useEffect(() => {
    if(autenticado){
        props.history.push('/proyectos');
    }

    if(mensaje){
        mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    // eslint-disable-next-line
}, [mensaje, autenticado, props.history]);


  //state iniciar sesion
  const [usuario, guardarUsuario] = useState({
    email: "",
    password: "",
  });

  //extraer de usuario
  const { email, password } = usuario;

  const onChange = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  //cuando usuario inicia sesion
  const onSubmit = (e) => {
    e.preventDefault();

    // validacion de campos vacios
    if (email.trim() === "" || password.trim() === "") {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
      return;
    }

    //pasarlo al action
    iniciarSesion({
        email,
        password
    });
  };

  return (
    <div className="form-usuario">
      {alerta 
      ? 
        (
            <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
        ) 
      : null}

      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesion</h1>

        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu password"
              value={password}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Iniciar Sesion"
            />
          </div>
        </form>

        <Link to={"/nueva-cuenta"} className="enlace-cuenta">
          Obtener Cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;
