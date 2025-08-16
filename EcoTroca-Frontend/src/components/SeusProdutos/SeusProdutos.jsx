import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import produtos from '../../database/produtos';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './SeusProdutos.module.css';
import { AuthContext } from '../../context/authHandler';
import { PropostaContext } from '../../context/PropostaContext';

function SeusProdutos() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { propostas } = useContext(PropostaContext);

  const [busca, setBusca] = useState("");
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const produtosDoUsuario = produtos
    .filter(produto => produto.idDono === user?.id)
    .reverse();

  const produtosFiltrados = produtosDoUsuario.filter(produto =>
    produto.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const handleCadastro = () => {
    navigate('/cadastro');
  };

  const abrirModal = (produto) => {
    setProdutoSelecionado(produto);
  };

  const fecharModal = () => {
    setProdutoSelecionado(null);
  };

  const propostasDoProduto = produtoSelecionado
    ? propostas.filter(p => p.idProdutoDestino === produtoSelecionado.id)
    : [];

  return (
    <div className="container mt-4">
      <div className={styles.container_h2}>
        <h2>{user?.nome} - Seus Produtos</h2>
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
                  <button className="btn btn-primary">Editar Produto</button>

                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Você ainda não cadastrou produtos.</p>
        )}
      </div>

      {/* Modal de propostas */}
      {produtoSelecionado && (
        <>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">

                <div className="modal-header">
                  <h5 className="modal-title">Propostas recebidas para: {produtoSelecionado.nome}</h5>
                  <button type="button" className="btn-close" onClick={fecharModal}></button>
                </div>

                <div className="modal-body">
                  {propostasDoProduto.length > 0 ? (
                    propostasDoProduto.map((proposta, index) => (
                      <div key={index} className="mb-3 border p-3 rounded">
                        <strong>Descrição:</strong> {proposta.descricao}
                      </div>
                    ))
                  ) : (
                    <p>Nenhuma proposta recebida para este produto.</p>
                  )}
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={fecharModal}>
                    Fechar
                  </button>
                </div>

              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={fecharModal}></div>
        </>
      )}
    </div>
  );
}

export default SeusProdutos;