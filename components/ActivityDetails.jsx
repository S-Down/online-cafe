import styles from '../styles/ActivityDetails.module.css'
import Image from 'next/image'
import Link from 'next/link'

const ActivityDetails = ({ discount, bg, setClose }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span className={styles.closeBtn} onClick={() => setClose(true)}>&times;</span>
        <h3 className={styles.title}>
          购买活动内产品, <br/>享
          <span className={styles.gradient} style={{ backgroundImage: bg }}>
            单杯{discount.price[0]}两杯{discount.price[1]}三杯及以上{discount.price[2]}优惠
          </span>
        </h3>
        <div className={styles.items}>
          {discount.products.map((product, index) => (
            <div className={styles.item} key={index}>
              <span className={styles.ribbon}></span>
              <div className={styles.img}>
                <Link href={`/product/${product._id}`} passHref>
                  <Image src={product.img} layout="fill" objectFit='cover' alt="产品实物图片" />
                </Link>
              </div>
              <Link href={`/product/${product._id}`} passHref>
                <h3 className={styles.itemTitle}>{product.name}</h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ActivityDetails
