import styles from '../styles/Auth.module.css'
import { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faCircleDot } from '@fortawesome/free-solid-svg-icons'
import { debounce } from '../lib/helpers'
import axios from 'axios'

const SignUpForm = ({ setIsSignUp, error, setError, setAuthError }) => {
  const name = useRef()
  const email = useRef()
  const pwd = useRef()
  const reEnter = useRef()
  const verifyName = useRef()
  const verifyEmail = useRef()
  const verifyPwd = useRef()
  const verifyReEnter = useRef() 
  const [showPwd, setShowPwd] = useState(false)
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    reEnter: ''
  })

  const checkValueValid = () => {
    name.current.value = userData.name
    email.current.value = userData.email
    pwd.current.value = userData.password
    reEnter.current.value = userData.reEnter

    const nameValid = /.{1,}/
    const emailValid = /\w+[@][\w]+\.\w+$/
    const pswLength = /.{8,}/

    const nValid = nameValid.test(userData.name)
    verifyName.current.setAttribute('valid', `${nValid}`)
    const eValid = emailValid.test(userData.email)
    verifyEmail.current.setAttribute('valid', `${eValid}`)
    const pValid = pswLength.test(userData.password)
    verifyPwd.current.setAttribute('valid', `${pValid}`)
    const rValid = userData.password === userData.reEnter
    verifyReEnter.current.setAttribute('valid', `${rValid}`)
    if(nValid && eValid  && pValid && rValid) {
      setError({ status: false, message: '' })
    } else {
      setError({ status: true, message: '请先完成表格下方的所有前置条件再点击注册按钮' })
    }
  }
  
  useEffect(() => {
    checkValueValid()
  }, [userData])

  const handleShowPwd = () => {
    if(pwd.current.type === 'password') {
      pwd.current.type = 'text'
      reEnter.current.type = 'text'
      setShowPwd(true)
    } else {
      pwd.current.type = 'password'
      reEnter.current.type = 'password'
      setShowPwd(false)
    }
  }

  const handleChange = debounce(e => {
    const value = e.target.value
    const name = e.target.name
    setUserData({ ...userData, [name]: value })
  }, 500)

  const handleToggleSignIn = () => {
    setError({ status: false, message: '' })
    setAuthError({ status: false, message: '' })
    setIsSignUp(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError({ status: false, message: '' })
    if(!error.status) {
      const user = {
        name: userData.name,
        email: userData.email,
        password: userData.password
      }
      try {
        const res = await axios.post('http://localhost:3000/api/auth/signup', user)
        const newUser = res.data
        console.log('user: ', user)
        console.log('newUser: ', newUser)
        setError({
          ...error,
          message: `${newUser.msg}, 请返回登录界面进行登录`
        })
      } catch (error) {
        console.log(error.response.data.msg)
        setAuthError({
          status: true,
          message: error.response.data.msg
        })
      }
    }
  }

  return (
    <form className={styles.form}>
      <div className={styles.inputBox}>
        <input className={styles.input} type='text' name='name' required='required' ref={name} onChange={e => handleChange(e)} /> 
        <span className={styles.text}>用户名</span>
      </div>
      <div className={styles.inputBox}>
        <input className={styles.input} type='email' name='email' required='required' ref={email} onChange={e => handleChange(e)} /> 
        <span className={styles.text}>用户邮箱</span>
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
        <input className={styles.input} type='password' name='reEnter' required='required' ref={reEnter} onChange={e => handleChange(e)} />
        <span className={styles.text}>确认密码</span>
      </div>
      <div className={styles.inputBox}>
        <button className={styles.button} type='submit' onClick={e => handleSubmit(e)} >注册</button>
        <span className={styles.info} onClick={handleToggleSignIn} >
          返回登录界面进行登录
        </span>
      </div>
      <div className={styles.validationBox}>
          <ul className={styles.list}>
            <li className={styles.listItem} valid='false' ref={verifyName} >
              <FontAwesomeIcon icon={faCircleDot} className={styles.listIcon} />
              用户名至少包含1个字符
            </li>
            <li className={styles.listItem} valid='false' ref={verifyEmail} >
              <FontAwesomeIcon icon={faCircleDot} className={styles.listIcon} />
              用户邮箱为合法邮箱地址
            </li>
            <li className={styles.listItem} valid='false' ref={verifyPwd} >
              <FontAwesomeIcon icon={faCircleDot} className={styles.listIcon} />
              密码长度至少为8个字符
            </li>
            <li className={styles.listItem} valid='false' ref={verifyReEnter} >
              <FontAwesomeIcon icon={faCircleDot} className={styles.listIcon} />
              两次输入的密码相匹配
            </li>
          </ul>
        </div>
    </form>
  )
}

export default SignUpForm

