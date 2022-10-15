import styles from '../styles/ProductList.module.css'
import ProductCard from './ProductCard'

const ProductList = ({ productList }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>享受至臻美味</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
        Ullam in distinctio mollitia earum veritatis, natus 
        recusandae voluptas iusto odit quam saepe provident deleniti 
        aliquid maiores aliquam ab quibusdam ducimus numquam.
      </p>
      <div className={styles.wrapper}>
        {productList.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default ProductList
