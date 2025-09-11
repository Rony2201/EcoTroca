import { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import styles from "./Carousel.module.css";
import ProdutoCard from '../ProdutoCard/ProdutoCard';
import useWindowSize from '../../hooks/useWindowSize';
import { useNavigate } from 'react-router';
import { getAllProducts } from "../../services/productsService";

function CustomCarousel() {
  const { width } = useWindowSize();
  const [produtos, setProdutos] = useState([]);
  const [groupedProdutos, setGroupedProdutos] = useState([]);

  const navigate = useNavigate();

  const breakpoint1 = 1024;
  const breakpoint2 = 800;
  const itemsPerSlide = width <= breakpoint2 ? 1 : width <= breakpoint1 ? 2 : 3;

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const data = await getAllProducts();
        const produtosAPI = data.products; // ou data.produto, verifique o nome correto
        setProdutos(produtosAPI);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    };

    fetchProdutos();
  }, []);

  useEffect(() => {
    const grupos = [];
    for (let i = 0; i < produtos.length; i += itemsPerSlide) {
      grupos.push(produtos.slice(i, i + itemsPerSlide));
    }
    setGroupedProdutos(grupos);
  }, [produtos, itemsPerSlide]);

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
                key={produto.id_product || produto.id}
                style={{ cursor: 'pointer' }}
                onClick={() => handleRouter(produto.id_product || produto.id)}
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
