
import styles from "../../Sobre/Sobre.module.css";

function Cards({title, paragrafo}) {
  return (
        <div className="col-md-4">
            <div className={`card h-100 shadow-sm ${styles.cardHover}`}>
                <div className="card-body">
                    <h5>{title}</h5>
                    <p>{paragrafo}</p>
                </div>
            </div>
        </div>
  )
}

export default Cards