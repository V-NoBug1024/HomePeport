// tab标题
import * as React from "react";

const TABTITLE = [
  {
    title: "百货到家<br/>销售日报",
    value: "",
    show: true,
  },
  {
    title: "百货到家<br/>TOP榜",
    value: "",
    show: true,
  },
  {
    title: '百货到家<br/>运营情况',
    value: '',
    show: true
  }
]

// 在线销售比表头
const STITLE = {
  sumName: "bhdjSaleDetailSum",
  listName: "bhdjSaleDetailList",
  title: [
    {
      key: "saleExpr",
      name: "专柜到家配送实收(万)",
    },
    {
      key: "bhdjSale",
      name: "专柜到家实收(万)",
    },
    {
      key: "storeSale",
      name: "全渠道实收(万)",
    },
    {
      key: "saleRadio",
      name: "在线销售占比",
    },
    // {
    //   key: "saleCompLast",
    //   name: "百货到家实收环比",
    // },
    // {
    //   key: "returnPatr",
    //   name: "专柜到家客单量",
    // },
    {
      key: "customSale",
      name: "专柜到家客单价",
    },
  ],
  tips: [
    "1. 专柜到家实收：非自营柜组取当日已发货与已完成退款的订单实收之和，自营柜组取当日已完成与已完成退款的订单实收之和。",
    "2. 专柜到家配送实收：配送方式为快递配送、自配送、同城配送的专柜到家实收",
    "3. 全渠道实收：当日百货线下渠道实收与专柜到家实收之和。",
    "4. 在线销售占比：专柜到家实收/全渠道实收，全渠道实收不含自收银柜组。",
    "5. 专柜到家客单价：专柜到家实收/专柜到家客单量。",
    "6. 所有字段均取 BI系统 12-百货数字化销售日报，分销销售全计入供货门店。",
    "7. 专柜到家客单量：鉴于分销业务，客单量按照分摊比例进行分摊，所以不在此处进行展示，具体客单量计入供货可至小当+订单销售明细查询。",
  ],
};

// 顾客连接表头
const CTITLE = {
  sumName: "bHReportDetailConnectSum",
  listName: "bHReportDetailConnectList",
  title: [
    {
      key: "rateQq",
      name: "累计顾客连接",
    },
    {
      key: "rankQq",
      name: "顾客连接排名",
    },
    {
      key: "isBuyYear",
      name: "累计本年新加会员",
    },
    {
      key: "historyBindYear",
      name: "累计往年新加会员",
    },
    {
      key: "membcntYear",
      name: "累计消费会员",
    },
    {
      key: "isDayYear",
      name: "日本年新加会员",
    },
    {
      key: "historyBindDay",
      name: "日往年新加会员",
    },
    {
      key: "membcntDay",
      name: "日消费会员",
    },
  ],
  tips: [],
};

const DELIVER = {
  sumName: "shReportDetailSum",
  listName: "shReportDetailList",
  title: [
    {
      key: "platformSellingNum",
      name: "平台在售商品数量",
    },
    {
      key: "sellingNum",
      name: "在售商品数量",
    },
    {
      key: "notDeliveryOrdersNum48hour",
      name: "48小时未发货订单数",
    },
    {
      key: "timelyDeliveryRate48hour",
      name: "48小时发货及时率",
    },
    {
      key: "notSelfPickNumOver7day",
      name: "超7日未自提订单数",
    },
    {
      key: "selfPickRate7day",
      name: "7日内自提订单占比",
    },
    {
      key: "unReviewedReturnOrderNum24hour",
      name: "24小时未审核退货单数",
    },
    {
      key: "unReviewedReturnOrderRate24hour",
      name: "24小时已审核退货单占比",
    },
    {
      key: "notConfirmReturnOrderNum5day",
      name: "5日内未确认收货的退货单数",
    },
    {
      key: "confirmReturnOrderRate5day",
      name: "5日内确认收货退货单占比",
    },
    {
      key: "guideRespondRateDay",
      name: "导购已回复聊天占比",
    },
    {
      key: "avgFirstRespondTimeDay",
      name: "导购平均首次回复时长",
    },
  ],
  tips:[
    '本报表为百货到家运营情况日报，展示单日百货到家商品、订单运营情况',
    '1.平台在售商品数量：已上架到店铺的在售商品数；',
    '2.在售商品数量：正在销售的商品数；',
    '3.48小时未发货订单数：超过48小时未发货的订单数；',
    '4.超7日未自提订单数：顾客下单后超过7日未到店自提的订单数；',
    '5.24小时未审核退货单数：顾客发起退货后，导购24小时内未审核的订单数；',
    '6.5日内未确认收货退货单数：顾客将商品寄回柜组，导购在寄回5日后未确认收货的订单数。'
  ]
};

export { TABTITLE, STITLE, CTITLE, DELIVER };
