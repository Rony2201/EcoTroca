import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import Logo from '../../assets/logoeco.png'
import { AuthContext} from '../../context/authHandler'
import { useContext, useState } from "react"; // Importe useState
import useWindowSize from '../../hooks/useWindowSize';

function Header() {
  const { handleLogout } = useContext(AuthContext);
  const { isLoggedIn } = useContext(AuthContext);
  const { width } = useWindowSize();
  const isMobile = width <= 768 ? true : false;

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      {!isMobile ? (
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
                <span className={`btn btn-outline-success ${styles.categories}`}>Perfil</span>
              </Link>
              <Link to="/about">
                <span className={`btn btn-outline-success ${styles.categories}`}>Sobre</span>
              </Link>
              {isLoggedIn ? (
                <span onClick={handleLogout} className={`btn btn-outline-success ${styles.loginButton}`}>Sair</span>
              ) : (
                <Link to="/login">
                  <span className={`btn btn-outline-success ${styles.loginButton}`}>Login</span>
                </Link>
              )}
            </form>
          </div>
        </nav>
      ) : (
        <nav className={styles.mobileNavbar}>
          <div className={styles.mobileHeader}>
            <Link className={styles.decoration} to="/">
              <img src={Logo} alt="" width={80}/>
              <span className={styles.mobileBrand}>EcoTroca</span>
            </Link>
            <div className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`} onClick={toggleMenu}>
              <div className={styles.bar}></div>
              <div className={styles.bar}></div>
              <div className={styles.bar}></div>
            </div>
          </div>
          {menuOpen && (
            <div className={styles.mobileMenu}>
              <Link to="/" onClick={toggleMenu} className={styles.noDecoration}>
                <span className={styles.mobileMenuItem}>Home</span>
              </Link>
              <Link to="/todosprodutos" onClick={toggleMenu} className={styles.noDecoration}>
                <span className={styles.mobileMenuItem}>Todos Produtos</span>
              </Link>
              <Link to="/perfil" onClick={toggleMenu} className={styles.noDecoration}>
                <span className={styles.mobileMenuItem}>Perfil</span>
              </Link>
              <Link to="/about" onClick={toggleMenu} className={styles.noDecoration}>
                <span className={styles.mobileMenuItem}>Sobre</span>
              </Link>
              {isLoggedIn ? (
                <span onClick={() => { handleLogout(); toggleMenu(); }} ><p className={styles.logout}>Sair</p></span>
              ) : (
                <Link to="/login" onClick={toggleMenu}>
                  <span className={styles.mobileMenuItem}>Login</span>
                </Link>
              )}
            </div>
          )}
        </nav>
      )}
    </>
  );
}

export default Header;