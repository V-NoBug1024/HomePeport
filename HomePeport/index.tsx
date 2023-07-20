import * as React from "react";
import * as qs from "query-string";
import Tab from "./components/Tab";
import Table from "./components/Table2";
import TopTable from "./components/TopTable"
import TipsDialog from "../../components/TipsDialog";
import * as styles from "./index.scss";
import * as api from "../../services/homeReport";

const { useState, useEffect } = React;
export default React.memo(() => {
  const [reportDate, setReportDate] = useState(null)
  const [tabIndex, setTabIndex] = useState(0)
  const [sData, setSData] = useState(null)
  const [cData, setCData] = useState(null)
  const [tableData, setTableData] =  useState([])
  const [topTableData, setTopTableData] = useState([])
  const [dataType, setDataType] = useState(null)
  const [msgid, setMsgid] = useState(null)
  const [pageType, setPagetype] = useState(null)
  const [total, setTotal] = useState(null)
  const [isLoading, setIsloading] = useState(false)
  const [isShowTips, setIsShowTips] = useState(false)

  document.title = "百货数字化销售日报";

  useEffect(() => {
    const params = qs.parse(window.location.search);
    const { msgid,type } = params;
    setPagetype(type)
    // const msgid = '51e966e2-841c-484d-8498-35e8308124fe';
    setIsloading(true)
    setMsgid(msgid)
    getBHReportSale(msgid)
    // getBHReportConnect(msgid, 0)
    // getSHReport(msgid)
  }, [])

  // 公司整体销售快报
  const getBHReportSale = (msgid) => {
    setIsloading(true)
    const p = Promise.race([
     api.getBHReportSale(msgid, true).then((res: any) => {
       setIsloading(false)
       setTabIndex(0)
       if (res) {
        // 报表时间
        setReportDate(res.reportDate)
        // table 数据
        setTableData(res.bHDJSaleDataTypeList)
        // 总体数据
        setTotal(res.bhdjSaleSum)
        setDataType(res.subTitle)
      } else {
        setTableData(null)
        setTotal(null)
      }
    })
    ])
    p.then(res => {
      setIsloading(false)
      console.log(res)
    }).catch(err => {
      setIsloading(false)
     // setError(err.message)
    })
    
  }
 // top榜
  const getBHReportConnect = (msgid, type) => {
    setIsloading(true)
    const p = Promise.race([
      api.getBHReportConnect(msgid, true).then((res: any) => {
        if(type) {
          setTabIndex(1)
          setIsloading(false)
        }
        if (res) {
          setReportDate(res.reportDate)
          setTopTableData(res.bhdjTopDataTypeList)
        }
      })
    ])
    p.then(res => {
      setIsloading(false)
    }).catch(err => {
      setIsloading(false)
    })    
  }

  const getSHReport = (msgid: any) => {
    const p = Promise.race([
      api.getSHReport(msgid, true).then((res: any) => {
        setIsloading(false);
        if (res) {
          // document.title = res.pageTitle
          setDataType(res.dataType);
          setReportDate(res.reportDate);
          // res.bHReportDetailSaleSumGS && setSaleIndex(
          //     res.bHReportDetailSaleSumGS.saleIndex
          // );
          // setTabIndex(1)
          setTableData([...res.shReportDataTypeList]);
          setTotal(res.shReportDetailSumGS);
        } else {
          setTableData(null);
          setTotal(null);
        }
      }),
    ]);
    p.then((res) => {
      setIsloading(false);
      console.log(res);
    }).catch((err) => {
      setIsloading(false);
      //  setError(err.message);
    });
  };

  const bindClick = (index) => {
    console.log("bindindex----------------", index)
    setTabIndex(index)
    if (tabIndex === index) {
      return
    }
    setTotal(null)
    if (index == 1) {
      getBHReportConnect(msgid,1)
    }else if(index == 2){
      getSHReport(msgid)
    } else {
      getBHReportSale(msgid)
    }
  }

   const onClose = () => {
    setIsShowTips(false)
   }


  return (
    <>
    { reportDate && <div className={styles.reportDate}>{reportDate}</div> }
      <Tab bindClick={bindClick} active={tabIndex} sData={sData} cData={cData} pageType={pageType}/>
      {/* 初始化显示数据 */}

      {
        (tabIndex == 0 || tabIndex == 2) && <>
          <Table
              // saleIndex={saleIndex}
              data={tableData}
              active={tabIndex}
              dataType={dataType}
              total={total}
              isLoading={isLoading}
          />
        </>
      }
      {
        tabIndex == 1 && <TopTable data={topTableData}/>
      }
    </>
  );
});

