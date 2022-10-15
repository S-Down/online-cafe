import styles from '../styles/Add.module.css'

const AddButton = ({ setClose }) => {
  return (
    <div className={styles.mainAddButton} onClick={() => setClose(false)}>
      <span>+</span>
      <p className={styles.tooltipText}>点击添加新的产品</p>
    </div>
  )
}

export default AddButton