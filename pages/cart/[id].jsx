import styles from '../../styles/Cart.module.css'
import { debounce } from '../../lib/helpers'
import { initialDiscounts, discountReducer, initialCheckoutInfos, checkoutReducer } from '../../lib/reducerHelpers';
import OrderDetails from '../../components/OrderDetails'
import { getSession } from 'next-auth/react';
import Head from 'next/head'
import Image from 'next/image'
import { useState, useReducer, useEffect, useRef } from "react"
import axios from 'axios'
import { useRouter } from 'next/router'

const Cart = ({ base_url, user, cart }) => {
  const [products, setProducts] = useState(cart.products)
  const [counts, setCounts] = useState(cart.counts)
  const [open, setOpen] = useState(false)
  const [cash, setCash] = useState(false)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [discounts, discountDispatch] = useReducer(discountReducer, initialDiscounts);
  const [checkoutInfos, checkoutInfoDispatch] = useReducer(checkoutReducer, initialCheckoutInfos)
  const [checkoutInfoDetails, setCheckoutInfoDetails] = useState({
    sum: 0,
    discount: 0,
    total: 0,
    products: []
  })
  const router = useRouter()
  const checkoutCard = useRef()

  useEffect(() => {
    discounts.forEach(discount => {
      if(discount.quantity > 0) {
        let tempTotal = 0
        let tempReduce = 0
        discount.productsList.forEach(product => tempTotal += product.price * product.quantity)
        if(discount.id === 1) { // calculate for latte's discount
          if(discount.quantity === 1) {
            tempReduce = tempTotal * 0.1
          } else if(discount.quantity === 2) {
            tempReduce = tempTotal * 0.2
          } else if(discount.quantity >= 3) {
            tempReduce = tempTotal * 0.3
          }
          tempTotal = tempTotal.toFixed(2)
          tempReduce = tempReduce.toFixed(2)
          checkoutInfoDispatch({
            type: "UPDATE",
            id: 1,
            total: tempTotal,
            reduce: tempReduce
          })
        } else if(discount.id === 2) {
          if(discount.id === 2) { // calculate for oat's discount
            if(discount.quantity === 1) {
              tempReduce = tempTotal * 0.1
            } else if(discount.quantity === 2) {
              tempReduce = tempTotal * 0.15
            } else if(discount.quantity >= 3) {
              tempReduce = tempTotal * 0.2
            }
            tempTotal = tempTotal.toFixed(2)
            tempReduce = tempReduce.toFixed(2)
            checkoutInfoDispatch({
              type: "UPDATE",
              id: 2,
              total: tempTotal,
              reduce: tempReduce
            })
          } else if(discount.id === 3) { // calculate for non discount
              tempTotal = tempTotal.toFixed(2)
              tempReduce = tempReduce.toFixed(2)
              checkoutInfoDispatch({
                type: "UPDATE",
                id: 3,
                total: tempTotal,
                reduce: tempReduce
              })
          }
        }
      } else {
        checkoutInfoDispatch({
          type: "UPDATE",
          id: discount.id,
          total: 0,
          reduce: 0
        })
      }
    });
  }, [discounts])

  useEffect(() => {
    let sum = 0
    let discount = 0
    let total = 0
    checkoutInfos.forEach(checkoutInfo => {
      sum += Number.parseFloat(checkoutInfo.total)
      discount += Number.parseFloat(checkoutInfo.reduce)
    })
    total = sum - discount
    sum = sum.toFixed(2)
    discount = discount.toFixed(2)
    total = total.toFixed(2)
    setCheckoutInfoDetails({
      sum: sum,
      discount: discount,
      total: total,
      products: [ ...discounts[0].productsList, ...discounts[1].productsList, ...discounts[2].productsList ]
    })
  }, [checkoutInfos])
  
  const createOrder = async (data) => {
    data = { ...data, products: checkoutInfoDetails.products }
    const remainProducts = products.filter(product => !data.products.includes(product))
    console.log(remainProducts)
    try {
      const orderRes = await axios.post(`${base_url}/api/orders`, data)
      const cartRes = await axios.put(`${base_url}/api/cart/${user.cart}`, {
        products: remainProducts,
        counts: remainProducts.length
      })
      if(orderRes.status === 201 && cartRes.status === 200) {    
        router.push(`/orders/${orderRes.data._id}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleRemove = async (e) => {
    e.preventDefault;
    const id = e.currentTarget.id
    const productsList = cart.products
    // delete selected product
    productsList.splice(id, 1)
    const res = await axios.put(`${base_url}/api/cart/${user.cart}`, {
      products: productsList,
      counts: counts - 1
    })
    setProducts(productsList)
    setCounts(prev => prev - 1)
  }

  const handleSelect = debounce(e => {
    const id = e.target.id
    const selectedProduct = cart.products[id]
    const checked = e.target.checked
    if(checked) {
      let actionId = 0
      if(selectedProduct.category.includes('??????')) {
        actionId = 1
      } else if(selectedProduct.category.includes('????????????')) {
        actionId = 2
      } else {
        actionId = 3
      }
      discountDispatch({
        type: "SELECT",
        id: actionId,
        product: selectedProduct
      })
    } else {
      let actionId = 0
      if(selectedProduct.category.includes('??????')) {
        actionId = 1
      } else if(selectedProduct.category.includes('????????????')) {
        actionId = 2
      } else {
        actionId = 3
      }
      discountDispatch({
        type: "CANCEL",
        id: actionId,
        product: selectedProduct
      })
    }
  }, 100)

  const handleCheckoutCardDisplay = () => {
    const display = checkoutCard.current.style.display
    if(display === '' || display === 'none') {
      checkoutCard.current.style.display = 'block'
    } else if(display === 'block') {
      checkoutCard.current.style.display = 'none'
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>?????????</title>
        <meta 
          name='description'
          content='???????????????, ???????????????????????????????????????, ???????????????????????????????????????'
        />
      </Head>
      <h4 className={styles.countsTitle}>?????????????????????????????????????????????: <span className={styles.counts}>{counts}</span></h4>
      <div className={styles.cardsWrapper}>
        <div className={`${styles.card} ${styles.checkout}`} ref={checkoutCard}>
          <h3 className={styles.title}>???????????????</h3>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>??????: </b>??? {checkoutInfoDetails.sum}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>??????: </b>??? {checkoutInfoDetails.discount}
            <div className={styles.discountInfoWrapper}>
              <span className={styles.discountInfo} onClick={() => setDetailsOpen(true)}>
                <i className={`fi fi-rr-comment-info ${styles.infoIcon}`}></i>
              </span>
              {detailsOpen && (
                <div className={styles.discountDetails}>
                  <h5 className={styles.detailsTitle}>???????????????????????????????????????, ??????????????????????????????</h5>
                  <p className={styles.detailsText}>
                    ??????????????????{discounts[0].quantity}??????{checkoutInfos[0].title}???????????????,
                    ???{checkoutInfos[0].info}??????,?????????{checkoutInfos[0].reduce}???
                  </p>
                  <p className={styles.detailsText}>
                    ??????????????????{discounts[1].quantity}??????{checkoutInfos[1].title}???????????????,
                    ???{checkoutInfos[1].info}??????,?????????{checkoutInfos[1].reduce}???
                  </p>
                  <p className={styles.detailsText}>
                    ??????????????????{discounts[0].quantity}???{checkoutInfos[2].title},
                    {checkoutInfos[2].info}
                  </p>
                  <button className={styles.detailsCloseBtn} onClick={() => setDetailsOpen(false)}>??????????????????</button>
                </div>
              )}
            </div>
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>??????: </b>??? {checkoutInfoDetails.total}
          </div>
          {open && checkoutInfoDetails.total == 0 && (
            <p className={styles.notSelectedText}>???????????????????????????????????????</p>
          )}
          {open && checkoutInfoDetails.total > 0 && (
            <div className={styles.paymentMethods}>
              <button className={styles.payButton} onClick={() => setCash(!cash)}>????????????</button>
              <button className={styles.cancelButton} onClick={() => setOpen(false)}>????????????</button>
            </div>
          )}
          {!open && (
            <button className={styles.button} onClick={() => setOpen(true)}>????????????</button>
          )}
        </div>
        {counts > 0 && products.map((product, index) => (
          <div className={`${styles.product} ${styles.card}`} key={index}>
            <div className={styles.imgContainer}>
              <Image src={product.img} layout="fill" objectFit="cover" alt="" />
            </div>
            <div className={styles.infos}>
              <h3 className={styles.name}>{product.name}</h3>
              <p className={styles.extras}>{product.extras}</p>
              <div className={styles.priceInfos}>
                <span className={styles.price}>??? {product.price}</span>
                <span className={styles.quantity}>{product.quantity}</span>
              </div>
              <div className={styles.btnContainer}>
                <label className={styles.checkboxContainer} id={index} onClick={(e) => handleSelect(e)} >
                  <input type="checkbox" id={index} className={styles.checkbox}/>
                  <span className={styles.selectBtn}>
                    <i className={`fi fi-rr-check ${styles.btnIcon}`}></i>
                  </span>
                </label>
                <button className={styles.removeBtn} id={index} onClick={(e) => handleRemove(e)}>
                  <i className={`fi fi-rr-cross ${styles.btnIcon}`}></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {cash && (
        <OrderDetails total={checkoutInfoDetails.sum} discount={checkoutInfoDetails.discount} user={user.email} createOrder={createOrder} setCash={setCash} />
      )}
      <span className={styles.checkoutBtn} onClick={handleCheckoutCardDisplay}>
        <i className={`fi fi-rr-shopping-cart-check ${styles.checkoutBtnIcon}`}></i>
      </span>
    </div>
  )
}

export default Cart

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
  const res = await axios.get(`${base_url}/api/cart/${ctx.params.id}`)
  return {
    props: {
      base_url: base_url,
      user: user,
      cart: res.data
    }
  }
}
