import styles from './ProdutoCard.module.css';

function ProdutoCard({ produto }) {
  if (!produto) return null;

  return (
    <div className={`card ${styles.card}`}>
      <img
        src={produto.imageUrl}
        alt={produto.title}
        className={`card-img-top ${styles.image}`}
      />
      <div className={`card-body ${styles.body}`}>
        <h5 className={styles.title}>{produto.title}</h5>
        <p className={styles.description}>{produto.description}</p>
        <p className={styles.location}>
          {produto.city}, {produto.district}
        </p>
        <span className={`${styles.status} ${produto.status === 'RESERVED' ? styles.reserved : ''}`}>
          {produto.status}
        </span>
      </div>
    </div>
  );
}

export default ProdutoCard;
