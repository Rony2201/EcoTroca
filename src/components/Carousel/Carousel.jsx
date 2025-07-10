import Carousel from 'react-bootstrap/Carousel';
import produtos from "../../database/produtos";
import styles from "./Carousel.module.css";
import ProdutoCard from '../ProdutoCard/ProdutoCard';
import useWindowSize from '../../hooks/useWindowSize';

function CustomCarousel() {
    const { width } = useWindowSize();
    const breakpoint1 = 1024;
    const breakpoint2 = 800;
    const itemsPerSlide = width <= breakpoint2 ? 1 : width <= breakpoint1 ? 2: 3;
    const groupedProdutos = [];
    for (let i = 0; i < produtos.length; i += itemsPerSlide) {
        groupedProdutos.push(produtos.slice(i, i + itemsPerSlide));
    }


return (
    <Carousel variant='dark' indicators={false}>
                {groupedProdutos.map((productGroup, idx) => (
                    <Carousel.Item key={idx}>
                        <div className={`d-flex justify-content-center ${styles['carousel-item']}`}>
                            {productGroup.map(produto => (
                                <ProdutoCard key={produto.id} produto={produto} />
                            ))}
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        );
}

        export default CustomCarousel;