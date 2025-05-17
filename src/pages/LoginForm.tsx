import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

import "../styles/loginform.scss";
import { useLogin } from "../hooks/useLogin";
interface LoginFormInputs {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const navigate = useNavigate();
  const { loginUser } = useLogin();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const { user } = await loginUser(data.email, data.password);
      console.log("Usuario autenticado:", user);
      navigate("/admin");
    } catch (error: any) {
      alert(error.message); 
    }
  };

  return (
    <section className="loginform__container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="loginform__form"
        noValidate
      >
        <h2>Iniciar Sesión</h2>
        <div className="loginform__field">
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "El correo es obligatorio",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Correo inválido",
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        {/* Contraseña */}
        <div className="loginform__field">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "La contraseña es obligatoria",
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        {/* Link para registrarse */}
        <div className="loginform__link">
          <p>
            ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
          </p>
        </div>

        <button type="submit" className="loginform__button">
          Iniciar sesión
        </button>
      </form>
    </section>
  );
};
