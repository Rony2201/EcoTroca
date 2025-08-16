import styles from "./Banner.module.css";

function Banner() {
  return (
    <div className={`p-5 mb-0 rounded-3 ${styles.banner}`}>
      <div className={styles.bannerBg}></div>
    </div>
  );
}

export default Banner;
