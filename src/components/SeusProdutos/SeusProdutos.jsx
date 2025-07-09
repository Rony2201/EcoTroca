import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import produtos from '../../database/produtos';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './SeusProdutos.module.css';
import { AuthContext } from '../../context/authHandler';

function SeusProdutos({ produto }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [busca, setBusca] = useState("");

  // Filtra produtos do usuário logado
  const produtosDoUsuario = produtos
    .filter(produto => produto.idDono === user?.id)
    .reverse();

  // Aplica filtro de busca
  const produtosFiltrados = produtosDoUsuario.filter(produto =>
    produto.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const handleCadastro = () => {
    navigate('/cadastro');
  };

  return (
    <div className="container mt-4">
      <div className={styles.container_h2}>
        <h2>{user.nome} - Seus Produtos</h2>
        <div className={styles.container_divs}>
          <input
            type="search"
            placeholder="Buscar produto..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
            className="form-control me-2"
            style={{ maxWidth: '300px' }}
          />
          <button type="button" className="btn btn-success" onClick={handleCadastro}>
            Cadastrar
          </button>
        </div>
      </div>

      <div className="row">
        {produtosFiltrados.length > 0 ? (
          produtosFiltrados.map(produto => (
            <div className="col-md-4 mb-3" key={produto.id}>
              <div className={`card ${styles['card-custom']}`}>
                <img
                  src={produto.imgURL}
                  className={`card-img-top ${styles['card-img-top']}`}
                  alt={produto.nome}
                />
                <div className={`card-body ${styles['card-body']}`}>
                  <h3 className="card-title">{produto.nome}</h3>
                  <p className="card-text">{produto.descricao}</p>
                  <p className="card-text">{produto.loca}</p>
                  <button className="btn btn-primary">Propor Troca</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Você ainda não cadastrou produtos.</p>
        )}
      </div>
    </div>
  );
}

export default SeusProdutos;
