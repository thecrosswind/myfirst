var currentPage = 1;
var pageSize = 5;

//封装ajax
function render() {
  $.ajax({
    url: "/category/querySecondCategoryPaging",
    type: "get",
    data: {
      page: currentPage,
      pageSize: pageSize
    },
    dataType: "json",
    success: function(info) {
      console.log(info);
      var htmlStr = template("secondTmp", info);
      $("tbody").html(htmlStr);
      $(".pagination").bootstrapPaginator({
        //设置版本号
        bootstrapMajorVersion: 3,
        // 显示第几页
        currentPage: info.page,
        // 总页数
        totalPages: Math.ceil(info.total / info.size),
        //当单击操作按钮的时候, 执行该函数, 调用ajax渲染页面
        onPageClicked: function(a, s, w, page) {
          // 把当前点击的页码赋值给currentPage, 调用ajax,渲染页面
          currentPage = page;
          render();
        }
      });
    }
  });
}

render();

$("#addBtn").click(function() {
  $("#secondModal").modal("show");
});
