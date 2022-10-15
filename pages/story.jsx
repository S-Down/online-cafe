import styles from '../styles/Story.module.css'
import Image from 'next/image'
import { Parallax } from 'react-scroll-parallax'

const Story = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Parallax  className={styles.title} translateX={[100, -60]}>
          <h2>严选优质咖啡豆 专业化工艺获取至臻原料</h2>
        </Parallax>
        <div className={styles.item}>
          <Parallax className={styles.imgContainer} speed={-2} translateY={[-20, 30]}>
            <div className={styles.img}>
              <Image src="/img/coffee-beans.jpg" alt="描述配图" layout="fill" objectFit="cover" />
            </div>
          </Parallax>
          <Parallax className={styles.desc} translateY={[20, -50]} speed={1}>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam exercitationem repellendus suscipit consequatur maxime dolores! Esse hic minima nam, ex officiis excepturi temporibus quidem autem eligendi deserunt voluptates, repudiandae obcaecati eum dolore minus cupiditate quisquam repellendus in itaque dolores sunt dolorem id nostrum! Minus culpa impedit eveniet libero ipsam perspiciatis recusandae placeat aut labore optio repudiandae illo.
            </p>
          </Parallax>
        </div>
      </div>
      <div className={styles.wrapper}>
        <Parallax  className={styles.title} translateX={[-20, 20]}>
          <h2>采用进口奶源 香醇牛奶与精萃咖啡完美相融</h2>
        </Parallax>
        <div className={styles.item}>
          <Parallax className={styles.imgContainer} speed={-2} translateY={[0, 30]}>
            <div className={styles.img}>
              <Image src="/img/cows.jpg" alt="描述配图" layout="fill" objectFit="cover" />
            </div>
          </Parallax>
          <Parallax className={styles.desc} translateY={[20, -50]}>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam exercitationem repellendus suscipit consequatur maxime dolores! Esse hic minima nam, ex officiis excepturi temporibus quidem autem eligendi deserunt voluptates, repudiandae obcaecati eum dolore minus cupiditate quisquam repellendus in itaque dolores sunt dolorem id nostrum! Minus culpa impedit eveniet libero ipsam perspiciatis recusandae placeat aut labore optio repudiandae illo.
            </p>
          </Parallax>
        </div>
      </div>
      <div className={styles.wrapper}>
        <Parallax  className={styles.title} translateX={[0, -50]}>
          <h2>天然有机燕麦 低脂需求或乳糖不耐受都安心</h2>
        </Parallax>
        <div className={styles.item}>
          <Parallax className={styles.imgContainer} speed={-2} translateY={[0, 30]}>
            <div className={styles.img}>
              <Image src="/img/oats.jpg" alt="描述配图" layout="fill" objectFit="cover" />
            </div>
          </Parallax>
          <Parallax className={styles.desc} translateY={[20, -50]}>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam exercitationem repellendus suscipit consequatur maxime dolores! Esse hic minima nam, ex officiis excepturi temporibus quidem autem eligendi deserunt voluptates, repudiandae obcaecati eum dolore minus cupiditate quisquam repellendus in itaque dolores sunt dolorem id nostrum! Minus culpa impedit eveniet libero ipsam perspiciatis recusandae placeat aut labore optio repudiandae illo.
            </p>
          </Parallax>
        </div>
      </div>
      <div className={styles.wrapper}>
        <Parallax  className={styles.title} translateX={[-20, 20]}>
          <h2>匠心态度制作 只为每一杯饮品都香醇甘美</h2>
        </Parallax>
        <div className={styles.item}>
          <Parallax className={styles.imgContainer} speed={-2} translateY={[0, 30]}>
            <div className={styles.img}>
              <Image src="/img/brewing.jpg" alt="描述配图" layout="fill" objectFit="cover" />
            </div>
          </Parallax>
          <Parallax className={styles.desc} translateY={[20, -50]}>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam exercitationem repellendus suscipit consequatur maxime dolores! Esse hic minima nam, ex officiis excepturi temporibus quidem autem eligendi deserunt voluptates, repudiandae obcaecati eum dolore minus cupiditate quisquam repellendus in itaque dolores sunt dolorem id nostrum! Minus culpa impedit eveniet libero ipsam perspiciatis recusandae placeat aut labore optio repudiandae illo.
            </p>
          </Parallax>
        </div>
      </div>
    </div>
  )
}

export default Story
