import { NavLink } from "react-router-dom";

import { useAuthentication } from "../hooks/useAuthentication";
import { useAuthValue } from "../context/AuthContext";

import styles from "./Navbar.module.css";

const Navbar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.logo}>
        Mini <span>Blog</span>
      </NavLink>
      <ul className={styles.list}>
        <li className={styles.item}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Home
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink
            to="/About"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Sobre
          </NavLink>
        </li>
        {!user && (
          <>
            <li className={styles.item}>
              <NavLink
                to="/Register"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Registrar
              </NavLink>
            </li>
            <li className={styles.item}>
              <NavLink
                to="/Login"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Login
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li className={styles.item}>
              <NavLink
                to="/posts/create"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Novo post
              </NavLink>
            </li>
            <li className={styles.item}>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Dashboard
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <li>
            <button onClick={logout}>Sair</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
