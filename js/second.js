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
      // console.log(info);
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
  $.ajax({
    url: "/category/queryTopCategoryPaging",
    type: "get",
    data: {
      page: 1,
      pageSize: 100
    },
    dataType: "json",
    success: function(res) {
      // console.log(res);
      var htmlStr = template("dropdownTmp", res);
      $(".dropdown-menu").html(htmlStr);
    }
  });
});
$(".dropdown-menu").on("click", " a", function() {
  var ts = $(this).text();
  $("#dropdownText").text(ts);

  var id = $(this).data("id");

  $('[name="categoryId"]').val(id);

  $("#form")
    .data("bootstrapValidator")
    .updateStatus("categoryId", "VALID");
});

$("#fileupload").fileupload({
  dataType: "json",
  //e：事件对象
  //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
  done: function(e, data) {
    var result = data.result;
    // console.log(result);
    var picUrl = result.picAddr;
    $("#imgBox img").attr("src", picUrl);
    $('[name="brandLogo"]').val(picUrl);
  }
});

$("#form").bootstrapValidator({
  //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
  excluded: [],

  //2. 指定校验时的图标显示，默认是bootstrap风格
  feedbackIcons: {
    valid: "glyphicon glyphicon-ok",
    invalid: "glyphicon glyphicon-remove",
    validating: "glyphicon glyphicon-refresh"
  },

  //3. 指定校验字段
  fields: {
    //校验用户名，对应name表单的name属性
    categoryId: {
      validators: {
        //不能为空
        notEmpty: {
          message: "请输入一级分类"
        }
      }
    },
    brandName: {
      validators: {
        notEmpty: {
          message: "请输入二级分类"
        }
      }
    },
    brandLogo: {
      validators: {
        notEmpty: {
          message: "请上传图片"
        }
      }
    }
  }
});

//渲染数据

$("#form").on("success.form.bv", function(e) {
  e.preventDefault();
  //使用ajax提交逻辑
  $.ajax({
    url: "/category/addSecondCategory",
    type: "post",
    data: {
      brandName: $('[name="brandName"]').val(),
      categoryId: $('[name="categoryId"]').val(),
      brandLogo: $('[name="brandLogo"]').val(),
      hot: $('[name="hot"]').val()
    },
    dataType: "json",
    success: function(info) {
      console.log(info);
      if (info.success) {
        $("#secondModal").modal("hide");
        render();
        $("#form")
          .data("bootstrapValidator")
          .resetForm(true);
        $("#dropdownText").text("请选择一级分类");
        $("#imgBox img").attr("src", "./images/none.png");
      }
    }
  });
});
