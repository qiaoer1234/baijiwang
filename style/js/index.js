layui.define(['layer', 'jquery', 'element'], function (exports) {
    var layer = layui.layer,
        $ = layui.jquery,
        element = layui.element;

    var $navigation = $(".navigation-content");
    $(".navigation-wrapper").hover(function () {
        $(this).addClass("hover");
        $navigation.stop().fadeIn(400);
    }, function () {
        $(this).removeClass("hover");
        $navigation.stop().fadeOut(0);
    });

    //业务地区展开折叠
    $(".recommend-content-more").click(function(){
        if($(this).hasClass("active-icon")){
            $(this).removeClass("active-icon").find("span").text("收起");
            $(this).prev().addClass("recommend-content-limit");
        }else{
            $(this).addClass("active-icon").find("span").text("更多");
            $(this).prev().removeClass("recommend-content-limit");
        }
    })

    // tab 切换
    initTab = function ($navs, $conts, curClsName) {
        $navs.click(function () {
            if ($(this).hasClass(curClsName)) {
                return false
            }
            $navs.removeClass(curClsName)
            $(this).addClass(curClsName)
            var _i = $navs.index($(this))
            $conts.removeClass(curClsName)
            $conts.eq(_i).addClass(curClsName)
        })
    }




    //获取本地时间
    getLocalTime = function (time) {
        time = parseInt(time);
        if(!time) return '/';
        var newDate = new Date(parseInt(time) * 1000);
        return newDate.format('yyyy-MM-dd h:m:s');
    };
    Date.prototype.format = function(format) {
        var date = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S+": this.getMilliseconds()
        };
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in date) {
            if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
            }
        }
        return format;
    };

// 手机号验证
    function checkPhone(phone) {
        if (!(/^1[3456789]\d{9}$/.test(phone))) {
            return false;
        }
        return true;
    }


    exports('index', {});
});