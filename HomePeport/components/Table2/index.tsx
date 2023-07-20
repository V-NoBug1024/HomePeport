import * as React from "react";
import * as styles from "./index.scss";
import TableLeft from "./components/TableLeft";
import TableRight from "./components/TableRight";
import * as statusData from "../../statusData";
import TipDialogFixed from "../../../../components/TipDialogFixed";
import { throttle, stabilization } from "@utils/throttlingStabilization.ts";

interface IProps {
  data: any;
  dataType: any;
  // saleIndex: any;
  total?: any;
  isLoading?: any;
  itemWidth?: any;
  active?: any;
}

const { useState, useEffect } = React;
export default React.memo((props: IProps) => {
  const [isFixedTop, setIsFixedTop] = useState(0);
  const [isFixedLeft, setIsFixedLeft] = useState(0);
  const [list, setList] = useState([]);
  const [isShowTips, setIsShowTips] = useState(false);
  const [tips, setTips] = useState(null);
  const [height, setHeight] = useState(null);

  const {
    data,
    dataType,
    total,
    isLoading = false,
    itemWidth = 105,
    // saleIndex,
    active
  } = props;
  const {
    DELIVER,
    STITLE,
  } = statusData;

  useEffect(() => {
    setList(data);
    let key = {tips:[]};
    if(active == 2){
      key = DELIVER
    }else{
      key = STITLE
    }
    setTips(key.tips);
    setIsFixedTop(0);
  }, [data]);

  const handleBodyScrollTop = (e: any) => {
    const { scrollTop } = e.target;
    setIsFixedTop(scrollTop)
    // stabilization(50, null).then(() => setIsFixedTop(scrollTop));
  };
  const handleBodyScrollLeft = (e: any) => {
    // const { scrollLeft } = e.target
    // setIsFixedLeft(scrollLeft)
  };

  const bindLeftClick = index => {
    data[index].show = !data[index].show;
    setList([...data]);
  };

  return isLoading ? (
    <div className={styles.noData}>努力加载中...</div>
  ) : list && list.length > 0 ? (
    <>
      <div
        className={styles.tableWrap}
        style={{ marginTop: `${!tips ? 10 : 5}px` }}
        onScroll={(event) => handleBodyScrollTop(event)}
      >
        <div
          className={`${styles.leftContent}`}
        >
          <TableLeft
            titles={dataType}
            fixedTop={isFixedTop}
            fixedleft={isFixedLeft}
            data={list}
            bindClick={bindLeftClick}
            total={total}
            active={active}
          />
        </div>
        <div
          className={styles.right}
          onScroll={(event) => handleBodyScrollLeft(event)}
        >
          <div
            className={`${styles.rightContent}`}
          >
            <TableRight
              fixedTop={isFixedTop}
              fixedleft={isFixedLeft}
              data={list}
              itemWidth={itemWidth}
              total={total}
              active={active}
            />
          </div>
        </div>
      </div>
      {/*{saleIndex && (*/}
      {/*    <div className={styles.saleIndex}> 公司在线销售指数： {saleIndex}</div>*/}
      {/*)}*/}

      {tips && tips.length > 0 && (
          <div className={styles.tipsText} onClick={() => setIsShowTips(true)}>
            <div>统计口径说明</div>
            <div className={styles.tipsImg}>
              <img
                  className={styles.img}
                  src={require(`../../../../assets/images/icon_help_dark.png`)}
              />
            </div>
          </div>
      )}
      <TipDialogFixed
          cancelBtn={false}
          visible={isShowTips}
          okText="关闭"
          onOk={() => setIsShowTips(false)}
          title="统计口径说明"
      >
        <div className={styles.tips}>
          {tips &&
          tips.length > 0 &&
          tips.map((v, index) => {
            return <div key={index}>{v}</div>;
          })}
        </div>
      </TipDialogFixed>
    </>
  ) : (
    <div className={styles.noData}>
      <img
        style={{ width: "50px" }}
        src={require("assets/images/icon_nodata.png")}
      />
      <div className={styles.nodataTips}>暂无数据</div>
    </div>
  );
});
