import { useAuth } from "../context/AuthContext";
import iconBack from "../assets/salida.png";
import { useNavigate } from "react-router";
export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <header className="dashboard__header">
      <h1 className="dashboard__title">Dashboard</h1>
      <div className="dashboard__user">
        <p className="dashboard__fullname">
          {user?.firstName + " " + user?.lastName}
        </p>
        <div className="dashboard__avatar">
          <img
            src="https://avatars.githubusercontent.com/u/12345678?v=4"
            alt={user?.firstName}
            className="dashboard__avatar-image"
          />
        </div>
        <div
          className="dashboard__logout"
          title="Cerrar Sesión"
          onClick={handleLogout}
        >
          <img src={iconBack} alt="logout" />
        </div>
      </div>
    </header>
  );
};
