$(function() {
  var myChart = echarts.init(document.querySelector(".echarts_1"));
  // 指定图表的配置项和数据
  var option = {
    title: {
      text: "2018年注册人数"
    },
    tooltip: {},
    legend: {
      data: ["人数", "销量"]
    },
    xAxis: {
      data: ["1月", "2月", "3月", "4月", "5月", "6月"]
    },
    yAxis: {},
    series: [
      {
        name: "人数",
        type: "bar",
        data: [500, 250, 360, 100, 100, 200]
      },
      {
        name: "销量",
        type: "bar",
        data: [500, 200, 360, 120, 300, 400]
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);

  var echarts2 = echarts.init(document.querySelector(".echarts_2"));
  var option2 = {
    title: {
      text: "热门品牌销售",
      subtext: "2018年11月",
      x: "center"
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: "vertical",
      left: "left",
      data: ["耐克", "阿迪", "阿迪王", "老北京", "老太太"]
    },
    series: [
      {
        name: "热门品牌",
        type: "pie",
        radius: "55%",
        center: ["50%", "60%"],
        data: [
          { value: 335, name: "耐克" },
          { value: 310, name: "阿迪" },
          { value: 234, name: "阿迪王" },
          { value: 135, name: "老北京" },
          { value: 1548, name: "老太太" }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "yellow"
          }
        }
      }
    ]
  };
  echarts2.setOption(option2);
});
