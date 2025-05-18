import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import "../styles/profile.scss";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../clients/query";

type FormValues = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
};

export const Profile = () => {
  const { user, token, login } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [updateUserMutation] = useMutation(UPDATE_USER);
  console.log(
    "Componente Profile renderizado. isEditing:",
    isEditing,
    "Usuario:",
    user
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      username: user?.username || "",
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
    },
  });

  useEffect(() => {
    if (user) {
      console.log("Datos del usuario cambiaron, reseteando formulario.");
      reset({
        username: user.username || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
      });
    }
  }, [user, reset]);

  const handleEditClick = () => {
    console.log(
      "Botón 'Editar' clickeado. Estado actual de isEditing:",
      isEditing
    );
    setIsEditing(true);
    console.log(
      "Después de llamar a setIsEditing(true). Nuevo valor esperado de isEditing en el próximo render: true"
    );
  };

  const onSubmit = async (data: FormValues) => {
    console.log("Formulario enviado (onSubmit). Datos:", data); // Modificado en el paso anterior
    setIsEditing(false);
    try {
      const { data: updatedData } = await updateUserMutation({
        variables: {
          input: {
            username: data.username,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
          },
        },
      });

      if (updatedData) {
        login(token!, updatedData.updateUser);
        console.log(
          "Usuario actualizado correctamente:",
          updatedData.updateUser
        );
      }
    } catch (err) {
      console.error("Error al actualizar usuario:", err);
    }
  };

  return (
    <section className="dashboard__profile-container">
      <div className="dashboard__profile">
        <h3>Perfil</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="dashboard__profile-details"
        >
          {/* Username */}
          <div className="dashboard__profile-details-field">
            <p className="dashboard__profile-field-header">Usuario</p>
            <input
              {...register("username", { required: "Campo requerido" })}
              className="dashboard__profile-field-value"
              disabled={!isEditing}
            />
            {errors.username && (
              <span className="error-message">{errors.username.message}</span>
            )}
          </div>

          {/* Fecha de creación */}
          <div className="dashboard__profile-details-field">
            <p className="dashboard__profile-field-header">Fecha de Creación</p>
            <input
              value={
                user?.createdAt
                  ? new Date(Number(user.createdAt)).toLocaleDateString() // Convertir a número
                  : "No disponible"
              }
              disabled
              className="dashboard__profile-field-value"
            />
    
          </div>

          <div className="dashboard__profile-details-field">
            <p className="dashboard__profile-field-header">Nombre</p>
            <input
              {...register("firstName", { required: "El nombre es requerido" })}
              className="dashboard__profile-field-value"
              disabled={!isEditing}
            />
            {errors.firstName && (
              <span className="error-message">{errors.firstName.message}</span>
            )}
          </div>

          {/* Apellido */}
          <div className="dashboard__profile-details-field">
            <p className="dashboard__profile-field-header">Apellido</p>
            <input
              {...register("lastName", {
                required: "El apellido es requerido",
              })}
              className="dashboard__profile-field-value"
              disabled={!isEditing}
            />
            {errors.lastName && (
              <span className="error-message">{errors.lastName.message}</span>
            )}
          </div>

          {/* Email */}
          <div className="dashboard__profile-details-field">
            <p className="dashboard__profile-field-header">Email</p>
            <input
              {...register("email", {
                required: "El email es requerido",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email inválido",
                },
              })}
              className="dashboard__profile-field-value"
              disabled={!isEditing}
            />
            {errors.email && (
              <span className="error-message">{errors.email.message}</span>
            )}
          </div>

          {/* Botón */}
          <div style={{ marginTop: "1rem" }}>
            {isEditing ? (
              <button
                type="button"
                onClick={() => {
                  console.log(
                    "Botón 'Guardar' (type='button') clickeado manualmente."
                  );
                  handleSubmit(onSubmit)();
                }}
                className="dashboard__edit-btn"
              >
                Guardar
              </button>
            ) : (
              <button
                type="button"
                onClick={handleEditClick}
                className="dashboard__edit-btn"
              >
                Editar
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};
