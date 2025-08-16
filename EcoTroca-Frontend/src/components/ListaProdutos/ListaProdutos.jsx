import { useState, useContext } from 'react';
import produtos from '../../database/produtos';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './ListaProdutos.module.css';
import Footer from '../Footer/Footer';
import { PropostaContext } from '../../context/PropostaContext';
import { AuthContext } from '../../context/authHandler';

import { useNavigate } from 'react-router';

function ListaProdutos() {
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [descricaoProposta, setDescricaoProposta] = useState("");
  const [busca, setBusca] = useState("");
  const navigate = useNavigate();

  const { adicionarProposta } = useContext(PropostaContext);
  const { user } = useContext(AuthContext);

  const handleAbrirModal = (produto) => {
    setProdutoSelecionado(produto);
  };

  const handleFecharModal = () => {
    setProdutoSelecionado(null);
    setDescricaoProposta("");
  };

  const handleRouter = (id) => {
  navigate(`/detalhes/${id}`);
};

  const handleEnviarProposta = () => {
    if (!descricaoProposta || !produtoSelecionado || !user) return;

    adicionarProposta({
      id: crypto.randomUUID(),
      idProdutoDestino: produtoSelecionado.id,
      idProponente: user.id,
      nomeProponente: user.nome,
      descricao: descricaoProposta
    });

    alert('Proposta enviada com sucesso!');
    handleFecharModal();
  };

  const produtosFiltrados = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div>
      <div className="container">
        <div className={styles.container_h2}>
          <h2>Lista de Produtos</h2>
          <input
            type="search"
            placeholder="Buscar produto..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="form-control mt-2"
            style={{ maxWidth: '300px' }}
          />
        </div>

        <div className="row mt-4">
          {produtosFiltrados.length > 0 ? (
            produtosFiltrados.map(produto => (
              <div className="col-md-4 mb-3" key={produto.id}>
                <div className={`card ${styles['card-custom']}`}>
                  <img
                    src={produto.imgURL}
                    className={`card-img-top ${styles['card-img-top']}`}
                    alt={produto.nome}
                    onClick={() => handleRouter(produto.id)}
                  />
                  <div className={`card-body ${styles['card-body']}`}>
                    <h1 className="card-title">{produto.nome_dono}</h1>
                    <h3 className="card-text">{produto.nome}</h3>
                    <p className="card-text">{produto.descricao}</p>
                    <p className="card-text">{produto.loca}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAbrirModal(produto)}
                    >
                      Propor Troca
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Nenhum produto encontrado.</p>
          )}
        </div>

        {produtoSelecionado && (
          <>
            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
              <div className="modal-dialog">
                <div className="modal-content">

                  <div className="modal-header">
                    <h5 className="modal-title">Propor Troca para {produtoSelecionado.nome}</h5>
                    <button type="button" className="btn-close" onClick={handleFecharModal}></button>
                  </div>

                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Descrição da proposta:</label>
                      <textarea
                        className="form-control"
                        value={descricaoProposta}
                        onChange={e => setDescricaoProposta(e.target.value)}
                        rows="4"
                      />
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleFecharModal}>
                      Cancelar
                    </button>
                    <button type="button" className="btn btn-primary" onClick={handleEnviarProposta}>
                      Enviar Proposta
                    </button>
                  </div>

                </div>
              </div>
            </div>
            <div
              className="modal-backdrop fade show"
              onClick={handleFecharModal}
            ></div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ListaProdutos;