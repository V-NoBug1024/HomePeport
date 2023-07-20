
import * as React from "react";
import * as styles from './index.scss';

interface IProps{
  name:string
}
export default React.memo((props:IProps)=>{
  return (
    <div className={styles.tagWrap}>
      <div className={styles.tag}>{props.name}</div>
    </div>
  )
})