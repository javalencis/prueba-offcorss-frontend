import { useForm } from "react-hook-form";
import "../styles/registerform.scss";
import { useMutation, useQuery } from "@apollo/client";
import { REGISTER_USER } from "../clients/query";
import { useNavigate } from "react-router";
type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
  confirmPassword: string;
};

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const [registerUser] = useMutation(REGISTER_USER);
  const navigate = useNavigate()
  const onSubmit = async (data: FormData) => {
    console.log("Datos del formulario:", data);
    try {
      await registerUser({
        variables: {
          input: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            username: data.username,
          },
        },
      });
      navigate("/login");
    } catch (err) {
      console.error("Error en el registro:", err);
    }
  };

  const password = watch("password");

  return (
    <section className="registerform__container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="registerform__form"
        noValidate
      >
        <h2>Registrate</h2>
        <div className="registerform__field">
          <label>Nombre</label>
          <input
            type="text"
            {...register("firstName", {
              required: "El nombre es obligatorio",
              pattern: {
                value: /^[a-zA-ZÀ-ÿ\s]+$/,
                message: "Solo se permiten letras",
              },
            })}
          />
          {errors.firstName && (
            <p className="registerform__error">{errors.firstName.message}</p>
          )}
        </div>

        <div className="registerform__field">
          <label>Apellido</label>
          <input
            type="text"
            {...register("lastName", {
              required: "El apellido es obligatorio",
              pattern: {
                value: /^[a-zA-ZÀ-ÿ\s]+$/,
                message: "Solo se permiten letras",
              },
            })}
          />
          {errors.lastName && (
            <p className="registerform__error">{errors.lastName.message}</p>
          )}
        </div>
        <div className="registerform__field">
          <label htmlFor="username">Nombre de usuario</label>
          <input
            id="username"
            {...register("username", {
              required: "El nombre de usuario es obligatorio",
              minLength: {
                value: 4,
                message: "Debe tener al menos 4 caracteres",
              },
              pattern: {
                value: /^[a-zA-Z0-9_]+$/,
                message: "Solo se permiten letras, números y guiones bajos",
              },
            })}
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div className="registerform__field">
          <label>Correo electrónico</label>
          <input
            type="email"
            {...register("email", {
              required: "El correo es obligatorio",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Correo inválido",
              },
            })}
          />
          {errors.email && (
            <p className="registerform__error">{errors.email.message}</p>
          )}
        </div>

        <div className="registerform__field">
          <label>Contraseña</label>
          <input
            type="password"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 8,
                message: "Debe tener al menos 8 caracteres",
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                message:
                  "Debe incluir mayúsculas, minúsculas y al menos un número",
              },
            })}
          />
          {errors.password && (
            <p className="registerform__error">{errors.password.message}</p>
          )}
        </div>

        <div className="registerform__field">
          <label>Confirmar contraseña</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Confirma la contraseña",
              validate: (value) =>
                value === password || "Las contraseñas no coinciden",
            })}
          />
          {errors.confirmPassword && (
            <p className="registerform__error">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button type="submit" className="registerform__button">
          Registrarse
        </button>
      </form>
    </section>
  );
};
