import Head from "next/head";
import Featured from "../components/Featured";
import ProductList from "../components/ProductList";
import axios from "axios";
import styles from "../styles/Home.module.css";

export default function Home({ productList }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>臻享咖啡</title>
        <meta
          name="description"
          content="动动手指点一杯咖啡, 甘苦相伴品味生活滋味"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <ProductList productList={productList} />
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await axios.get(`${process.env.BASE_URL}/api/products`);
  return {
    props: {
      productList: res.data,
    },
  };
};
