import styles from '../../styles/Order.module.css'
import Image from 'next/image'
import axios from 'axios'

const Order = ({ order }) => {
  const status = order.status

  const statusClass = (index) => {
    if(index - status < 1) return styles.done
    else if(index - status === 1) return styles.preparing
    else if(index - status > 1) return styles.waiting
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.row}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tr}>
                <th>订单ID</th>
                <th>顾客</th>
                <th>联系电话</th>
                <th>配送地址</th>
                <th>订单金额</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span className={styles.id}>{order._id}</span>
                </td>
                <td>
                  <span className={styles.name}>{order.customer}</span>
                </td>
                <td>
                  <span className={styles.phone}>{order.phone}</span>
                </td>
                <td>
                  <span className={styles.address}>{order.address}</span>
                </td>
                <td>
                  <span className={styles.price}>￥ {order.total - order.discount}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.row}>
          <div className={statusClass(0)}>
            <Image src='/img/paid.png' alt='表示付款的图标' width={50} height={50} />
            <span className={styles.statusTitle}>支付</span>
            <div className={styles.checkedIcon}>
              <Image src='/img/checked.png' alt='表示当前所属事项状态的图标' width={30} height={30} />
            </div>
          </div>
          <div className={statusClass(1)}>
            <Image src='/img/prepared.png' alt='表示制作过程的图标' width={50} height={50} />
            <span className={styles.statusTitle}>制作</span>
            <div className={styles.checkedIcon}>
              <Image src='/img/checked.png' alt='表示当前所属事项状态的图标' width={30} height={30} />
            </div>
          </div>
          <div className={statusClass(2)}>
            <Image src='/img/express-delivery.png' alt='表示运输状态的图标' width={50} height={50} />
            <span className={styles.statusTitle}>运输</span>
            <div className={styles.checkedIcon}>
              <Image src='/img/checked.png' alt='表示当前所属事项状态的图标' width={30} height={30} />
            </div>
          </div>
          <div className={statusClass(3)}>
            <Image src='/img/delivery-man.png' alt='表示配送的图标' width={50} height={50} />
            <span className={styles.statusTitle}>配送</span>
            <div className={styles.checkedIcon}>
              <Image src='/img/checked.png' alt='表示当前所属事项状态的图标' width={30} height={30} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h3 className={styles.title}>订单总计</h3>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>小计: </b>￥ {(order.total).toFixed(2)}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>优惠: </b>￥ {(order.discount).toFixed(2)}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>合计: </b>￥ {(order.total - order.discount).toFixed(2)}
          </div>
          <button disabled className={styles.button}>已支付</button>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`${process.env.BASE_URL}/api/orders/${params.id}`);
  return {
    props: {
      order: res.data,
    },
  };
};

export default Order