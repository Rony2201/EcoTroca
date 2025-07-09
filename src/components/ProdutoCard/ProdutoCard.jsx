import styles from "./ProdutoCard.module.css";

function ProdutoCard({ produto }) {
    if (!produto) return null;
    return (
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
            </div>
        </div>
    );
}

export default ProdutoCard;