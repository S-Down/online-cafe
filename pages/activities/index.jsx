import styles from '../../styles/Activities.module.css'
import ActivityCard from '../../components/ActivityCard'
import Image from 'next/image'
import axios from 'axios'
import ActivityDetails from '../../components/ActivityDetails'
import { useState } from 'react'

const Index = ({ products }) => {
  const latteProducts = products.filter(product => product.category.includes('拿铁'))
  const oatProducts = products.filter(product => product.category.includes('燕麦制作'))
  const [close, setClose] = useState(true)
  const [activity, setActivity] = useState(null)
  
  const activities = [
    {
      title: '浓醇拿铁与慵懒秋冬的氛围碰撞',
      imgs: [
        "/img/latte.png",
        "/img/scarf.png",
        "/img/hat.png",
        "/img/glove.png",
        "/img/maple-leaf.png"
      ],
      bg: "linear-gradient(100deg, #3f3118, #895d14, #f5c127)",
      discount: {
        price: ['九折', '八折', '七折'],
        category: '拿铁',
        products: latteProducts
      }
    },
    {
      title: '燕麦奶替代牛奶 低脂零乳糖一杯满足',
      imgs: [
        "/img/oat.png",
        "/img/drewing.png",
        "/img/affogato.png",
        "/img/fit.png",
        "/img/lactose-free.png"
      ],
      bg: "linear-gradient(100deg, #3f183d, #741489, #f5277d)",
      discount: {
        price: ['九折', '八五折', '八折'],
        category: '燕麦制作',
        products: oatProducts
      }
    }
  ]

  return (
    <div className={styles.container}>
      {!close && <ActivityDetails discount={activity.discount} bg={activity.bg} setClose={setClose} />}
      {activities.map((activity, index) => (
        <ActivityCard activity={activity} setActivity={setActivity} setClose={setClose} key={index} />
      ))}
      <div className={styles.more}>
        <div className={styles.img}>
          <Image src="/img/activity.png" layout="fill" objectFit="cover" />
        </div>
        <div className={styles.title}>更多优惠活动敬请期待...</div>
      </div>
    </div>
  )
}

export default Index

export const getServerSideProps = async () => {
  const res = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      products: res.data,
    },
  };
};