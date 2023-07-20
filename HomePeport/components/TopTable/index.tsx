import * as React from 'react';
import * as styles from './index.scss';
import ListContent from './ListContent';
import GroupsTag from './GroupsTag';
interface IProps {
    data: any;
}

export default React.memo((props: IProps) => {
    const contentList = props.data;
    return (
        <>
            <div className={styles.wrap}>
                <div className={styles.content}>
                    <table cellSpacing={0} cellPadding={0} className={styles.table}>
                        {contentList.map((item, index) => {
                            return (
                                <>
                                    <GroupsTag name={item.dataType} />
                                    <div className={styles.title}>
                                        <tr className={styles.tr}>
                                            <td className={styles.td1}>
                                                <span
                                                    style={{
                                                        backgroundColor: '#fe981e',
                                                        padding: '3px',
                                                        borderRadius: '2px',
                                                        wordBreak: 'keep-all',
                                                    }}
                                                >
                                                    {item.tableTitle}
                                                </span>
                                            </td>
                                            <td className={styles.td2}>配送实收(万)</td>
                                            <td className={styles.td2_2}>实收(万)</td>
                                            {/* <td className={styles.td3}>客单量</td> */}
                                            <td className={styles.td4}>客单价</td>
                                        </tr>
                                    </div>
                                    <ListContent datas={item} key={index} />
                                </>
                            );
                        })}
                    </table>
                </div>
            </div>
        </>
    );
});
