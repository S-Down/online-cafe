import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Featured.module.css'


const Featured = () => { 
  const images = [
    "/img/featured-1.jpg",
    "/img/featured-2.jpg",
    "/img/featured-3.jpg"
  ]

  const [ index, setIndex ] = useState(0);

  const handleArrow = (direction) => {
    if(direction === "left") {
      setIndex(index !== 0 ? index - 1 : 2)
    } else if(direction === "right") {
      setIndex(index !== 2 ? index + 1 : 0)
    }
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.arrowContainer} style={{left: 0}} onClick={() => handleArrow("left")}>
        <Image src="/img/left-arrow.png" alt="the left arrow icon" layout="fill" />
      </div>
      <div className={styles.wrapper} style={{transform: `translateX(${-100 * index}vw)`}}>
        { images.map((img, i) => (
          <div className={styles.imgContainer} key={i}>
            <Image src={img} alt="the slider pic" layout="fill" objectFit="cover" />
          </div>
        ))}
      </div>
      <div className={styles.arrowContainer} style={{right: 0}} onClick={() => handleArrow("right")}>
        <Image src="/img/right-arrow.png" alt="the right arrow icon" layout="fill" />
      </div>
    </div>
  )
}

export default Featured