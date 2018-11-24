var currentPage = 1;
var pageSize = 2;
var picAddr = [];
//
function render() {
  $.ajax({
    url: "/product/queryProductDetailList",
    type: "get",
    data: {
      page: currentPage,
      pageSize: pageSize
    },
    dataType: "json",
    success: function(res) {
      // console.log(res);
      var htmlStr = template("productTmp", res);
      $("tbody").html(htmlStr);
      $(".pagination").bootstrapPaginator({
        //设置版本号
        bootstrapMajorVersion: 3,
        // 显示第几页
        currentPage: res.page,
        // 总页数
        totalPages: Math.ceil(res.total / res.size),
        //当单击操作按钮的时候, 执行该函数, 调用ajax渲染页面
        onPageClicked: function(a, v, w, page) {
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
  $("#productModal").modal("show");

  $.ajax({
    type: "get",
    url: "/category/querySecondCategoryPaging",
    data: {
      page: 1,
      pageSize: 60
    },
    dataType: "json",
    success: function(info) {
      var htmlStr = template("dropdownTmp", info);
      $(".dropdown-menu").html(htmlStr);
    }
  });
});

$(".dropdown-menu").on("click", "a", function() {
  var ts = $(this).text();
  // console.log(ts);
  $("#dropdownText").text(ts);
  var id = $(this).data("id");
  $('[name="brandId"]').val(id);
  $("#form")
    .data("bootstrapValidator")
    .updateStatus("brandId", "VALID");
});

$("#fileupload").fileupload({
  dataType: "json",
  //e：事件对象
  //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
  done: function(e, data) {
    // console.log(data);
    var picObj = data.result;
    picAddr.unshift(picObj);
    // console.log(picAddr);
    var picUrl = picObj.picAddr;
    $("#imgBox").prepend('<img src="' + picUrl + '" style="width: 100px;">');

    if (picAddr.length > 3) {
      picAddr.pop();
      $("#imgBox img")
        .eq($("#imgBox img").length - 1)
        .remove();
    }
    if (picAddr.length == 3) {
      $("#form")
        .data("bootstrapValidator")
        .updateStatus("picStatus", "VALID");
    }
  }
});

//使用表单校验插件
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
    brandId: {
      validators: {
        //不能为空
        notEmpty: {
          message: "请选择二级分类"
        }
      }
    },
    brandName: {
      validators: {
        //不能为空
        notEmpty: {
          message: "请选择二级分类"
        }
      }
    },
    proDesc: {
      validators: {
        notEmpty: {
          message: "请输入商品描述"
        }
      }
    },
    num: {
      validators: {
        notEmpty: {
          message: "请输入商品库存"
        },
        regexp: {
          regexp: /^[1-9]\d*$/,
          message: "商品库存必须是非零开头的数字"
        }
      }
    },
    size: {
      validators: {
        notEmpty: {
          message: "请输入商品尺码"
        },
        regexp: {
          regexp: /^\d{2}-\d{2}$/,
          message: "必须是xx-xx的格式, xx是两位数字, 例如: 36-44"
        }
      }
    },
    oldPrice: {
      validators: {
        notEmpty: {
          message: "请输入商品原价"
        }
      }
    },
    price: {
      validators: {
        notEmpty: {
          message: "请输入商品现价"
        }
      }
    },
    picStatus: {
      validators: {
        notEmpty: {
          message: "请上传3张图片"
        }
      }
    }
  }
});

$("#form").on("success.form.bv", function(e) {
  e.preventDefault();
  //使用ajax提交逻辑
  var picStr = $("#form").serialize();

  picStr +=
    "$picName1=" + picAddr[0].picName + "$picAddr1=" + picAddr[0].picAddr;
  picStr +=
    "$picName1=" + picAddr[1].picName + "$picAddr1=" + picAddr[1].picAddr;
  picStr +=
    "$picName1=" + picAddr[2].picName + "$picAddr1=" + picAddr[2].picAddr;
  $.ajax({
    type: "post",
    url: "/product/addProduct",
    data: picStr,
    dataType: "json",
    success: function(res) {
      // console.log(res);
      if (res.success) {
        $("#productModal").modal("hide");
        currentPage = 1;
        render();
        $("#form")
          .data("bootstrapValidator")
          .resetForm(true);
        $("#dropdownText").text("请选择二级分类");
        picAddr = [];
        $("#imgBox img").remove();
      }
    }
  });
});
