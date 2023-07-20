import * as React from "react";
import * as styles from './index.scss';
import * as statusData from "../../statusData";

interface IProps {
  sData?: any,
  cData?: any,
  active?: any,
  bindClick: React.MouseEventHandler,
  pageType?:any,
}
export default React.memo((props: IProps) => {
  const { TABTITLE } = statusData
  const { sData = null, cData = null, active = 0, bindClick,  pageType} = props
    let pageTypeText = '';
   const handleClick = (e) => {
    const { index } = e.currentTarget.dataset
    bindClick(index)
  }
  return ( 
    <div className={styles.tabWrap}>
      {
        TABTITLE && TABTITLE.length > 0 && TABTITLE.map((item, index) => {
          return (
            item.show &&
            <div className={active == index ? `${styles.item} ${styles.active}` : `${styles.item}`} key={index} data-index={index} onClick={handleClick}>
              {/*<div className={styles.title}>{item.title}</div>*/}
              <div className={styles.title} dangerouslySetInnerHTML={{__html: item.title}}></div>
            </div>
          )
        })
      }
    </div>
  )
})