import { useState } from 'react';
import produtos from '../../database/produtos';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './ListaProdutos.module.css';

function ListaProdutos() {
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [descricaoProposta, setDescricaoProposta] = useState("");

  const handleAbrirModal = (produto) => {
    setProdutoSelecionado(produto);
  };

  const handleFecharModal = () => {
    setProdutoSelecionado(null);
    setDescricaoProposta("");
  };

  const handleEnviarProposta = () => {
    alert(`Proposta para trocar por: ${produtoSelecionado.nome}\nDescrição: ${descricaoProposta}`);
    handleFecharModal();
  };

  return (
    <div className="container mt-4">
      <div className={styles.container_h2}>
        <h2>Lista de Produtos</h2>
      </div>
      <div className="row">
        {produtos.map(produto => (
          <div className="col-md-4 mb-3" key={produto.id}>
            <div className={`card ${styles['card-custom']}`}>
              <img
                src={produto.imgURL}
                className={`card-img-top ${styles['card-img-top']}`}
                alt={produto.nome}
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
        ))}
      </div>

      {/* Modal */}
      {produtoSelecionado && (
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
      )}
      {produtoSelecionado && (
        <div
          className="modal-backdrop fade show"
          onClick={handleFecharModal}
        ></div>
      )}
    </div>
  );
}

export default ListaProdutos;
