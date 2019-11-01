/**
 * date:2019/10/22
 * author:Mr.Wuyadong
 * description:layui 框架扩展
 */
layui.define(["jquery", "layer", 'form'], function (exports) {
    var $ = layui.$,
        layer = layui.layer,
        form = layui.form;

    layuiUser = new function() {

        // 初始化
        this.init = function(url) {
            var loading = layer.load(0, {shade: false, time: 2000});
            layuiUser.initContent(url, false);
            layer.close(loading);
        }

        // 初始化内容信息
        this.initContent = function(href, isHash) {
            var container = '#layuiuser-content-page';
            var v = new Date().getTime();

            $(container).html('');
            $.ajax({
                url: href.indexOf("?") > -1 ? href + '&v=' + v : href + '?v=' + v,
                type: 'get',
                dataType: 'html',
                success: function (data) {
                    if (isHash == undefined || isHash == true) {
                        window.location.hash =  href;
                    }
                    $(container).html(data);
                    form.render();
                },
                error: function (xhr, textstatus, thrown) {
                    //return layuimini.msg_error('Status:' + xhr.status + '，' + xhr.statusText + '，请稍后再试！');
                }
            });

        }

    };

    // 打开新窗口
    $('body').on('click', '[data-one-page]', function(){
        var loading = layer.load(0, {shade: false, time: 2000});

        $('.sidebar-items dd a').removeClass('current');
        $(this).addClass('current');

        var href = $(this).attr('data-one-page');
        layuiUser.initContent(href);
        layer.close(loading);
    });


    exports("layuiUser", layuiUser);
});