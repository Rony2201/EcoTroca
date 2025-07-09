import { useState, useEffect } from 'react';
import styles from './Cadastrar.module.css';

function Cadastrar() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [imagem, setImagem] = useState(null);
  const [produtos, setProdutos] = useState([]); 


  useEffect(() => {
    const produtosSalvos = localStorage.getItem('produtos');
    if (produtosSalvos) {
      setProdutos(JSON.parse(produtosSalvos));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault(); 

    const novoProduto = {
      id: Date.now(),  // para gerar um ID único
      nome,
      descricao,
      localizacao,
      imagem: imagem ? imagem.name : null, 
    };

    const produtosAtualizados = [...produtos, novoProduto];
    setProdutos(produtosAtualizados);


    localStorage.setItem('produtos', JSON.stringify(produtosAtualizados));


    setNome('');
    setDescricao('');
    setLocalizacao('');
    setImagem(null);
  };

  return (
    <div className={`container mt-5 p-4 shadow ${styles.formWrapper}`}>
      <h2 className="mb-4 text-center">Cadastrar Produto</h2>

      <form onSubmit={handleSubmit}> 
        <div className="mb-3 row">
          <label htmlFor="nomeProduto" className="col-sm-2 col-form-label">Nome</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="nomeProduto"
              placeholder="Digite o nome do produto"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="descricaoProduto" className="col-sm-2 col-form-label">Descrição</label>
          <div className="col-sm-10">
            <textarea
              className="form-control"
              id="descricaoProduto"
              placeholder="Digite a descrição"
              rows="3"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="localProduto" className="col-sm-2 col-form-label">Localização</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="localProduto"
              placeholder="Digite a localização"
              value={localizacao}
              onChange={(e) => setLocalizacao(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="imagemProduto" className="col-sm-2 col-form-label">Imagem</label>
          <div className="col-sm-10">
            <input
              type="file"
              className="form-control"
              id="imagemProduto"
              onChange={(e) => setImagem(e.target.files[0])} 
            />
          </div>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary">Cadastrar Produto</button> 
        </div>
      </form>
    </div>
  );
}

export default Cadastrar;
