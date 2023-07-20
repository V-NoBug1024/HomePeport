import * as React from "react";
import * as styles from "./index.scss";
import * as statusData from "../../../../statusData";

interface IProps {
  data: any,
  total?: any,
  fixedTop?: any,
  fixedleft?: any,
  itemWidth?: any,
    active?:any,
}

export default React.memo((props: IProps) => {

  // 每个分组的详细列表
  const {
    data = [],
    total = null,
    fixedTop = 0,
    fixedleft = 0,
    itemWidth,
      active,
  } = props;
  const { DELIVER, STITLE } = statusData;
  
  const getData = () => {
      let data = active == 2 ? DELIVER : STITLE;
    return {
      titles: data.title,
      listName: data.listName,
      sumName: data.sumName
    }
  }
    
  const { titles = [],  sumName, listName } = getData()
  return (
    <div className={styles.wrap}>
      <div
        className={
          fixedTop > 1 ? `${styles.title} ${styles.fixed}` : `${styles.title}`
        }
        style={
          fixedTop > 1 && fixedleft > 10
            ? {
                marginLeft: `${-fixedleft}px`,
                width: `${titles.length * 86}px`
              }
            : { width: `${titles.length * 86}px` }
        }
      >
        <tr className={styles.tr}>
          {titles &&
            titles.length > 0 &&
            titles.map((item, index) => {
              return (
                <td
                  className={styles.item}
                  key={index}
                  style={{ width: `${itemWidth}px` }}
                >
                  {item.name}
                </td>
              );
            })}
        </tr>
      </div>
      <div className={styles.content}>
        {data &&
          data.length > 0 &&
          data.map((item, index) => {
            if (item) {
              const list = item[listName] || null;
              const sum = item[sumName] || null;
              return (
                // div key={index} className={styles.list}
                <>
                  <tr className={styles.tr} key={index}>
                    {sum && (
                      <td className={styles.sumItem}>
                        <div className={styles.tag}>
                          <span className={styles.text}>
                            {sum.dataTypeName}
                          </span>
                        </div>
                      </td>
                    )}
                    {titles.map((_item, _index) => {
                      return (
                        sum && (
                          <td key={_index}>
                            <div className={styles.item}>
                              {sum[_item.key] || "-"}
                            </div>
                          </td>
                        )
                      );
                    })}
                  </tr>
                  {list &&
                    list.length > 0 &&
                    list.map((_item2, _index2) => {
                      return (
                        item.show && (
                          <tr className={styles.tr} key={_index2}>
                            <td className={styles.sumItem}>
                              <div className={styles.detail}>
                                {_item2.dataTypeName}
                              </div>
                            </td>
                            {titles.map((_item3, _index3) => {
                              return (
                                <td
                                  className={`${styles.item} ${styles.detail}`}
                                  key={_index3}
                                >
                                  <div className={styles.item}>
                                    {_item2[_item3.key] || "-"}
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                        )
                      );
                    })}
                </>
              );
            }
          })}
        {total && (
          <div className={`${styles.list} ${styles.total}`}>
            <tr className={styles.tr}>
              {titles.map((item, index) => {
                return (
                  <td key={index}>
                    <div className={styles.item}>{total[item.key]}</div>
                  </td>
                );
              })}
            </tr>
          </div>
        )}
      </div>
    </div>
  );
});
