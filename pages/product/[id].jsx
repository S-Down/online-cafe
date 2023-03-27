import styles from '../../styles/Product.module.css'
import Image from 'next/image'
import Head from 'next/head'
import { useState } from 'react'
import axios from 'axios'
import { getSession } from 'next-auth/react';

const Product = ({ product, base_url, user }) => {
  const tastes = product.tastes.filter(taste => taste !== null)
  const temps = product.temp.filter(t => t !== null)

  const [size, setSize] = useState(0)
  const [sweetness, setSweetness] = useState(0)
  const [temperature, setTemperature] = useState(0)
  const [extras, setExtras] = useState(['小份', tastes[0].text, temps[0].text])
  const [quantity, setQuantity] = useState(1)

  const handleOptionChange = (e, index, type) => {
    const info = e.currentTarget.lastChild.innerHTML
    if(type === 'size') {
      setSize(index)
      setExtras([info, ...extras.slice(1)])
    } else if(type === 'sweetness') {
      setSweetness(index)
      setExtras([extras[0], info, extras[2]])
    } else if(type === 'temperature') {
      setTemperature(index)
      setExtras([...extras.slice(0,2), info])
    }
  }

  const handleAddClick = async () => {
    if(user.role === 'customer') {
      const price = product.price[size]
      const newItem = {
        img: product.img,
        name: product.name,
        category: product.category,
        extras: extras.join(' '), 
        price: price,
        quantity: quantity
        }
      try {
        const cart = await axios.get(`${base_url}/api/cart/${user.cart}`)
        const products = cart.data.products
        const counts = cart.data.counts
        const newCart = await axios.put(`${base_url}/api/cart/${user.cart}`, { products: [...products, newItem], counts: counts + 1 })
      } catch (error) {
        console.log(error)
      }
    } else {
      alert('仅支持登录后的顾客进行产品加购')
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>产品 - {product.name}</title>
        <meta 
          name='description'
          content='产品详情页面, 顾客可在此页面查看产品的详细信息, 调整至自己想要的口味并进行选购'
        />
      </Head>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={product.img} alt="产品的实物图片" layout="fill" objectFit="cover" style={{borderRadius: '10px'}}/>
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{product.name}</h1>
        <span className={styles.price}>￥ {product.price[size]}</span>
        <p className={styles.desc}>{product.desc}</p>
        <h3 className={styles.chooseTitle}>选择餐饮分量</h3>
        <div className={styles.choose}>
          <div className={styles.option + " " + (size === 0 ? styles.active : " ")} onClick={(e) => handleOptionChange(e, 0, 'size')}>
            <Image src='/img/size.png' width={60} height={60} alt='表示小份的logo' />
            <span className={styles.sizeTitle}>小份</span>
          </div>
          <div className={styles.option + " " + (size === 1 ? styles.active : " ")} onClick={(e) => handleOptionChange(e, 1, 'size')}>
            <Image src='/img/size.png' width={70} height={70} alt='表示中份的logo' />
            <span className={styles.sizeTitle}>中份</span>
          </div>
          <div className={styles.option + " " + (size === 2 ? styles.active : " ")} onClick={(e) => handleOptionChange(e, 2, 'size')}>
            <Image src='/img/size.png' width={80} height={80} alt='表示大份的logo' />
            <span className={styles.sizeTitle}>大份</span>
          </div>
        </div>
        <h3 className={styles.chooseTitle}>个性化调整口味</h3>
        <div className={styles.choose}>
          {tastes.map((taste, index) => (
            <div className={styles.option + " " + (sweetness === index ? styles.active : " ")} key={taste._id} onClick={(e) => handleOptionChange(e, index, 'sweetness')}>
              <Image src={taste.img} width={taste.len} height={taste.len} alt={taste.desc} />
              <span className={styles.sweetnessTitle}>{taste.text}</span>
            </div>
          ))}
        </div>
        <div className={styles.choose}>
          {temps.map((pTemp, index) => (
            <div className={styles.option + " " + (temperature === index ? styles.active : " ")} key={pTemp._id} onClick={(e) => handleOptionChange(e, index, 'temperature')}>
              <Image src={pTemp.img} width={pTemp.len} height={pTemp.len} alt={pTemp.desc} />
              <span className={styles.tempTitle}>{pTemp.text}</span>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <input className={styles.quantity} type='number' defaultValue={1} min={1} onChange={(e) => setQuantity(e.target.value)}/>
          <button className={styles.button} onClick={handleAddClick}>添加到购物车</button>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession({ req: ctx.req })
  if(!session) {
    return{
      redirect: {
        destination: "/auth",
        permanent: false,
      }
    }
  }

  const user = session.user
  const base_url = process.env.BASE_URL
  const res = await axios.get(`${base_url}/api/products/${ctx.params.id}`);
  return {
    props: {
      product: res.data,
      base_url: base_url,
      user: user
    },
  };
};


export default Product