import { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../../styles/Auth.module.css'
import { signIn, signOut } from 'next-auth/react'
import SignInForm from '../../components/SignInForm'
import SignUpForm from '../../components/SignUpForm'

const Index = ({ base_url }) => {
  const [role, setRole] = useState('customer')
  const [error, setError] = useState({
    status: false,
    message: ''
  })
  const [authError, setAuthError] = useState({
    status: false,
    message: ''
  })
  const [isSignUp, setIsSignUp] = useState(false)

  useEffect(() => {
    if(error.status) {
      setAuthError({ status: false, message: '' })
    }
  }, [error])

  useEffect(() => {
    if(authError.status) {
      setError({ status: false, message: '' })
    }
  }, [authError])

  const handleTabToggle = (e) => {
    const name = e.target.getAttribute('name')
    if(name === 'customer') {
      setError({ status: false, message: '' })
      setAuthError({ status: false, message: '' })
      setRole('customer')
    } else if(name === 'admin') {
      setError({ status: false, message: '' })
      setAuthError({ status: false, message: '' })
      setRole('admin')
      setIsSignUp(false)
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{isSignUp ? '注册新账号' : '登录认证'}</title>
        <meta 
          name='description'
          content='登录及注册页面, 顾客可在此页面进行登录或注册操作, 管理员可在此页面进行注册操作'
        />
      </Head>
      <div className={styles.errorMsgBox} active={`${error.status && error.message !== ''}`} >{error.message}</div>
      <div className={styles.successMsgBox} active={`${!error.status && error.message !== ''}`} >{error.message}</div>
      <div className={styles.authErrorMsgBox} active={`${authError.status && authError.message !== ''}`} >{authError.message}</div>
      <div className={styles.wrapper}>
        <div className={styles.tabBar}>
          <h3 name='customer' className={`${styles.tab} ${role === 'customer' ? styles.active : ''}`} onClick={e => handleTabToggle(e)}>用户</h3>
          <h3 name='admin' className={`${styles.tab} ${role === 'admin' ? styles.active : ''}`} onClick={e => handleTabToggle(e)}>管理员</h3>
        </div>
        <div className={styles.tabPage}>
          {isSignUp && <SignUpForm setIsSignUp={setIsSignUp} error={error} setError={setError} setAuthError={setAuthError} base_url={base_url} />}
          {!isSignUp && <>
            <SignInForm role={role} setIsSignUp={setIsSignUp} signIn={signIn} error={error} setError={setError} setAuthError={setAuthError} />
          </>}
        </div>
      </div>
      <div className={styles.circleWrapper}>
        <div className={styles.circles}>
          <span className={styles.circle}></span>
          <span className={styles.circle}></span>
          <span className={styles.circle}></span>
        </div>
        <div className={styles.circles}>
          <span className={styles.circle}></span>
          <span className={styles.circle}></span>
          <span className={styles.circle}></span>
        </div>
        <div className={styles.circles}>
          <span className={styles.circle}></span>
          <span className={styles.circle}></span>
          <span className={styles.circle}></span>
        </div>
        <div className={styles.circles}>
          <span className={styles.circle}></span>
          <span className={styles.circle}></span>
          <span className={styles.circle}></span>
        </div>
      </div>
    </div>
  )
}

export default Index

export const getServerSideProps = async () => {
  const base_url = process.env.BASE_URL
  return {
    props: {
      base_url: base_url
    }
  }
}