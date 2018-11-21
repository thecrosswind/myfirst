//开启进度条
// NProgress.start();
// //关闭进度条
// NProgress.done();
//
$(document).ajaxStart(function() {
  // console.log("ajaxStart在开始一个ajax请求时触发");
  NProgress.start();
});

$(document).ajaxStop(function() {
  setTimeout(function() {
    NProgress.done();
  }, 500);
});

// console.log(location.href);
if (location.href.indexOf("login.html") === -1) {
  console.log(111);
  $.ajax({
    type: "get",
    url: "/employee/checkRootLogin",
    // dataType: "json",
    success: function(res) {
      if (res.success) {
        console.log("登陆了");
      }

      if (res.error === 400) {
        // 进行拦截, 拦截到登录页
        location.href = "login.html";
      }
    }
  });
}

$(function() {
  $(".category").on("click", function() {
    $(this)
      .next()
      .stop()
      .slideToggle();
  });

  $(".lt_topbar .icon_menu").click(function() {
    $(".lt_aside").toggleClass("hidemenu");
    $(".lt_topbar").toggleClass("hidemenu");
    $(".lt_main").toggleClass("hidemenu");
  });
  //退出功能
  $("#logoutBtn").click(function() {
    $.ajax({
      type: "get",
      url: "/employee/employeeLogout",
      success: function(info) {
        // console.log(info);
        if (info.success) {
          location.href = "login.html";
        }
      }
    });
  });
  //模态框
  $(".icon_logout").on("click", function() {
    $("#modalLogout").modal("show");
  });
});
