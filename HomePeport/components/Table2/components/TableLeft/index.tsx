import * as React from "react";
import * as styles from "./index.scss";
import * as statusData from "../../../../statusData";
import { minify } from "uglify-js";

interface IProps {
  titles: any,
  data: any,
  fixedTop?: any,
  total?: any,
  bindClick?: React.MouseEventHandler,
  fixedleft?: any,
  active?:any,
}
export default React.memo((props: IProps) => {
  // 每个分组的详细列表
  const {
    data = [],
    titles = "",
    total = null,
    fixedTop = 0,
    bindClick,
    fixedleft = 0,
    active,
  } = props;
  const { DELIVER, STITLE } = statusData

  const getData = () => {

    let data = active == 2 ? DELIVER : STITLE;

    return {
      listName: data.listName,
      sumName: data.sumName
    }
  }
    
  const { sumName, listName } = getData()

  const isShowMore = (e) => {
    const { index } = e.currentTarget.dataset
    bindClick(index)
  }

  return (
    <div
      className={
        fixedleft > 10 ? `${styles.wrap} ${styles.shadow}` : `${styles.wrap}`
      }
    >
      <div
        className={
          fixedTop > 1 ? `${styles.title} ${styles.fixed}` : `${styles.title}`
        }
      >
        <tr className={styles.tr}>
          <td className={styles.td}>
            <span className={styles.tag}>{titles}</span>
          </td>
        </tr>
      </div>
      <div
        className={styles.content}
        style={fixedTop > 1 ? { marginTop: `${-fixedTop}px` } : {}}
      >
        {data &&
          data.length > 0 &&
          data.map((item, index) => {
            if (item) {
              const list = item[listName] || null;
              const sum = item[sumName] || null;
              return (
                <tr className={styles.tr} key={index}>
                  {sum &&
                    (list && list.length > 0 ? (
                      <td className={styles.item}>
                        <div
                          className={
                            item.show ? `${styles.tagUp}` : `${styles.tag}`
                          }
                          data-index={index}
                          onClick={e => isShowMore(e)}
                        >
                          <span className={styles.text}>
                            {sum.dataTypeName}
                          </span>
                        </div>
                      </td>
                    ) : (
                      <td className={styles.item}>
                        <span className={styles.name}>{sum.dataTypeName}</span>
                      </td>
                    ))}
                  {list &&
                    list.length > 0 &&
                    list.map((_item, _index) => {
                      return (
                        item.show && (
                          <td
                            className={`${styles.item} ${styles.detail}`}
                            key={_index}
                          >
                            {_item.dataTypeName}
                          </td>
                        )
                      );
                    })}
                </tr>
              );
            }
          })}
        {total && (
          <tr
            className={`${styles.tr} ${styles.total}`}
            style={{ background: "transparent", borderColor: "transparent" }}
          >
            <td className={styles.item}>{total.dataTypeName}</td>
          </tr>
        )}
      </div>
    </div>
  );
});
