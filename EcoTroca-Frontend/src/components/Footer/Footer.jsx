import { Link } from "react-router-dom";
import Logo from '../../assets/logoeco.png'
import styles from './Footer.module.css';
import List from "./List/List";

function Footer() {

    return (
        <section className="">
            <footer class="bg-dark text-white text-center py-3">
                <div className="d-flex justify-content-center column-gap-5">
                    <ul class="nav flex-column row-gap-2">
                        <li class="nav-item d-flex">
                            <Link to="/">
                                <img src={Logo} alt="" width={80} />

                            </Link>
                            <div className="d-flex align-items-center">
                                <Link className="link-light link-offset-2 link-underline-opacity-0" to="/">
                                    <h5>EcoTroca</h5>
                                </Link>
                            </div>

                        </li>
                    </ul>
                    <ul class="nav flex-column row-gap-2">
                        <li className={styles.mr}>
                            <h5>Redes sociais</h5>
                        </li>
                        <List aria-current="page" media="Voltar"/>
                        <List media="Facebook"/>
                        <List media="YouTube"/>
                        <List media="Twitter"/>
                    </ul>
                    <ul class="nav flex-column row-gap-2">
                        <li className={styles.mi}>
                            <h5>Info</h5>
                        </li>
                        <li class="nav-item">
                            <Link to="/about" className="link-light link-offset-2 link-underline-opacity-0 link-underline-opacity-100-hover">Sobre nós</Link>
                        </li>
                        <List media="trabalhe conosco!"/>
                        <List media="Termos e condições"/>
                        <List media="Privacidade"/>
                    </ul>
                </div>
                <div className={styles.md}>
                    <p class="mb-1">© 2025 EcoTroca. Todos os direitos reservados.</p>
                </div>
            </footer>
        </section>

    );

}

export default Footer;