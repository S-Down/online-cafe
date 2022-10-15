import styles from '../styles/Footer.module.css'
import Image from 'next/image'

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/img/bg.jpg" layout="fill" objectFit='cover' alt="页脚的背景图片" />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <div className={styles.motto}>
            <h2>甘苦相伴</h2>
            <h2>醇享生活之味</h2>
          </div>
          <div className={styles.mottoBg}>
            <h3>Coffee Is Life</h3>
            <h3>Bitter And Sweet Are Included</h3>
          </div>
        </div>
        <div className={styles.card}>
          <h2 className={styles.title}>线下门店地址</h2>
          <p className={styles.text}>
            xx 市 xx 区 xx 路 123 号
          </p>
          <p className={styles.text}>
            xx 市 xx 区 xx 路 456 号
          </p>
          <p className={styles.text}>
            xx 市 xx 区 xx 路 789 号
          </p>
        </div>
        <div className={styles.card}>
          <h2 className={styles.title}>营业时间</h2>
          <p className={styles.text}>
            工作日&nbsp;&nbsp;&nbsp;07:00 - 22:30
          </p>
          <p className={styles.text}>
            节假日&nbsp;&nbsp;&nbsp;08:30 - 22:00
          </p>
        </div>
        <div className={styles.card}>
          <h2 className={styles.title}>
            商务合作请联系
          </h2>
          <div className={styles.contact}>
            <div className={styles.contactItem}>
              <div className={styles.img}>
                <Image src='/img/phone.png' layout='fill' alt='表示联系电话的图标' />
              </div>
              <p className={styles.text}>012 345 6789</p>
            </div>
            <div className={styles.contactItem}>
              <div className={styles.img}>
                <Image src='/img/email.png' layout='fill' alt='表示电子邮箱的图标' />
              </div>
              <p className={styles.text}>example@123.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer