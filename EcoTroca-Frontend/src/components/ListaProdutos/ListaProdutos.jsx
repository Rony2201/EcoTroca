import { useState, useEffect, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./ListaProdutos.module.css";
import Footer from "../Footer/Footer";
import { AuthContext } from "../../context/authHandler.jsx";
import { useNavigate } from "react-router";
import { getAllProducts } from "../../services/productsService";
import { enviarProposta } from "../../services/enviarProposta";

function ListaProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [descricaoProposta, setDescricaoProposta] = useState("");
  const [busca, setBusca] = useState("");
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const data = await getAllProducts();
        // Filtra os produtos para não exibir os do próprio usuário
        const produtosDeOutros = user
          ? data.products.filter((p) => p.ownerId !== user.id)
          : data.products;
        setProdutos(produtosDeOutros);
      } catch (error) {
        console.error("Erro ao buscar produtos da API:", error);
      }
    };

    fetchProdutos();
  }, [user]); // Adiciona user como dependência para refiltrar no login/logout

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

  const handleEnviarProposta = async () => {
    if (!descricaoProposta || !produtoSelecionado || !user) return;

    try {
      await enviarProposta({
        proposerId: user.id,
        productId: produtoSelecionado.id_product,
        mensagem: descricaoProposta,
      });
      alert("Proposta enviada com sucesso!");
      handleFecharModal();
    } catch (error) {
      alert("Erro ao enviar proposta!");
      console.error(error);
    }
  };

  const produtosFiltrados = produtos.filter((produto) =>
    (produto?.title ?? "").toLowerCase().includes(busca.toLowerCase())
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
            style={{ maxWidth: "300px" }}
          />
        </div>

        <div className="row mt-4">
          {produtosFiltrados.length > 0 ? (
            produtosFiltrados.map((produto) => (
              <div className="col-md-4 mb-3" key={produto.id_product}>
                <div className={`card ${styles["card-custom"]}`}>
                  <img
                    src={produto.imageUrl || "https://via.placeholder.com/150"}
                    className={`card-img-top ${styles["card-img-top"]}`}
                    alt={produto.title}
                    onClick={() => handleRouter(produto.id_product)}
                  />
                  <div className={`card-body ${styles["card-body"]}`}>
                    <h3 className="card-title">{produto.title}</h3>
                    <p className="card-text">
                      <strong>Descrição:</strong> {produto.description}
                    </p>
                    <p className="card-text">
                      <strong>Condição:</strong> {produto.condition}
                    </p>
                    <p className="card-text">
                      <strong>Status:</strong> {produto.status}
                    </p>
                    <p className="card-text">
                      <strong>Localização:</strong> {produto.district},{" "}
                      {produto.city}
                    </p>
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
            <div
              className="modal fade show"
              style={{ display: "block" }}
              tabIndex="-1"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">
                      Propor Troca para {produtoSelecionado.title}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={handleFecharModal}
                    ></button>
                  </div>

                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">
                        Descrição da proposta:
                      </label>
                      <textarea
                        className="form-control"
                        value={descricaoProposta}
                        onChange={(e) => setDescricaoProposta(e.target.value)}
                        rows="4"
                      />
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleFecharModal}
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleEnviarProposta}
                    >
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
