import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/productsService';
import styles from '../components/ListaProdutos/ListaProdutos.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Detalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduto(data.product);
        setError(null);
      } catch (err) {
        console.error("Erro ao buscar produto:", err);
        setError("Falha ao carregar os detalhes do produto.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduto();
    }
  }, [id]);

  if (loading) {
    return <p className="text-center mt-5">Carregando...</p>;
  }

  if (error) {
    return <p className="text-center mt-5 text-danger">{error}</p>;
  }

  if (!produto) {
    return <p className="text-center mt-5">Produto não encontrado.</p>;
  }

  return (
    <div className="container mt-5">
      <div className={`card shadow-lg mx-auto ${styles["card-custom"]}`} style={{ maxWidth: '600px' }}>
        <img src={produto.imageUrl || "https://via.placeholder.com/300"} className={`card-img-top ${styles["card-img-top"]}`} alt={produto.title} />
        <div className={`card-body ${styles["card-body"]}`}>
          <h3 className="card-title">{produto.title}</h3>
          <p className="card-text"><strong>Descrição:</strong> {produto.description}</p>
          <p className="card-text"><strong>Condição:</strong> {produto.condition}</p>
          <p className="card-text"><strong>Localização:</strong> {produto.district}, {produto.city}</p>
          <button className="btn btn-primary">
            Propor Troca
          </button>
        </div>
      </div>
    </div>
  );
}

export default Detalhes;
