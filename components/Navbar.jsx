import styles from '../styles/Navbar.module.css'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import SignOutButton from './SignOutButton'

const Navbar = () => {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)
  const quantity = useSelector(state => state.cart.quantity)
  const icons = useRef()

  useEffect(() => {
    if(session) {
      icons.current.style.visibility = 'visible'
    } else {
      icons.current.style.visibility = 'hidden'
    }
  }, [session])
  
  return (
    <div className={styles.container}>
      <div className={styles.sideNav} style={{left : open ? '0px' : '-70vw'}}>
        <ul className={styles.sideList}>
          <li className={styles.sideListItem} onClick={() => setOpen(!open)}>&times;</li>
          <Link href='/' passHref>
            <li className={styles.sideListItem}>首页</li>
          </Link>
          <Link href='/menu' passHref>
            <li className={styles.sideListItem}>菜单</li>
          </Link>
          <Link href='/activities' passHref>
            <li className={styles.sideListItem}>活动特惠</li>
          </Link>
          <Link href='/story' passHref>
            <li className={styles.sideListItem}>品牌故事</li>
          </Link>
          {session && session.user.role === 'customer' && (
            <Link href='/history' passHref>
              <li className={styles.sideListItem}>历史订单</li>
            </Link>
          )}
        </ul>
        {session && <SignOutButton belongsTo='sideNav' />}
        {!session && (
          <Link href='/auth' passHref>
            <button className={styles.authButton}>登录</button>
          </Link>
        )}
      </div>
      <div className={styles.main}>
        <div className={styles.item} onClick={() => setOpen(!open)}>
          <Image src='/img/menu.png' width={36} height={36} alt='表示侧边导航栏的图标' />
        </div>
        <div className={styles.item}>
          <div className={styles.callButton}>
            <Image src="/img/call.png" width="32px" height="32px" alt="the phone call icon"/>
          </div>
          <div className={styles.texts}>
            <div className={styles.text}>联系电话</div>
            <div className={styles.text}>012 345 6789</div>
          </div>
        </div>
        <div className={styles.item}>
          <ul className={styles.list}>
            <Link href='/' passHref>
              <li className={styles.listItem}>首页</li>
            </Link>
            <Link href='/menu' passHref>
              <li className={styles.listItem}>菜单</li>
            </Link>
            <li className={styles.listItem}>
              <Image src="/img/logo.png" alt="the logo of the coffee shop" width="60px" height="60px" />
            </li>
            <Link href='/activities' passHref>
              <li className={styles.listItem}>活动特惠</li>
            </Link>
            <Link href='/story' passHref>
              <li className={styles.listItem}>品牌故事</li>
            </Link>
          </ul>
        </div>
        <div className={styles.item} ref={icons}>
          {session && session.user.role === 'customer' && (
            <>
              <Link href='/cart' passHref>
                <div className={styles.icon}>
                  <Image src="/img/cart.png" alt="the cart icon" layout='fill' />
                  <div className={styles.counter}>{quantity}</div>
                </div>
              </Link>
              <Link href='/history' passHref>
                <div className={styles.icon}>
                  <Image src='/img/history.png' alt='the history orders page icon' layout='fill' />
                </div>
              </Link>
            </>
          )}
          {session && session.user.role === 'admin' && (
            <Link href='/admin' passHref>
              <div className={styles.icon}>
                <Image src='/img/admin.png' alt='the admin page icon' layout='fill' />
              </div>
            </Link>
          )}
        </div>
        <div className={styles.item}> 
          {session && <SignOutButton belongsTo='main' />}
          {!session && (
            <Link href='/auth' passHref>
              <button className={styles.authButton}>登录</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar