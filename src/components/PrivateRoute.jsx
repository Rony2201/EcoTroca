import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authHandler";

function PrivateRoute({ children }) {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn ? children : (
    <div className="container d-flex flex-column justify-content-center align-items-center text-center" style={{ height: '80vh' }}>
      <h2 className="mb-3">Acesso Restrito</h2>
      <p>Você precisa estar logado para acessar esta página.</p>
      <Link to="/login" className="btn btn-primary">
        Fazer Login
      </Link>
    </div>
  );
}

export default PrivateRoute;
