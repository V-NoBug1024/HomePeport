import * as React from 'react';
import * as styles from './index.scss';

interface IProps {
    datas: any;
}
export default React.memo((props: IProps) => {
    // fLogisticsReportDetailList 分组后的详细列表
    const { datas = {} } = props;
    const { bhdjTopDetailList = [] } = datas;
    return (
        <>
            {bhdjTopDetailList.map((item, index) => {
                const element = (
                    <>
                        <tr className={styles.tr1} key={index}>
                            <td className={styles.td1}>{item.dataTypeName}</td>
                            <td className={styles.td2}>{item.saleExpr}</td>
                            <td className={styles.td2_2}>{item.totalSale}</td>
                            {/* <td className={styles.td3}>{item.returnPatr}</td> */}
                            <td className={styles.td4}>{item.customSale}</td>
                        </tr>
                    </>
                );
                return element;
            })}
        </>
    );
});
