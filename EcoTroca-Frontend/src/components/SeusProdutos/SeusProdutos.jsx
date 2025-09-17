import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./SeusProdutos.module.css";
import { AuthContext } from "../../context/authHandler.jsx";
import { PropostaContext } from "../../context/PropostaContext";
import PropostasEnviadas from "../../PropostasEnviadas.jsx";
import EditarProdutoForm from "../EditarProdutoForm/EditarProdutoForm.jsx";

function SeusProdutos() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useContext(AuthContext); // Pega o estado 'user' e renomeia 'loading' para 'authLoading'
  const { propostas } = useContext(PropostaContext);

  // Gerenciamento fos produtos da API, carregamento e erro
  const [produtosDoUsuario, setProdutosDoUsuario] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [busca, setBusca] = useState("");
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [produtoParaEditar, setProdutoParaEditar] = useState(null);

  // useEffect para buscar os produtos do usuário
  useEffect(() => {
    // Função assíncrona para buscar os produtos
    const fetchUserProducts = async () => {
      // Verifica se o usuário e o id existem antes de fazer a chamada
      if (user && user.id) {
        try {
          const token = localStorage.getItem("token");
          const response = await api.get(`/products/user/${user.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setProdutosDoUsuario(response.data);
          setIsLoading(false);
        } catch (err) {
          setError("Erro ao carregar seus produtos.");
          setIsLoading(false);
          console.error(err);
        }
      }
    };

    // Só faz a busca se o contexto de autenticação já tiver carregado e houver um usuário
    if (!authLoading && user) {
      fetchUserProducts();
    }
  }, [user, authLoading]); // A dependência [user] e [authLoading] garante que a busca seja feita quando o usuário for carregado

  const produtosFiltrados = produtosDoUsuario.filter((produto) =>
    produto.title.toLowerCase().includes(busca.toLowerCase())
  );

  const handleCadastro = () => {
    navigate("/cadastro");
  };

  const abrirModal = (produto) => {
    setProdutoSelecionado(produto);
  };

  const fecharModal = () => {
    setProdutoSelecionado(null);
  };

  const abrirModalEdicao = (produto) => {
    setProdutoParaEditar(produto);
  };

  const fecharModalEdicao = () => {
    setProdutoParaEditar(null);
  };

  const handleSaveEdit = (updatedProduct) => {
    // Atualiza a lista de produtos no estado local para refletir a mudança instantaneamente
    setProdutosDoUsuario(produtosDoUsuario.map(p =>
      p.id_product === updatedProduct.product.id_product ? updatedProduct.product : p
    ));
    fecharModalEdicao(); // Fecha o modal
  };

  const propostasDoProduto = produtoSelecionado
    ? propostas.filter((p) => p.productId === produtoSelecionado.id_product)
    : [];

  return (
    <div className="container mt-4">
      <div className={styles.container_h2}>
        <h2>Olá, {user?.username} - Seus Produtos</h2>
        <div className={styles.container_divs}>
          <input
            type="search"
            placeholder="Buscar produto..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="form-control me-2"
            style={{ maxWidth: "300px" }}
          />
          <button
            type="button"
            className="btn btn-success"
            onClick={handleCadastro}
          >
            Cadastrar
          </button>
        </div>
      </div>

      <div className="row">
        {isLoading && <p>Carregando seus produtos...</p>}
        {error && <p className="text-danger">{error}</p>}

        {!isLoading &&
          !error &&
          (produtosFiltrados.length > 0 ? (
            produtosFiltrados.map((produto) => (
              <div className="col-md-4 mb-3" key={produto.id_product}>
                <div className={`card ${styles["card-custom"]}`}>
                  <img
                    src={produto.imageUrl}
                    className={`card-img-top ${styles["card-img-top"]}`}
                    alt={produto.title}
                  />
                  <div className={`card-body ${styles["card-body"]}`}>
                    <h3 className="card-title">{produto.title}</h3>
                    <p className="card-text">{produto.description}</p>
                    <p className="card-text">
                      {produto.city} - {produto.district}
                    </p>
                    <div className={styles.buttonGroup}>
                      <button
                        className={styles.editButton}
                        onClick={() => abrirModalEdicao(produto)}
                      >
                        Editar Produto
                      </button>
                      <button
                        className={styles.propostasButton}
                        onClick={() => abrirModal(produto)}
                      >
                        Ver Propostas
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Você ainda não cadastrou produtos.</p>
          ))}
      </div>

      {/* Modal de propostas */}
      {produtoSelecionado && (
        <>
          <div
            className="modal fade show"
            style={{ display: "block" }}
            tabIndex="-1"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    Propostas recebidas para: {produtoSelecionado.title}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={fecharModal}
                  ></button>
                </div>

                <div className="modal-body">
                  {propostasDoProduto.length > 0 ? (
                    propostasDoProduto.map((proposta) => (
                      <div
                        key={proposta.id}
                        className="mb-3 border p-3 rounded"
                      >
                        <h6>
                          Proposta de:{" "}
                          {proposta.proposer?.username ||
                            "Usuário desconhecido"}
                        </h6>
                        <p>
                          <strong>Status:</strong> {proposta.status}
                        </p>
                        <hr />
                        {proposta.messages && proposta.messages.length > 0 ? (
                          proposta.messages.map((msg) => (
                            <div key={msg.id} className="mb-2">
                              <p className="mb-0">
                                <strong>{msg.author?.username}:</strong>{" "}
                                {msg.content}
                              </p>
                              <small className="text-muted">
                                {new Date(msg.sentAt).toLocaleString()}
                              </small>
                            </div>
                          ))
                        ) : (
                          <p>Nenhuma mensagem nesta proposta.</p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p>Nenhuma proposta recebida para este produto.</p>
                  )}
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={fecharModal}
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={fecharModal}></div>
        </>
      )}

      {produtoParaEditar && (
        <EditarProdutoForm
          product={produtoParaEditar}
          onSave={handleSaveEdit}
          onClose={fecharModalEdicao}
        />
      )}

      <hr className="my-5" />
      <PropostasEnviadas />
    </div>
  );
}

export default SeusProdutos;
