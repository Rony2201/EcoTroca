import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil";
import Header from "./components/Header/Header";
import About from "./pages/About";
import CadastroProduto from "./pages/CadastroProduto";
import PrivateRoute from "./components/PrivateRoute";

function AppRoutes() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <Perfil />
            </PrivateRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/cadastro" element={<CadastroProduto />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
