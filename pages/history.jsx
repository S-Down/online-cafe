import styles from '../styles/History.module.css'
import Head from 'next/head'
import { getSession } from 'next-auth/react'
import axios from 'axios'
import { useRouter } from 'next/router'

const History = ({ orders }) => {
  const router = useRouter()

  return (
    <div className={styles.container}>
      <Head>
        <title>历史订单</title>
        <meta 
          name='description'
          content='历史订单页面, 顾客可在此页面浏览个人用户对应的历史订单'
        />
      </Head>
      <div className={styles.wrapper}>
        {orders.map((order, index) => (
          <div className={styles.receipt} key={index}>
            <div className={styles.item}>
              <span className={styles.idText}>订单号:</span>
              <span className={styles.idNumber} onClick={() => router.push(`/orders/${order._id}`)}>{`${order._id.slice(0, 6)}**********${order._id.slice(-6)}`}</span>
            </div>
            <div className={styles.item}>
              {order.products.map((product, index) => (
                <div className={styles.productInfos} key={index}>
                  <span className={styles.name}>{product.name}</span>
                  <span className={styles.extras}>{product.extras}</span>
                  <span className={styles.price}>￥ {product.price.toFixed(2)}</span>
                  <span className={styles.quantity}>&times;{product.quantity}</span>
                </div>
              ))}
            </div>
            <div className={styles.item}>
              <div className={styles.infoContainer}>
                <span className={styles.infoTitle}>收货人:</span>
                <span className={styles.infoText}>{order.customer}</span>
              </div>
              <div className={styles.infoContainer}>
                <span className={styles.infoTitle}>联系电话:</span>
                <span className={styles.infoText}>{order.phone}</span>
              </div>
              <div className={styles.infoContainer}>
                <span className={styles.infoTitle}>配送地址:</span>
                <span className={styles.infoText}>{order.address}</span>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.infoContainer}>
                <span className={styles.infoTitle}>合计:</span>
                <span className={styles.infoText}>￥ {order.total.toFixed(2)}</span>
              </div>
              <div className={styles.infoContainer}>
                <span className={styles.infoTitle}>折扣优惠:</span>
                <span className={styles.infoText}>￥ {order.discount.toFixed(2)}</span>
              </div>
              <div className={styles.infoContainer}>
                <span className={styles.infoTitle}>总计:</span>
                <span className={styles.infoText}>￥ {(order.total - order.discount).toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default History

export const getServerSideProps = async (ctx) => {
  const session = await getSession({ req: ctx.req })
  if(!session || session.user.role !== 'customer') {
    return{
      redirect: {
        destination: "/auth",
        permanent: false,
      }
    }
  }

  const user = session.user
  const base_url = process.env.BASE_URL
  const res = await axios.get(`${base_url}/api/orders/`, { params: { buyer: user.email} })
  return {
    props: {
      orders: res.data
    }
  }
}