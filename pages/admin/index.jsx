import styles from '../../styles/Admin.module.css'
import Image from 'next/image'
import Head from 'next/head'
import axios from 'axios'
import { useState } from 'react'
import Add from "../../components/Add";
import AddButton from "../../components/AddButton";
import { getSession } from 'next-auth/react';

const Index = ({ orders, products, admin, base_url }) => {
  const [productList, setProductList] = useState(products)
  const [orderList, setOrderList] = useState(orders)
  const [close, setClose] = useState(true)
  const [modify, setModify] = useState(false)
  const [item, setItem] = useState(null)

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${base_url}/api/products/` + id)
      setProductList(productList.filter(product => product._id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  const handleStatus = async (id) => {
    const item = orderList.find(order => order._id === id)
    try {
      const res = await axios.put(`${base_url}/api/orders/` + id, { status: item.status + 1 })
      if(res.data.status < 3) {
        setOrderList([
          res.data,
          ...orderList.filter(order => order._id !== id)
        ])
      } else {
        setOrderList([...orderList.filter(order => order._id !== id)])
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleClick = (product) => {
    setItem(product)
    setModify(true)
    setClose(false)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>管理员操作中心</title>
        <meta 
          name='description'
          content='管理员操作中心, 店铺管理员可在此页面浏览已有的产品和待处理的订单, 并对其进行相关管理操作'
        />
      </Head>
      <div className={styles.item}>
        {admin && <AddButton setClose={setClose} />}
        {!close && <Add setClose={setClose} setProductList={setProductList} modify={modify} setModify={setModify} item={item} base_url={base_url} />}
        <h1 className={styles.title}>产品</h1>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>图片</th>
              <th>Id</th>
              <th>名称</th>
              <th>价格</th>
              <th>操作</th>
            </tr>
          </thead>
          {productList.map((product) => (
            <tbody key={product._id}>
              <tr>
                <td>
                  <Image
                    src={product.img}
                    width={70}
                    height={70}
                    objectFit='cover'
                    alt='产品实物图片'
                    style={{borderRadius: '10px'}}
                  />
                </td>
                <td>{product._id.slice(0,7)}...</td>
                <td>{product.name}</td>
                <td>{product.price[0]}</td>
                <td>
                  <button className={styles.button} onClick={() => handleClick(product)}>编辑</button>
                  <button className={styles.button} onClick={() => handleDelete(product._id)}>删除</button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>待处理订单</h1>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>收货人</th>
              <th>总价</th>
              <th>支付方式</th>
              <th>订单状态</th>
              <th>操作</th>
            </tr>
          </thead>
          {orderList.map((order) => (
            <tbody key={order._id}>
              <tr>
                <td>{order._id.slice(0,7)}...</td>
                <td>{order.customer}</td>
                <td>￥ {order.total}</td>
                <td><span>{order.method === 0 ? '货到付款' : '线上支付'}</span></td>
                <td>{(['制作中', '配送中', '查收中'])[order.status]}</td>
                <td>
                  <button 
                    className={styles.button} 
                    style={{ backgroundColor: 'darkolivegreen' }}
                    onClick={() => handleStatus(order._id)}
                  >
                    下一阶段
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession({ req: ctx.req })
  const base_url = process.env.BASE_URL
  let admin = false;
  
  if(!session || session.user.role !== 'admin') {
    return{
      redirect: {
        destination: "/auth",
        permanent: false,
      }
    }
  }
  admin = true;

  const productList = await axios.get(`${base_url}/api/products`)
  const orderList = await axios.get(`${base_url}/api/orders`)
  return {
    props: {
      orders: orderList.data.filter(order => order.status < 3),
      products: productList.data,
      admin: admin,
      base_url: base_url
    }
  }
}

export default Index
