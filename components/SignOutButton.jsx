import { signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router'
import styles from '../styles/SignOutBtn.module.css'

const SignOutButton = ({ belongsTo }) => {
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/auth')
  }, [])

  const handleSignOut = async (e) => {
    e.preventDefault();
    const data = await signOut({ redirect: false })
    router.push('/auth')
  }

  return (
    <button className={ belongsTo === 'main' ? styles.mainAuthButton : styles.sideAuthButton} onClick={e => handleSignOut(e)}>登出</button>
  )
}

export default SignOutButton
