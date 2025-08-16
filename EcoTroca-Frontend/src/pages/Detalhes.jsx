import { useParams } from 'react-router-dom';
import produtos from '../database/produtos';
import styles from '../components/ListaProdutos/ListaProdutos.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Detalhes() {
  const { id } = useParams();
  const produto = produtos.find(p => p.id.toString() === id);

  if (!produto) {
    return <p className="text-center mt-5">Produto não encontrado.</p>;
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card shadow-lg" style={{ width: '100%', maxWidth: '500px' }}>
        <img
          src={produto.imgURL}
          className="card-img-top"
          alt={produto.nome}
          style={{ objectFit: 'cover', height: '300px' }}
        />
        <div className={`card-body text-center ${styles['card-body']}`}>
          <h5 className="card-title fw-bold">{produto.nome}</h5>
          <h6 className="text-muted mb-2">Dono: {produto.nome_dono}</h6>
          <p className="card-text">{produto.descricao}</p>
          <p className="text-secondary"><i className="bi bi-geo-alt-fill"></i> {produto.loca}</p>
          <button className="btn btn-primary">
            Propor Troca
          </button>
        </div>
      </div>
    </div>
  );
}

export default Detalhes;
