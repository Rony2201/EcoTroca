import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import CadastroProduto from './pages/CadastroProduto';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/cadastro" element={<CadastroProduto />} />
      </Routes>
    </Router>
  );
}

export default App;
