import { NavLink } from "react-router";
import '../styles/sidemenu.scss'
export const SideMenu = () => {
  return (
    <aside className="lateralmenu">
      <nav className="lateralmenu__nav">
        <ul className="lateralmenu__items">
          <li className="lateralmenu__item">
            <NavLink to="/admin" end>Productos</NavLink>
          </li>
          <li className="lateralmenu__item">
            <NavLink to="/admin/profile">Perfil</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
