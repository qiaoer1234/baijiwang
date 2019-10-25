layui.define(['jquery'], function (exports) {
    var $ = layui.jquery;

    // 正则验证
    regex = {
        isPhone: function (value) {
            //验证手机/座机号
            var tmp = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$|^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$|^0\d{2,3}-?\d{7,8}$/;
            if (tmp.test(value)) {
                return true;
            } else {
                return false;
            }
        }
    }

    // 倒计时
    countDown = function (obj) {
        var yzmBtn = $(obj);
        var count = 60;
        var resend = setInterval(function () {
            count--;
            if (count > 0) {
                yzmBtn.val(count + "秒后重发")
            } else {
                clearInterval(resend);
                yzmBtn.val("获取验证码").removeAttr('disabled style');
            }
        }, 1000)
        yzmBtn.attr('disabled', true).css('cursor', 'not-allowed');
    }

   

    exports('tool', {});
});