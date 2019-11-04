layui.define(['jquery', 'layer'], function (exports) {
    var $ = layui.jquery;
    var layer = layui.layer;

    var initLoad = '';

    //获取浏览器存的localstorage
    listInfo1 = JSON.parse(localStorage.getItem("type1"));
    listInfo2 = JSON.parse(localStorage.getItem("type2"));
    listInfo3 = JSON.parse(localStorage.getItem("sheng"));

    firstShengZK = JSON.parse(localStorage.getItem("shengZK"));

    if(firstShengZK!=null){
        $('.recommend-content-more').trigger('click');
    }

    //删除单项操作
    singleDel = function (obj) {
        var par = $(obj).parent();
        $(obj).parent().detach();
        if (par.hasClass('fw_f')) {
            $('#fwlx>a').removeClass('on');
            $('#flid').val("");
            localStorage.removeItem("type1");
            localStorage.removeItem("type2");
        } else {
            $('#sheng_list>a').removeClass('on');
            $('#shengid').val("");
            localStorage.removeItem("sheng");
            localStorage.removeItem("shengZK");
        }
    }

    //清空所有
    allDel = function () {
        $(".sx_header-wrapper div").hide();
        $('#fwlx>a').removeClass('on');
        $('#sheng_list>a').removeClass('on');
        $('#fwxm_child').hide();
        $('#flid,#shengid').val("");
        localStorage.removeItem("type1");
        localStorage.removeItem("type2");
        localStorage.removeItem("sheng");
        localStorage.removeItem("shengZK");
    }


    var fwurl = 'http://120.55.51.34:811/pt_yzfws/get_fwxm';
    //初始获取一级分类
    function getInitData(lx) {
        initLoad = layer.load();
        $.ajax({
            type: "post",
            url: fwurl,
            data: {
                lx: lx
            },
            success: function (res) {
                var dataList = res.data;
                var fwstr = '';
                for (var i = 0; i < dataList.length; i++) {
                    fwstr += '<a data-fl="' + dataList[i].id + '" data-title="' +
                        dataList[i].name + '">' + dataList[i].name + '</a>'
                }
                $('#fwlx').append(fwstr);
                //服务商筛选
                if (listInfo1 != null) {
                    $('.fw_lx').empty().text(listInfo1.title).parent('.fw_f').show();
                    $('.fw_xm').empty();
                    for (var i = 0; i < res.count; i++) {
                        var fwlxA = $('#fwlx>a').eq(i).attr('data-fl');
                        if (fwlxA == listInfo1.id) {
                            $("#fwlx>a[data-fl='" + listInfo1.id + "']").addClass('on');
                        }
                    }
                }
                layer.close(initLoad);
            }
        });
    }

    function getSecondData(lx, fid) {
        $.ajax({
            type: "post",
            url: fwurl,
            data: {
                lx: lx,
                fid: fid
            },
            success: function (res) {
                var dataList = res.data;
                var fwstr = '';
                for (var j = 0; j < dataList.length; j++) {
                    fwstr += '<a data-fid="' + dataList[j].fid + '" data-id="' +
                        dataList[j].id + '" data-title="' +
                        dataList[j].name + '">' + dataList[j].name + '</a>';
                }

                layer.close(initLoad);
                return false;
            }
        });
    };
    getInitData(1);

    //服务商一级选中效果 存一级localstorage
/*    parentFw = function (obj) {
        initLoad = layer.load();
        $('#fwlx>a').removeClass('on');
        var index = $(obj).index();
        $(obj).addClass('on');
        var flid = $(obj).attr('data-fl');
        var txt = $(obj).attr('data-title');
        $('.fw_lx').empty().text(txt).parent('.fw_f').show();
        $('.fw_xm').empty();
        $('#flid').val();
        getSecondData(2, flid);
    };*/

    //申请类别选中效果
    parentFw = function (obj) {
        $('#fwlx a').removeClass('on');
        $(obj).addClass('on');
        var lbMsg = $(obj).attr('#fwlx a');

        if($('#fwlx a').hasClass('on')){

            var lb=$('#fwlx a.on').html();
            var str = '<div class="fw_f">申请类别：<span class="fw_lx">' + lb + '</span><span class="del">x</span></div>'
            $('#fw_list').append(str);

        }
    };

    //年份选中效果 存localstorage
    shengFw = function (obj) {
        $('#sheng_list a').removeClass('on');
        $(obj).addClass('on');
        var shengMsg = $(obj).attr('#sheng_list a');

        if($('#sheng_list a').hasClass('on')){
            var years=$('#sheng_list a.on').html();
            // $('#fw_sheng').html(years);
            var str = '<div class="fw_s">申请年份：<span class="fw_sheng">'+ years +'</span> <span class="del">x</span> </div>';
            $('#fw_list').append(str);
        }

    };

    exports('serviceLinkage', {});
});