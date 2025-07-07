import styles from './Cadastrar.module.css';

function Cadastrar() {
  return (
    <div className={`container mt-5 p-4 shadow ${styles.formWrapper}`}>
      <h2 className="mb-4 text-center">Cadastrar Produto</h2>

      <div className="mb-3 row">
        <label htmlFor="nomeProduto" className="col-sm-2 col-form-label">Nome</label>
        <div className="col-sm-10">
          <input type="text" className="form-control" id="nomeProduto" placeholder="Digite o nome do produto" />
        </div>
      </div>

      <div className="mb-3 row">
        <label htmlFor="descricaoProduto" className="col-sm-2 col-form-label">Descrição</label>
        <div className="col-sm-10">
          <textarea className="form-control" id="descricaoProduto" placeholder="Digite a descrição" rows="3"></textarea>
        </div>
      </div>

      <div className="mb-3 row">
        <label htmlFor="localProduto" className="col-sm-2 col-form-label">Localização</label>
        <div className="col-sm-10">
          <input type="text" className="form-control" id="localProduto" placeholder="Digite a localização" />
        </div>
      </div>

      <div className="mb-3 row">
        <label htmlFor="imagemProduto" className="col-sm-2 col-form-label">Imagem</label>
        <div className="col-sm-10">
          <input type="file" className="form-control" id="imagemProduto" />
        </div>
      </div>

      <div className="text-center">
        <button className="btn btn-primary">Cadastrar Produto</button>
      </div>
    </div>
  );
}

export default Cadastrar;
