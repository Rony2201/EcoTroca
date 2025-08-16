import styles from './BoasVindas.module.css';

function BoasVindas(){
    return(
        <section className="container my-4">
            <h2 className={styles.titulo}>Seja bem-vindo à <span className={styles.EcoTroca}>EcoTroca!</span></h2>
            <p className={styles.paragrafo}>
                Aqui no nosso sistema você pode encontrar itens de seu interesse e propor trocas por seus próprios produtos. 
                <br/>
                <b>Lembre-se: Aquilo que você não tem mais necessidade, pode ter um valor imensurável para alguém que precise.</b>
            </p>
        </section>
    );
}

export default BoasVindas;