import CustomCarousel from "../components/Carousel/Carousel";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "../components/Footer/Footer";
import BoasVindas from "../components/BoasVindas/BoasVindas";

function Home() {
  return (
    <>
      <BoasVindas />
      <CustomCarousel />
      <Footer />
  </>
  )
}

export default Home