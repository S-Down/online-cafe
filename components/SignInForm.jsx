import styles from '../styles/Auth.module.css'
import { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faCircleDot } from '@fortawesome/free-solid-svg-icons'
import { debounce } from '../lib/helpers'
import { useRouter } from 'next/router'

const SignInForm = ({ role, setIsSignUp, signIn, error, setError, setAuthError }) => {
  const pwd = useRef()
  const email = useRef()
  const adminName = useRef()
  const verifyEmail = useRef()
  const verifyPwd = useRef() 
  const [showPwd, setShowPwd] = useState(false)
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })
  const [adminData, setAdminData] = useState({
    name: '',
    password: ''
  })
  const router = useRouter()

  const checkValueValid = () => {
    if(role === 'customer') {
      email.current.value = userData.email
      pwd.current.value = userData.password

      const emailValid = /\w+[@][\w]+\.\w+$/
      const pswLength = /.{8,}/

      const eValid = emailValid.test(userData.email)
      verifyEmail.current.setAttribute('valid', `${eValid}`)
      const pValid = pswLength.test(userData.password)
      verifyPwd.current.setAttribute('valid', `${pValid}`)
      if(eValid  && pValid) {
        setError({ status: false, message: '' })
      } else {
        setError({ status: true, message: '请先完成表格下方的所有前置条件再点击登录按钮' })
      }
    } else if(role === 'admin') {
      adminName.current.value = adminData.name
      pwd.current.value = adminData.password
    }
  }

  useEffect(() => {
    checkValueValid()
  }, [userData])

  useEffect(() => {
    setAdminData({ name: '', password: '' })
    setUserData({ email: '', password: '' })
  }, [role])

  useEffect(() => {
    router.prefetch('/admin')
    router.prefetch('/history')
    verifyEmail.current.style.visibility = 'visible'
    verifyPwd.current.style.visibility = 'visible'
  }, [])

  const handleShowPwd = () => {
    if(pwd.current.type === 'password') {
      pwd.current.type = 'text'
      setShowPwd(true)
    } else {
      pwd.current.type = 'password'
      setShowPwd(false)
    }
  }

  const handleChange = debounce(e => {
    const value = e.target.value
    const name = e.target.name

    if(name === 'email') {
      setUserData({ ...userData, email: value })
    } else if(name === 'password') {
      if(role === 'customer') {
        setUserData({ ...userData, password: value })
      } else {
        setAdminData({ ...adminData, password: value })
      }
    } else if (name === 'name') {
      setAdminData({ ...adminData, name: value })
    }
  }, 500)

  const handleToggleSignUp = () => {
    setError({ status: false, message: '' })
    setAuthError({ status: false, message: '' })
    setIsSignUp(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError({ status: false, message: '' })
    if(!error.status) {
      if(role === 'admin') {
        const result = await signIn('credentials', {
          role: role,
          name: adminData.name,
          password: adminData.password,
          redirect: false
        })
        if(!result.ok) {
          setAuthError({ status: true, message: result.error })
        } else {
          router.push('/admin')
        }
      } else if(role === 'customer') {
        const result = await signIn('credentials', {
          role: role,
          email: userData.email,
          password: userData.password,
          redirect: false
        })
        if(!result.ok) {
          setAuthError({ status: true, message: result.error })
        } else {
          // back to where user starts logging in cuz unauthorized
          router.back()
        }
      }
    }
  }

  return (
    <form className={styles.form}>
      <div className={styles.inputBox}>
        { role === 'customer' && <>
          <input className={styles.input} type='email' name='email' required='required' ref={email} onChange={e => handleChange(e)} /> 
          <span className={styles.text}>用户邮箱</span>
        </>}
        { role === 'admin' && <>
          <input className={styles.input} type='text' name='name' required='required' ref={adminName} onChange={e => handleChange(e)} /> 
          <span className={styles.text}>管理员用户名</span>
        </>}
      </div>  
      <div className={styles.inputBox}>
        <input className={styles.input} type='password' name='password' required='required' ref={pwd} onChange={e => handleChange(e)} />
        <span className={styles.text}>用户密码</span>
        <span className={styles.toggleBtn} onClick={handleShowPwd} >
          {!showPwd && <FontAwesomeIcon icon={faEye} className={styles.toggleIcon} />}
          {showPwd && <FontAwesomeIcon icon={faEyeSlash} className={styles.toggleIcon} />}
        </span>
      </div>
      <div className={styles.inputBox}>
        <button className={styles.button} type='submit' onClick={e => handleSubmit(e)} >登录</button>
        { role === 'customer' && <span className={styles.info} onClick={handleToggleSignUp} >
          还没有账号? 点击进行注册
        </span> }
      </div>
      {role === 'customer' && (
        <div className={styles.validationBox}>
          <ul className={styles.list}>
            <li className={styles.listItem} valid='false' ref={verifyEmail} style={{ visibility: 'hidden' }} >
              <FontAwesomeIcon icon={faCircleDot} className={styles.listIcon} />
              用户邮箱为合法邮箱地址
            </li>
            <li className={styles.listItem} valid='false' ref={verifyPwd} style={{ visibility: 'hidden' }} >
              <FontAwesomeIcon icon={faCircleDot} className={styles.listIcon} />
              密码长度至少为8个字符
            </li>
          </ul>
        </div>
      )}
    </form>
  )
}

export default SignInForm