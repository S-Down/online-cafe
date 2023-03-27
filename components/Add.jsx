import { useState } from 'react'
import styles from '../styles/Add.module.css'
import axios from 'axios'

const Add = ({ setClose, setProductList, modify, setModify, item, base_url }) => {
  const [file, setFile] = useState(null)
  const [name, setName] = useState(modify ? item.name : null)
  const [desc, setDesc] = useState(modify ? item.desc : null)
  const [price, setPrice] = useState(modify ? item.price : [])
  const [tastes, setTastes] = useState(modify ? item.tastes : [])
  const [temp, setTemp] = useState(modify ? item.temp : [])
  const [category, setCategory] = useState(modify ? item.category : [])

  const changePrice = (e, index) => {
    const curPrice = price
    curPrice[index] = e.target.value
    setPrice(curPrice)
  }

  const changeTastes = (e, index) => {
    const checked = e.target.checked
    if (checked) {
      const curTastes = tastes
      curTastes[index] = {
        text: e.target.name,
        img: '/img/sugar.png',
        len: 60 + (index - 0) * 10,
        desc: `饮品甜度选择为${e.target.name}`
      }
      setTastes(curTastes)
    } else {
      const curTastes = tastes
      curTastes[index] = null
      setTastes(curTastes)
    }
  }

  const changeTemp = (e, index) => {
    const checked = e.target.checked
    if(checked) {
      const curTemp = temp
      switch (index) {
        case 0:
          curTemp[0] = {
            text: e.target.name,
            img: '/img/cold-coffee.png',
            len: 80,
            desc: `饮品温度选择为${e.target.name}`
          }
          break;
        case 1:
          curTemp[1] = {
            text: e.target.name,
            img: '/img/normal-coffee.png',
            len: 70,
            desc: `饮品温度选择为${e.target.name}`
          }
          break;
        case 2:
          curTemp[2] = {
            text: e.target.name,
            img: '/img/hot-coffee.png',
            len: 70,
            desc: `饮品温度选择为${e.target.name}`
          }
          break;
        default:
          break;
      }
      setTemp(curTemp)
    } else {
      const curTemp = temp
      curTemp[index] = null
      setTemp(curTemp)
    }
  }

  const changeCategory = (e) => {
    const checked = e.target.checked
    if(checked) {
      setCategory((prev) => [...prev, e.target.name])
    } else {
      setCategory(category.filter(item => item !== e.target.name))
    }
  }

  const handleCreate = async () => {
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "uploads")
    console.log(file)
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dfaetunfy/image/upload",
        data
      )
      const { url } = uploadRes.data
      const newProduct = {
        name,
        img: url,
        desc,
        price,
        tastes,
        temp,
        category
      };
      const product = await axios.post(`${base_url}/api/products`, newProduct)
      setProductList(prev => [...prev, product.data])
      setClose(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdate = async () => {
    const newProduct = {
        name,
        img: item.img,
        desc,
        price,
        tastes,
        temp,
        category
    }
    try {
      const res = await axios.put(`${base_url}/api/products/` + item._id, newProduct)
      setProductList(prev => [res.data, ...prev.filter(
        product => product._id !== item._id
      )])
    } catch (error) {
      console.log(error)
    }
    handleClose()
  }

  const handleClose = () => {
    setModify(false)
    setClose(true)
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span className={styles.closeBtn} onClick={handleClose}>&times;</span>
        <h1 className={styles.title}>{ modify ? `编辑产品${item.name}` : '上架一个新产品'}</h1>
        <div className={styles.item}>
          <label className={styles.label}>选择产品图片</label>
          <input
            className={styles.selectFile}
            type="file"
            disabled={ modify }
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>输入产品名称</label>
          <input 
            className={styles.input}
            defaultValue={ modify ? item.name : '' }
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>输入产品描述信息</label>
          <textarea
            className={styles.input}
            rows={2}
            defaultValue={ modify ? item.desc : '' }
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>设置产品尺寸对应的价格</label>
          <div className={styles.priceContainer}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder='小份'
              defaultValue={ modify && item.price[0] }
              onChange={(e) => changePrice(e, 0)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder='中份'
              defaultValue={ modify && item.price[1] }
              onChange={(e) => changePrice(e, 1)}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder='大份'
              defaultValue={ modify && item.price[2] }
              onChange={(e) => changePrice(e, 2)}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>设置产品甜度</label>
          <div className={styles.extraContainer}>
            <div className={styles.extra}>
              <input
                type="checkbox"
                id="mildlySweet"
                name="三分糖"
                className={styles.checkbox}
                defaultChecked={ modify && tastes[0] }
                onChange={(e) => changeTastes(e, 0)}
              />
              <label htmlFor="mildlySweet" className={styles.extraLabel}>三分糖</label>
            </div>
            <div className={styles.extra}>
              <input
                type="checkbox"
                id="generallySweet"
                name="七分糖"
                className={styles.checkbox}
                defaultChecked={ modify && tastes[1] }
                onChange={(e) => changeTastes(e, 1)}
              />
              <label htmlFor="generallySweet" className={styles.extraLabel}>七分糖</label>
            </div>
            <div className={styles.extra}>
              <input
                type="checkbox"
                id="allSweet"
                name="全糖"
                className={styles.checkbox}
                defaultChecked={ modify && tastes[2] }
                onChange={(e) => changeTastes(e, 2)}
              />
              <label htmlFor="allSweet" className={styles.extraLabel}>全糖</label>
            </div>
          </div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>设置产品温度</label>
          <div className={styles.extraContainer}>
            <div className={styles.extra}>
              <input
                type="checkbox"
                id="cold"
                name="冷饮"
                className={styles.checkbox}
                defaultChecked={ modify && temp[0] }
                onChange={(e) => changeTemp(e, 0)}
              />
              <label htmlFor="cold" className={styles.extraLabel}>冷饮</label>
            </div>
            <div className={styles.extra}>
              <input
                type="checkbox"
                id="normal"
                name="常温"
                className={styles.checkbox}
                defaultChecked={ modify && temp[1] }
                onChange={(e) => changeTemp(e, 1)}
              />
              <label htmlFor="normal" className={styles.extraLabel}>常温</label>
            </div>
            <div className={styles.extra}>
              <input
                type="checkbox"
                id="hot"
                name="热饮"
                className={styles.checkbox}
                defaultChecked={ modify && temp[2] }
                onChange={(e) => changeTemp(e, 2)}
              />
              <label htmlFor="hot" className={styles.extraLabel}>热饮</label>
            </div>
          </div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>设置产品所属类别</label>
          <div className={`${styles.extraContainer} ${styles.category}`}>
            <div className={styles.extra}>
              <input
                type="checkbox"
                id="latte"
                name="拿铁"
                className={styles.checkbox}
                defaultChecked={ modify && category.includes('拿铁') }
                onChange={(e) => changeCategory(e)}
              />
              <label htmlFor="latte" className={styles.extraLabel}>拿铁</label>
            </div>
            <div className={`${styles.extra} ${styles.oat}`}>
              <input
                type="checkbox"
                id="oat"
                name="燕麦制作"
                className={styles.checkbox}
                defaultChecked={ modify && category.includes('燕麦制作') }
                onChange={(e) => changeCategory(e)}
              />
              <label htmlFor="oat" className={styles.extraLabel}>燕麦制作</label>
            </div>
            <div className={styles.extra}>
              <input
                type="checkbox"
                id="espresso"
                name="意式"
                className={styles.checkbox}
                defaultChecked={ modify && category.includes('意式') }
                onChange={(e) => changeCategory(e)}
              />
              <label htmlFor="espresso" className={styles.extraLabel}>意式</label>
            </div>
            <div className={styles.extra}>
              <input
                type="checkbox"
                id="americano"
                name="美式"
                className={styles.checkbox}
                defaultChecked={ modify && category.includes('美式') }
                onChange={(e) => changeCategory(e)}
              />
              <label htmlFor="americano" className={styles.extraLabel}>美式</label>
            </div>
            <div className={styles.extra}>
              <input
                type="checkbox"
                id="ice-cream"
                name="冰淇淋"
                className={styles.checkbox}
                defaultChecked={ modify && category.includes('冰淇淋') }
                onChange={(e) => changeCategory(e)}
              />
              <label htmlFor="ice-cream" className={styles.extraLabel}>冰淇淋</label>
            </div>
            <div className={styles.extra}>
              <input
                type="checkbox"
                id="classic"
                name="经典"
                className={styles.checkbox}
                defaultChecked={ modify && category.includes('经典') }
                onChange={(e) => changeCategory(e)}
              />
              <label htmlFor="classic" className={styles.extraLabel}>经典</label>
            </div>
          </div>
        </div>
        <button className={styles.submitButton} onClick={modify ? handleUpdate : handleCreate}>
          提交
        </button>
      </div>
    </div>
  )
}

export default Add
