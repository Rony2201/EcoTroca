import produtos from '../database/produtos';
import 'bootstrap/dist/css/bootstrap.min.css';
import users from '../database/users';

function ListaProdutos() {
  return (
    <div className="container mt-4">
      <h2>Lista de Produtos</h2>
      <div className="row">
        {produtos.map(produto => (
          <div className="col-md-4 mb-3" key={produto.id}>
            <div className="card">
              <img
                src={produto.imgURL}
                className="card-img-top"
                alt={produto.nome}
              />
              <div className="card-body">
                <h3 className="card-title">{produto.nome}</h3>
                <p className="card-text">{produto.descricao}</p>
                <p className="card-text">{produto.loca}</p>
                <button className="btn btn-primary">Propor Troca</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaProdutos