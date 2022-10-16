import styles from '../styles/Cart.module.css'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import axios from 'axios'
import { useRouter } from 'next/router'
import { reset } from '../redux/cartSlice'
import OrderDetails from '../components/OrderDetails'

const Cart = () => {
  const [open, setOpen] = useState(false)
  const [cash, setCash] = useState(false)
  const cart = useSelector(state => state.cart)
  const router = useRouter()

  const amount = cart.total
  const currency = "USD"
  const style = {"layout":"vertical"}

  const dispatch = useDispatch()

  const discount = cart.products.map(product => product.discount).reduce((pre, cur) => pre + cur, 0)

  const createOrder = async (data) => {
    try {
      const res = await axios.post(`${process.env.BASE_URL}/api/orders`, data)
      if(res.status === 201) {
        console.log(res.data)
        dispatch(reset())
        router.push(`/orders/${res.data._id}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const ButtonWrapper = ({ currency, showSpinner }) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer()

    useEffect(() => {
      dispatch({
          type: "resetOptions",
          value: {
              ...options,
              currency: currency,
          }
      })
    }, [currency, showSpinner]);

    return (
      <>
        { (showSpinner && isPending) && <div className="spinner" /> }
        <PayPalButtons
            style={style}
            disabled={false}
            forceReRender={[amount, currency, style]}
            fundingSource={undefined}
            createOrder={(data, actions) => {
                return actions.order
                    .create({
                        purchase_units: [
                            {
                                amount: {
                                    currency_code: currency,
                                    value: amount,
                                },
                            },
                        ],
                    })
                    .then((orderId) => {
                        return orderId;
                    });
            }}
            onApprove={function (data, actions) {
                return actions.order.capture().then(function (details) {
                  const shipping = details.purchase_units[0].shipping
                  // 之后再改
                  createOrder({
                    customer: shipping.name.full_name,
                    address: shipping.address.address_line_1,
                    phone: 123456789,
                    total: cart.total - discount,
                    method: 1
                  })
                });
            }}
        />
      </>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tr}>
              <th>产品</th>
              <th>名称</th>
              <th>额外信息</th>
              <th>单价</th>
              <th>数量</th>
              <th>总价</th>
            </tr>
          </thead>
          <tbody>
            {cart.products.map((product, index) =>(
              <tr key={index}>
                <td className={styles.product}>
                  <div className={styles.imgContainer}>
                    <Image src={product.img} alt="产品的实物图片" layout="fill" objectFit="cover" style={{borderRadius: '10px'}} />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{product.name}</span>
                </td>
                <td>
                  <span className={styles.extras}>{product.extras.join(', ')}</span>
                </td>
                <td>
                  <span className={styles.price}>￥ {product.price}</span>
                </td>
                <td>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td>
                  <span className={styles.total}>￥ {product.price * product.quantity}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h3 className={styles.title}>购物车总计</h3>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>小计: </b>￥ {cart.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>优惠: </b>￥ {discount}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>合计: </b>￥ {cart.total - discount}
          </div>
          {open ? (
            <div className={styles.paymentMethods}>
              <button className={styles.payButton} onClick={() => setCash(!cash)}>货到付款</button>
              <PayPalScriptProvider
                options={{
                  "client-id": "AXvMZ2X-UJkRbrxiM1iJG747N6bLYJB7asAbiZje662bquvJMWQFSAL3T_kmwFJ8LwGulgUZ__xJpfgP",
                  components: "buttons",
                  currency: "USD",
                  "disable-funding": "card"
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button className={styles.button} onClick={() => setOpen(true)}>现在结算</button>
          )}
        </div>
      </div>
      {cash && (
        <OrderDetails total={cart.total} discount={discount} createOrder={createOrder} setCash={setCash} />
      )}
    </div>
  )
}

export default Cart
