import produtos from '../../database/produtos';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './SeusProdutos.module.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/authHandler';

function SeusProdutos() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleCadastro = () => {
    navigate('/cadastro');
  };

  // Filtra os produtos com base no id do usuário logado
  const produtosDoUsuario = produtos.filter(produto => produto.idDono === user?.id);

  return (
    <div className="container mt-4">
      <div className={styles.container_h2}>
        <h2>Seus Produtos</h2>
        <div className={styles.container_divs}>
          <input type="search" placeholder="Buscar produto..." />
          <button type="button" className="btn btn-success" onClick={handleCadastro}>
            Cadastrar
          </button>
        </div>
      </div>

      <div className="row">
        {produtosDoUsuario.length > 0 ? (
          produtosDoUsuario.map(produto => (
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
