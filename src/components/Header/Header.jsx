import styles from "./Header.module.css"
import { Link } from "react-router-dom";
import Logo from '../../assets/logoeco.png'
import { AuthContext} from '../../context/authHandler'
import { useContext } from "react";

function Header() {

  const { handleLogout } = useContext(AuthContext);
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <Link className={styles.decoration} to="/">
        <img src={Logo} alt="" width={80}/>
        <span className="navbar-brand">EcoTroca</span>
        </Link>
        <form className="d-flex" role="search">
          <Link to="/">
          <span className={`btn btn-outline-success ${styles.categories}`}>Home</span>
          </Link>
          <Link to="/todosprodutos">
          <span className={`btn btn-outline-success ${styles.categories}`}>Todos Produtos</span>
          </Link>
          <Link to="/perfil">
          <span href="#" className={`btn btn-outline-success ${styles.categories}`}>Perfil</span>
          </Link>
          <Link to="/about">
          <span className={`btn btn-outline-success ${styles.categories}`}>Sobre</span>
          </Link>
          {isLoggedIn? (
          <span onClick={handleLogout} className={`btn btn-outline-success ${styles.loginButton}`}>Sair</span>
            ):(
          <Link to="/login">
            <span className={`btn btn-outline-success ${styles.loginButton}`}>Login</span>
          </Link>
            )}
        </form>
      </div>
    </nav>
  );
}

export default Header;
