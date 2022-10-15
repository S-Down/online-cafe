import styles from '../styles/ActivityCard.module.css'
import Image from 'next/image'

const ActivityCard = ({ activity, setActivity, setClose }) => {
  const handleClick = () => {
    setActivity(activity)
    setClose(false)
  }

  return (
    <div className={styles.container} style={{ backgroundImage: activity.bg }}>
      <div className={styles.icons}>
        {activity.imgs.map((img, index) => (
          <div className={styles.icon} key={index}>
            <Image src={img} layout='fill' objectFit='cover' />
          </div>
        ))}
      </div>
      <div className={styles.info}>
        <h4 className={styles.title}>{activity.title}</h4>
        <p className={styles.desc}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere debitis dicta esse fugit ipsa distinctio repellat dolores similique et aliquam voluptates quasi, ab provident. Iste pariatur tempore corporis harum repellat.</p>
        <button className={styles.button} onClick={handleClick} >查看更多 <span className={styles.rightIcons} data-text=">>>>">&gt;&gt;&gt;&gt;</span></button>
      </div>
    </div>
  )
}

export default ActivityCard
