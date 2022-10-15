import { useState } from 'react'
import styles from '../styles/OrderDetails.module.css'

const OrderDetails = ({ total, discount, createOrder, setCash }) => {
  const [customer, setCustomer] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')

  const handleClick = () => {
    createOrder({
      customer: customer,
      phone: phone,
      address: address,
      total: total - discount,
      method: 0
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>您将在配送后付款<span>{total - discount}</span>元</h1>
        <span className={styles.closeBtn} onClick={() => setCash(false)}>&times;</span>
        <div className={styles.item}>
          <label className={styles.label}>收货人</label>
          <input 
            placeholder='请输入收货人名称' 
            type='text' 
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>联系电话</label>
          <input 
            placeholder='请输入收货人联系电话' 
            type='text' 
            className={styles.input}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>配送地址</label>
          <textarea 
            placeholder='请输入希望配送到的地址' 
            type='text' 
            className={styles.textarea}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button className={styles.button} onClick={handleClick}>
          确认下单
        </button>
      </div>
    </div>
  )
}

export default OrderDetails
