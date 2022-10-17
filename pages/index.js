import Head from "next/head";
import Featured from "../components/Featured";
import ProductList from "../components/ProductList";
import axios from "axios";
import styles from "../styles/Home.module.css";

export default function Home({ productList }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Order Coffee Online</title>
        <meta
          name="description"
          content="Order a cup of coffee or other drinks for yourself"
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
