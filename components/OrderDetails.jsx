import { useState, useEffect } from 'react'
import styles from '../styles/OrderDetails.module.css'
import { debounce } from '../lib/helpers'

const OrderDetails = ({ total, discount, user, createOrder, setCash }) => {
  const [customer, setCustomer] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState(true)

  const handleChange = debounce(e => {
    const value = e.target.value
    const name = e.target.name

    if(name === 'customer') {
      setCustomer(value)
    } else if(name === 'address') {
      setAddress(value)
    } else if(name === 'phone') {
      setPhone(value)
    }
  }, 500)

  const checkValueValid = () => {
    const nameLength = /.{1,}/
    const phoneLength = /\d{11,12}/
    const addressLength = /.{1,}/
    const nValid = nameLength.test(customer)
    const pValid = phoneLength.test(phone)
    const aValid = addressLength.test(address)
    if(nValid && pValid && aValid) {
      setError(false)
    } else {
      setError(true)
    }
  }

  useEffect(() => {
    checkValueValid()
  }, [customer, phone, address])

  const handleClick = () => {
    if(!error) {
      createOrder({
        customer: customer,
        buyer: user,
        phone: phone,
        address: address,
        total: total,
        discount: discount,
        method: 0
      })
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {error && (
          <div className={styles.error}>
            请先将表单数据填写完整再进行订单提交
          </div>
        )}
        <h1 className={styles.title}>您将在配送后付款<span>{total - discount}</span>元</h1>
        <span className={styles.closeBtn} onClick={() => setCash(false)}>&times;</span>
        <div className={styles.item}>
          <label className={styles.label}>收货人</label>
          <input 
            placeholder='请输入收货人名称' 
            type='text' 
            name='customer'
            required='required'
            className={styles.input}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>联系电话</label>
          <input 
            placeholder='请输入收货人联系电话' 
            type='text'
            name='phone' 
            required='required'
            className={styles.input}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>配送地址</label>
          <textarea 
            placeholder='请输入希望配送到的地址' 
            type='text'
            name='address' 
            required='required'
            className={styles.textarea}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button className={styles.button} type='submit' onClick={handleClick}>
          确认下单
        </button>
      </div>
    </div>
  )
}

export default OrderDetails
