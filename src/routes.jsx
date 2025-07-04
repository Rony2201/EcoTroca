import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Perfil from "./pages/Perfil"
import Header from "./components/Header/Header";
import About from "./pages/About.jsx";
import AuthProvider from "./context/authHandler.jsx";

function AppRoutes() {
  return (
 
    <BrowserRouter>
      <AuthProvider>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/perfil" element={<Perfil />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
    </AuthProvider>
    </BrowserRouter>

  );
}

export default AppRoutes;
