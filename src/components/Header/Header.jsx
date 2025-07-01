import styles from "./Header.module.css"
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <Link className={styles.decoration} to="/">
          <span className="navbar-brand">EcoTroca</span>
        </Link>
        <form className="d-flex" role="search">
          <Link to="/">
            <span className={`btn btn-outline-success ${styles.categories}`}>
              Home
            </span>
          </Link>
          <Link to="/perfil">
            <span
              href="#"
              className={`btn btn-outline-success ${styles.categories}`}
            >
              Perfil
            </span>
          </Link>
          <Link to="/sobre">
            <span className={`btn btn-outline-success ${styles.categories}`}>
              Sobre
            </span>
          </Link>
          <Link to="/login">
            <span className={`btn btn-outline-success ${styles.loginButton}`}>
              Login
            </span>
          </Link>
        </form>
      </div>
    </nav>
  );
}

export default Header;
