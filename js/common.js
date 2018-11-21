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
      console.log(res);
    }
  });
}
