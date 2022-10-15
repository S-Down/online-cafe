import styles from '../styles/MenuItemCard.module.css'
import Image from 'next/image'
import Link from 'next/link'

const MenuItemCard = ({product}) => {
  return (
    <div className={styles.container}>
      <div className={styles.img}>
        <Link href={`/product/${product._id}`} passHref>
          <Image src={product.img} alt="产品实物图片" layout="fill" objectFit="cover"/>
        </Link>
      </div>
      <div className={styles.info}>
        <h1 className={styles.title}>{product.name}</h1>
        <span className={styles.price}>￥ {product.price[0]}</span>
        <p className={styles.desc}>
          {product.desc}
        </p>
      </div>
    </div>
  )
}

export default MenuItemCard