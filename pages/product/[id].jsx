import styles from '../../styles/Product.module.css'
import Image from 'next/image'
import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addProduct } from  '../../redux/cartSlice'

const Product = ({ product }) => {
  const tastes = product.tastes.filter(taste => taste !== null)
  const temps = product.temp.filter(t => t !== null)
  
  const [size, setSize] = useState(0)
  const [sweetness, setSweetness] = useState(0)
  const [temperature, setTemperature] = useState(0)
  const [extras, setExtras] = useState(['小份', tastes[0].text, temps[0].text])
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()


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

  const handleAddClick = () => {
    const price = product.price[size]
    dispatch(addProduct({...product, extras, price, quantity}))
  }

  return (
    <div className={styles.container}>
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

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`${process.env.BASE_URL}/api/products/${params.id}`);
  console.log(res.data)
  return {
    props: {
      product: res.data,
    },
  };
};


export default Product