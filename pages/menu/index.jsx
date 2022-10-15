import styles from '../../styles/Menu.module.css'
import { useState } from 'react'
import axios from "axios";
import MenuList from '../../components/MenuList';

const Index = ({
    products_latte, products_oat, products_espresso, products_americano, products_iceCream, products_classic 
  }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleActive = (e, index) => {
    setActiveIndex(index)
    const tabs = e.currentTarget.parentNode.childNodes
    Array.prototype.forEach.call(tabs, tab => tab.setAttribute('active', 'false'))
    e.currentTarget.setAttribute('active', 'true')
  }

  return (
    <div className={styles.container}>
      <div className={styles.tabBar}>
        <div
          className={styles.tab}
          onClick={e => handleActive(e, 0)}
          active='true'
        >
          <span className={styles.tabText}>拿铁</span>
          <span className={styles.tabIndicator}></span>
        </div>
        <div
          className={styles.tab}
          onClick={e => handleActive(e, 1)}
        >
          <span className={styles.tabText}>燕麦制作</span>
          <span className={styles.tabIndicator}></span>
        </div>
        <div
          className={styles.tab}
          onClick={e => handleActive(e, 2)}
        >
          <span className={styles.tabText}>意式</span>
          <span className={styles.tabIndicator}></span>
        </div>
        <div
          className={styles.tab}
          onClick={e => handleActive(e, 3)}
        >
          <span className={styles.tabText}>美式</span>
          <span className={styles.tabIndicator}></span>
        </div>
        <div
          className={styles.tab}
          onClick={e => handleActive(e, 4)}
        >
          <span className={styles.tabText}>冰淇淋</span>
          <span className={styles.tabIndicator}></span>
        </div>
        <div
          className={styles.tab}
          onClick={e => handleActive(e, 5)}
        >
          <span className={styles.tabText}>经典</span>
          <span className={styles.tabIndicator}></span>
        </div>
      </div>
      <div className={styles.tabPage}>
        {activeIndex === 0 && <MenuList productList={products_latte} category="拿铁" />}
        {activeIndex === 1 && <MenuList productList={products_oat} category="燕麦制作" />}
        {activeIndex === 2 && <MenuList productList={products_espresso} category="意式" />}
        {activeIndex === 3 && <MenuList productList={products_americano} category="美式" />}
        {activeIndex === 4 && <MenuList productList={products_iceCream} category="冰淇淋" />}
        {activeIndex === 5 && <MenuList productList={products_classic} category="经典" />}
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  let url = process.env.NODE_ENV === 'development' ? process.env.BASE_URL : ''
  console.log('url: ', url)
  const productList = await axios.get(`${url}/api/products`)
  return {
    props: {
      products_latte: productList.data.filter(product => product.category.includes('拿铁')),
      products_oat: productList.data.filter(product => product.category.includes('燕麦制作')),
      products_espresso: productList.data.filter(product => product.category.includes('意式')),
      products_americano: productList.data.filter(product => product.category.includes('美式')),
      products_iceCream: productList.data.filter(product => product.category.includes('冰淇淋')),
      products_classic: productList.data.filter(product => product.category.includes('经典')),
    }
  }
}

export default Index