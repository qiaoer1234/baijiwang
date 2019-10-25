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

    //表单折叠
    var queryBtn = $(".fold-container");
    $(".fold-btn").on("click", function () {
        if (!queryBtn.hasClass("fold-container-block")) {
            $(this).find("span").text("收起");
            $(this).find(".layui-icon").removeClass("layui-icon-down").addClass("layui-icon-up");
            queryBtn.addClass("fold-container-block");
        } else {
            $(this).find("span").text("展开");
            $(this).find(".layui-icon").removeClass("layui-icon-up").addClass("layui-icon-down");
            queryBtn.removeClass("fold-container-block");
        }
    });



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


    //获取报价
    getService = function(sheng, shi, city, bz, fwfl) {
        //console.log(bz)
        var province = sheng || $("#province").val();
        var c = shi || $("#city").val();
        var c_name = city || $("#city option:selected").text();
        var phone = $("#phone").val();
        var status = $(".policy-checkbox input[type='checkbox']").is(":checked");
        var is_agree = status?1:0;

        if (province == "") {
            layer.msg("请选择省", {
                icon: 7
            });
            return false;
        } else if (c == "") {
            layer.msg("请选择城市", {
                icon: 7
            });
            return false;
        } else if (!checkPhone(phone)) {
            layer.msg("抱歉，请正确填写手机号！", {
                icon: 7
            });
            return false;
        } else if (!status) {
            layer.msg("请阅读并勾选企慧网《隐私保护政策》", {
                icon: 7
            });
            return false;
        }
        add_tuiguang(phone,province,c,bz,c_name,is_agree,fwfl);

        return false;
    }

    //添加推广
    add_tuiguang = function(dh,sheng,shi,bz,shi_name,is_agree,fwfl)
    {
        $.ajax({
            url: 'http://120.55.51.34:811/pt_fuwu/add_tuiguang',
            data: {dh:dh,sheng:sheng,shi:shi,bz:bz,shi_name:shi_name,is_agree:is_agree,fwfl:fwfl},
            type: "POST",
            success: function(re) {
                layer.msg(re.msg);
                flag = false;
                if(re.code == 1)
                {
                    location.reload();
                }
            }
        });
    }

    // 请求腾讯地图IP
    var ywlx = 11;
    var p, c, ip;
    function getIpLocation() {
        var data = {
            key: "4V6BZ-VNTR6-Q7SSQ-MHN5C-577GT-MCB57"
        }
        var url = "https://apis.map.qq.com/ws/location/v1/ip";
        data.output = "jsonp";
        $.ajax({
            type: "get",
            dataType: 'jsonp',
            data: data,
            jsonp: "callback",
            jsonpCallback: "QQmap",
            url: url,
            success: function (res) {
                if (res.status == 0) {
                    var datas = res.result;
                    ip = datas.ip;
                    p = datas.ad_info.province;
                    c = datas.ad_info.city;
                }
            }
        });
    }
    getIpLocation();

    subscribe = function() {
        t = $("#tel").val();
        
        if(!regex.isPhone(t)) {
            return layer.msg('输入号码有误', {time:1600});
        }

        data = {p:p,shi:c,t:t,y:ywlx,ip:ip};
        $.ajax({
            type: "GET",
            url: "http://crm.qihui.com/admin_sms/tt",
            dataType: "jsonp",
            jsonp: "callback",
            jsonpCallback:"handler",
            data: data,
            success: function (data) {
                if(data.statusCode == 200){
                    $("#tel").val('');
                    layer.msg("你已经提交成功，我们业务经理会尽快给你回电。");
                }
            },
            error:function(data){  
                $("#tel").val('');
                layer.msg("你已经提交成功，我们业务经理会尽快给你回电。");
            }  
        });
    }

    exports('index', {});
});