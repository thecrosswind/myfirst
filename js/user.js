//动态渲染数据

var currentPage = 1;
var pageSize = 5;
var currentId = 0;
var isDetele = 0;
function render() {
  $.ajax({
    type: "get",
    url: "/user/queryUser",
    data: {
      page: currentPage,
      pageSize: pageSize
    },
    dataType: "json",
    success: function(info) {
      // console.log(info);
      var htmlStr = template("tmp", info);
      $("tbody").html(htmlStr);
      $(".pagination").bootstrapPaginator({
        //设置版本号
        bootstrapMajorVersion: 3,
        // 显示第几页
        currentPage: info.page,
        // 总页数
        totalPages: Math.ceil(info.total / info.size),
        //当单击操作按钮的时候, 执行该函数, 调用ajax渲染页面
        onPageClicked: function(a, v, c, page) {
          // 把当前点击的页码赋值给currentPage, 调用ajax,渲染页面
          // console.log(page);
          currentPage = page;
          render();
        }
      });
    }
  });
}
render();

//禁用启用按钮
$("tbody").on("click", ".btn", function() {
  // console.log(this);
  //模态框
  $("#modalUser").modal("show");
  currentId = $(this)
    .parent()
    .data("id");
  isDetele = $(this).text() == "禁用" ? 0 : 1;
  console.log(isDetele);
});

//
$("#submitBtn").click(function() {
  $.ajax({
    type: "post",
    url: "/user/updateUser",
    data: {
      id: currentId, // 用户id
      isDelete: isDetele // 将用户改成什么状态, 1启用, 0禁用
    },
    dataType: "json",
    success: function(info) {
      // console.log(info);
      if (info.success) {
        $("#modalUser").modal("hide");
        render();
      }
    }
  });
});
