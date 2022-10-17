import MenuItemCard from "./MenuItemCard"
import styles from '../styles/MenuList.module.css'
import Image from 'next/image'

const MenuList = ({productList, category}) => {
  const hasProduct = productList.length > 0
  return (
    <>
      {hasProduct && productList.map(
        product => (<MenuItemCard product={product} key={product._id}/>)
      )}
      {!hasProduct && 
        (<div className={styles.container}>
          <p className={styles.info}>抱歉, 本店暂未上架<span className={styles.category}>{category}</span>相关的产品, 请您之后再进行选购</p>
          <div className={styles.img}>
            <Image src="/img/menu-not-found.png" alt="暂无该分类相关的产品" layout="fill" objectFit="cover"/>
          </div>
        </div>)
      }
    </>
  )
}

export default MenuList