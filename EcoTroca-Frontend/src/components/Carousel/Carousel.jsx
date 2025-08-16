import { Carousel } from "react-bootstrap";
import produtos from "../../database/produtos";
import styles from "./Carousel.module.css";
import ProdutoCard from '../ProdutoCard/ProdutoCard';
import useWindowSize from '../../hooks/useWindowSize';
import { useNavigate } from 'react-router';

function CustomCarousel() {
  const { width } = useWindowSize();
  const breakpoint1 = 1024;
  const breakpoint2 = 800;
  const itemsPerSlide = width <= breakpoint2 ? 1 : width <= breakpoint1 ? 2 : 3;
  const groupedProdutos = [];
  const navigate = useNavigate();

  for (let i = 0; i < produtos.length; i += itemsPerSlide) {
    groupedProdutos.push(produtos.slice(i, i + itemsPerSlide));
  }

  const handleRouter = (id) => {
    navigate(`/detalhes/${id}`);
  };

  return (
    <Carousel variant="dark" indicators={false}>
      {groupedProdutos.map((productGroup, idx) => (
        <Carousel.Item key={idx}>
          <div className={`d-flex justify-content-center ${styles['carousel-item']}`}>
            {productGroup.map(produto => (
              <div
                key={produto.id}
                style={{ cursor: 'pointer' }}
                onClick={() => handleRouter(produto.id)}
              >
                <ProdutoCard produto={produto} />
              </div>
            ))}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CustomCarousel;
