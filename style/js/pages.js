// 网站导航
setTimeout(function () {
    var $navigation = $(".navigation-content");
    $(".navigation-wrapper").hover(function () {
        $(this).addClass("hover");
        $navigation.stop().fadeIn(400);
    }, function () {
        $(this).removeClass("hover");
        $navigation.stop().fadeOut(0);
    })
}, 1000);

//select模态框
function selectModal(id) {
    console.log(id);
    var $selectItem = $(id);
    var $selectType = $selectItem.find(".select-type");
    var $selectName = $selectItem.find(".select-name");
    var $selectList = $selectItem.find("li");
    $selectItem.click(function (e) {
        e.stopPropagation();
        $(this).addClass("select-show");
    });
    $(document).click(function () {
        $selectItem.removeClass("select-show");
    })
    $selectList.click(function (e) {
        $(this).addClass("active").siblings().removeClass("active");

        $selectName.text($(this).text());
        $selectType.val($(this).attr("data-sort"));
        e.stopPropagation();
        $selectItem.removeClass("select-show");
        $selectName.removeClass("df-color");
    });
}

//自定义select框
selectModal("#select-company");
//selectModal("#select-hylb");
//selectModal("#select-sxzz");

//实名认证弹框
function popUpOpen(c, s) {
    $(".ad-layer-box").hide();
    $(".ad-layer-box").css("visibility", "visible");
    $(".ad-layer-box").show();
    $("#provform .layui-form-item").show();

    if(c) {
        $("#provform .layui-form-item").eq(0).hide();
    }
    if(s) {
        $("#provform .layui-form-item").eq(2).hide();
    }
}

function popUpClose() {
    $(".city-li").show();
    $(".policy-li").show();
    $("#city-picker-search1").attr("data-city", "");
    $("#phone").val("");
    $(".ad-layer-box").hide();
}
$(".hm-btn").click(function () {
    popUpOpen();
})