/*layui.define(['jquery'], function (exports) {
    var $ = layui.jquery;*/
var Isauth ='';
var countryinit ='';
var aptitude='1';;
var enameid='';
var guides = '';
var deng_sort='';
var do_key='';
var search_result=null;
var lod_search_sort='';
var old_goods='';
var isproxy='-1';
var old_one_img='';
var old_two_img='';
var base=Number('300');
var dpri =Number('699') ;
var add =Number('30') ;
var notarizaprice=Number('35');
var ExtraPrice='';
var classes = { "01": "化学原料", "02": "颜料油漆", "03": "化妆品", "04": "燃料油脂", "05": "医药", "06": "五金金属", "07": "机械设备", "08": "手工器械", "09": "电子电脑", "10": "医疗器械", "11": "家用电器", "12": "运输工具", "13": "军火烟火", "14": "珠宝钟表", "15": "乐器", "16": "办公文具", "17": "橡胶制品", "18": "皮革箱包", "19": "建筑材料", "20": "家具", "21": "厨房洁具", "22": "绳网袋篷", "23": "纺织纱线", "24": "布料床单", "25": "服装鞋帽", "26": "花边配饰", "27": "地毯席垫", "28": "体育玩具", "29": "食品", "30": "小食配料", "31": "水果花木", "32": "啤酒饮料", "33": "酒", "34": "烟草烟具", "35": "广告贸易", "36": "金融物管", "37": "建筑修理", "38": "通讯传媒", "39": "运输旅行", "40": "材料加工", "41": "教育娱乐", "42": "技术服务", "43": "餐饮酒店", "44": "医疗园艺", "45": "法律" };
var recommend=[1,5,10,15,20,25,30,35,40,45];
var sorted = {
    "服装纺织": "18,23,24,25,26,27,35",
    "食品饮料": "29,30,31,32,33,40,39",
    "餐饮酒店": "29,30,31,32,33,35,40,43",
    "化妆美容": "03,05,10,21,30,44",
    "医药设备": "05,10,35,40,44",
    "日常用品": "02,03,05,06,08,09,16,34,35,40",
    "家具用具": "20,21,37,40",
    "IT互联网": "09,16,35,38,41,42",
    "化工能源": "01,02,04,07,11,16,17,22,40,42",
    "电子仪器": "09,11",
    "机械制造": "06,07,11,37",
    "建材五金": "02,06,14,17,19,37,40,42",
    "房产金融": "36,37,42,40,41,42,45"
};
$(function(){
    $("#recomtype").append('<li><a class="fn14 bd_orange2" href="javascript:void(0);" id="guidtm">注册指南</a></li>');
    for(var i =0;i<recommend.length;i++){     //推荐10个标签类
        recommend[i] = ('0' + recommend[i]).slice(-2);
        $("#recomtype").append(' <li><a  href="javascript:void(0);"  onclick="recomSort(\''+recommend[i]+'\',this);"  data-sort="'+recommend[i]+'">'+recommend[i]+'类</a></li>');
    }

    //智能生成图样
    $("#makelogosure").click(function(){
        // $("#makelogo").hide();
        makeImg();
    })

    setSort();

    $("#guidtm").click(function(){
        $("#recomtype a").removeClass('on');
        $(this).addClass('on');
        $("#sort_first").hide();
        $("#regguide").show();
        if($("#regguide").is(":hidden")){
            buttnchange();
        }
    })

    $("#subform").one('click',function(){
        $("#savesubmit").submit();
    })

    if(old_goods){    //查询注册
        max_total_count=0;
        var goods_=old_goods;
        if(goods_.substr(-6)=='&nbsp;'){
            goods_=goods_.substr(0,goods_.length-6);
        }
        max_total_count=goods_.split('&nbsp;').length;
        if(max_total_count<=10){
            max_total_count=10;
        }
        load_goods_history(old_goods);
    }

    /*锚点动效*/
    $("#recomtype a").click(function() {
        var id = $(this).attr("data-sort");
        if(id=="01") id=0;
        var top = (Number(id)/5)*225-45;
        $(".tit_box").scrollTop(top)
    });

    // checkLoginWarm();
    switchstatus();

})



function switchstatus()
{
    $(".p-mid").mouseover(function(event){
        $(this).find(".tip_box.zhong").show()
        $(this).find(".tip_box.qiang").hide()
        event.stopPropagation();
    }).mouseleave(function(event){
        $(this).find(".tip_box.zhong").hide()
        event.stopPropagation();
    })
}


function setSort()
{
    $(".tit_box").html('');
    var sortsdeng=[];
    if(deng_sort!=''){
        sortsdeng=deng_sort.split(',');
    }

/*  var submit_fls= $("#sbfls").val().filter(",");//input type=hidden  value= "010010,010021,"  [010010,010021]
    if(!n_array(id,submit_fls)){
    submit_fls.push(id);
    $("#sbfls").val(submit_fls.join(","));
}*/

    var k=0;
    for (var i=1;i<=45;i++) {    //45类
        tag = ('0' + i).slice(-2);
        j=i.toString();
        if(sortsdeng.indexOf(j)>=0){
            if(k==0){
                $(".tit_box").append('<li><div class="tit fn16 c_gray j-tit" onclick="firststep(\''+tag+'\')"  id="' + tag + '" >' + tag +'类 '+ classes[tag] + '<div class="dis_inl posrel" id="deng-'+tag+'"><div class="tip_box qiang sort_msg" style="display:'+act+';" ><div class="posrel">鼠标移上可查看注册过的类别详情<div class="icon_close" onclick="colsemoban(1)"></div></div></div><div class="posrel dis_inl p-mid"><img class="red_deng j-deng cur_poi" src="/images/deng.gif"   onmouseover="checkhas(\''+tag+'\',\'red\')" ></div></div></div></div></li>');
                k++;
            }else{
                $(".tit_box").append('<li><div class="tit fn16 c_gray j-tit" onclick="firststep(\''+tag+'\')"  id="' + tag + '" >' + tag +'类 '+ classes[tag] + '<div class="dis_inl posrel" id="deng-'+tag+'"><div class="posrel dis_inl p-mid"><img class="red_deng j-deng cur_poi" src="/images/deng.gif"  onmouseover="checkhas(\''+tag+'\',\'red\')" ></div></div></div></li>');
            }
        }else{
            $(".tit_box").append('<li><div class="tit fn16 c_gray j-tit" onclick="firststep(\''+tag+'\')"  id="' + tag + '" >' + tag +'类 '+ classes[tag] + '<div class="dis_inl posrel" id="deng-'+tag+'"></div></div></li>');
        }
    }
    if(do_key){
        $("#"+do_key).click();
    }
}

function updatenew()
{
    checkAnames();
    resetTm();
    getsortsbyapname();
}

function checkhas(sort,color)
{
    if(!$("#deng-"+sort+" ."+color+"_span").html()){
        //firststep(sort);
        /*var hasblue=false;
        if($("#"+sort).hasClass('c_blue')){
            hasblue=true;
        }
        $("#"+sort).removeClass('c_orange').addClass('c_gray');
        $("#"+sort).parents('ul').find('.content').remove();
        if(hasblue) $("#"+sort).removeClass('c_gray').addClass('c_blue');*/
        load_history(sort,color);
    } /*else{
		if($("#deng-"+sort+" ."+color+"_span").attr('style')=="display:inline"){
			$("#deng-"+sort+" ."+color+"_span").hide();
		}else{
			$("#deng-"+sort+" ."+color+"_span").show();
		}
	}*/
}


function mt_major_all(type)
{
    var selected=type=="instru2"?"minor_all":"major_all";
    if(!$("."+selected).hasClass('on')){
        $("."+type).each(function(){
            if(!$(this).is(":hidden")){
                $(this).addClass('on');
            }
        })
        if(type=="instru2") $(".minor_all").addClass('on');
        else $(".major_all").addClass('on');
    }else{
        var i=0;
        $("."+type).each(function(){
            if(!$(this).is(":hidden")){
                if(type=="instru2") minor_select_minor="";
                else  major_select_major="";
                if(i!=0){
                    $(this).removeClass('on');
                }else if(type=="instru2"){
                    $(this).removeClass('on');
                }
                i++;
            }
        })
        if(type=="instru2") $(".minor_all").removeClass('on');
        else $(".major_all").removeClass('on');
    }
    buttnchange();
}

function buttnchange()
{
    $("#recom_guid").removeClass('btn_gray').addClass('btn_blue');
    $("#recom_guid").html('智能推荐');
    $("#recom_guid").attr("href","javascript:regguide();");
    $("#guid_msg").html('');
}

function mt_major_swicth(num,obj)
{
    var cls=$(obj).hasClass('on');
    if(cls==true){
        $(obj).removeClass('on')
    }else{
        $(obj).addClass('on')
    }
    var i=0;
    $(".major_"+num).each(function(){
        if($(this).hasClass('on'))  i++
    })

    if(i==$(".major_"+num).length){
        $(".major_all").addClass('on');
    }else{
        $(".major_all").removeClass('on');
    }

    if(i==0){
        $(".major_"+num+":first").addClass("on");
    }
    buttnchange();
}

function mt_minor_swicth(num,obj)
{
    var cls=$(obj).hasClass('on');
    if(cls==true){
        $(obj).removeClass('on')
    }else{
        $(obj).addClass('on')
    }

    var i=0;
    $(".minor_"+num).each(function(){
        if($(this).hasClass('on'))  i++
    })

    if(i==$(".minor_"+num).length){
        $(".minor_all").addClass('on');
    }else{
        $(".minor_all").removeClass('on');
    }

    buttnchange();
}

function closeregguide()
{
    $("#guidtm").removeClass('on');
    $("#regguide").hide();
    $("#sort_first").show();
}

function search_guide(sorts)
{
    $.ajax({
        type:"get",
        url:"/tm/guide",
        data:{'sorts':sorts},
        success:function(son){
            var son = eval("(" + son + ")");
            if(son.status==200){
                for (var key in son.data){
                    var htm=son.data[key].join("&nbsp;");
                    load_goods_history(htm);
                }
            }
        }
    })
}

function regguide()
{
    var sorArr=[];
    $(".instru1").each(function(){
        if($(this).hasClass('on')){
            sorArr.push($(this).data('rcls'))
        }
    })
    $(".instru2").each(function(){
        if($(this).hasClass('on')){
            sorArr.push($(this).data('rcls'))
        }
    })
    if(sorArr.length==0) {
        alert_show("请先选择项目");return;
    }
    $.ajax({
        type:"get",
        url:"/tm/guide",
        data:{'sorts':sorArr.join(',')},
        success:function(son){
            var son = eval("(" + son + ")");
            if(son.status==200){
                for (var key in son.data){
                    var htm=son.data[key].join("&nbsp;");
                    load_goods_history(htm);
                }
                $("#recom_guid").removeClass('btn_blue').addClass('btn_gray');
                $("#recom_guid").html('已推荐');
                $("#recom_guid").attr("href","javascript:void(0);");
                $("#guid_msg").html('已为您推荐项目，可点击“自助选择”继续添加');
            }
        }
    })
}

//智能推荐结束

//关闭模板提示消息
function colsemoban(ty)
{
    var from=ty==1?'sort':'moban';
    if(ty==1) 	firststep('01');
    $.ajax({
        type:"get",
        url:"/tm/closetmexplain",
        data:{'type':1,"from":from},
        success:function(son){
            if(ty==1){
                $(".sort_msg").hide();
                act="none";
            } else{
                $("#expl").hide();
            }

        },
        error:function(){ if(ty==1){  $("#sort_w").hide(); act="none"; }else{ $("#expl").hide();}}
    })
}


function isenabled(src) {
    return $(src).hasClass("c_gray") || $(src).hasClass("c_orange");
}

function hasOrange(src){
    return $(src).hasClass("c_orange");
}




function setComColor(id)   //设置颜色
{
    var isshow=false;
    $("#sort_first").find(".j-tit").each(function(){
        if(hasOrange(this)){
            $(this).removeClass('c_orange').addClass('c_gray');
            $(this).parents('ul').find('.content').remove();
            //$(this).find('div.p-mid').hide();
            if($(this).attr('id')==id){
                isshow=true;
            }
        }
    })
    return isshow;
}

function showallsort(id,color)
{
    $("#_msg").html('');
    var htm=$("#old_sort_"+color+id).html();
    $("#"+id).removeClass('c_orange').addClass('c_gray');
    $("#"+id).parents('ul').find('.content').remove();
    //$("#"+id).removeClass('c_gray').addClass('c_orange');
//	showsecond(id)
    $("#_msg").html(htm);
    $("#sor_mg").show();
}
function closesort()
{
    $("#sor_mg").hide();
}

function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g, "");//str.replace(/(^\s*)|(\s*$)/g, "");
}


function showhistory(obj)
{
    if($("#sort_w").html() && !$("#sort_w").is(":hidden")){
        colsemoban(1);
    }
    $(obj).find('span.zhong').show();
}

function hidehistory(obj)
{
    $(obj).find('span.zhong').hide();
//	$("#deng-"+sort).find('span').hide();
}


function firststep(id)  //一级大类
{
    var isshow=setComColor(id);
    if(Number(id)<=9) id='0'+Number(id);
    if(isshow){
        return;
    }
    $("#"+id).removeClass('c_gray').addClass('c_orange');
    showsecond(id);
    //load_history(id);
}

function showsecond(num)   //显示二级
{
    if(Number(num)<=9) num='0'+Number(num);
    var html = '', box = '', TM = trademark[num-1]['objs'];
    html+=' <div class="content">';
    for (var key in TM) {
        if (!TM.hasOwnProperty(key)) continue;
        if(search_result && search_result[Number(num)>9?num:Number(num)] && search_result[Number(num)>9?num:Number(num)].objs[key]){
            html += '<dl class="list_sec" ims="'+num+'"><dt class="c_blue" id="showthird' + TM[key].id + '" onclick="showthird(\'' + TM[key].id + '\',\'' +key+ '\',\'' + num + '\',this)"' + '><a href="javascript:void(0);"><i class="icon icon-jiao"></i>' + TM[key].id + '  ' + TM[key].desc + '</a></dt><dd style="display:none;" id="' + TM[key].id + '"><ul></ul></dd></dl>';
        }else{
            html += '<dl class="list_sec" ims="'+num+'"><dt id="showthird' + TM[key].id + '" onclick="showthird(\'' + TM[key].id + '\',\'' +key+ '\',\'' + num + '\',this)"' + '><a href="javascript:void(0);"  ><i class="icon icon-jiao"></i>' + TM[key].id + '  ' + TM[key].desc + '</a></dt><dd style="display:none;" id="' + TM[key].id + '"><ul></ul></dd></dl>';
        }
    }
    html+='</div>';
    $("#"+num).after(html);
}


//10个标签类
function recomSort(sort,obj) {
    closeregguide();
    if($("#search_msg").attr('display')!='none'){
        $("#sortName").val('');
        $("input[name='show']").each(function(){
            $(this).removeAttr('checked');
            if($(this).val()==1){
                $(this).attr('checked',true);
            }
        })
        $("#search_msg").hide();
        $("#sort_first").show();
    }
    setComColor(sort);
    var selectedid='';
    $("#recomtype").find('a').each(function(){
        if($(this).hasClass('on')){
            selectedid=$(this).data('sort');
        }
        $(this).removeClass('on');
    })
    if(Number(selectedid)==Number(sort)){
        $(obj).removeClass('on');
        //	$("#deng-"+sort).hide();
        return;
    }else{
        //	$("#deng-"+sort).show();
        $(obj).addClass('on');
    }
    //load_history(sort);
    if(Number(sort)<=9) sort='0'+Number(sort);
    $("#"+sort).removeClass('c_gray').addClass('c_orange');
    showsecond(sort)
}

function showthird(two, keys,one, src) {   //显示三级
    var recomArr=recomSort[one];
    var lists = trademark[one-1]['objs'][keys]['objs'];
    block = src.nextSibling;
    if (block.style.display == 'block') {
        $(src).removeClass('cur');
        block.style.display = 'none';
    } else if (block.innerHTML.length >= 0) {
        $(src).addClass('cur');
        var html = '', item,  desc="", tag, htmlhover = '';
        var leng=Object.keys(lists);
        var jian='';
        for (var key = 0; key <leng.length;key++) {
            item = lists[key];
            item['desc']=item['desc'].replace(/,/,"，");
            desc=item['id']+item['desc'];
            tag = Crc32(Number(one) + "-" + two + "-" + item['id'] + "-" + item['desc']);
            jian=($.inArray(item['desc'],recomArr)>=0)?'jian':'';
            if (search_result && search_result[Number(one)] && search_result[Number(one)].objs[Number(keys)] && search_result[Number(one)].objs[Number(keys)].objs[tag]) {
                htmlhover += '<li class="' + (getid("tm-id-" + Crc32(item['id'] + "-" + item['desc'])) ? ' selected"' : "") + jian + ' " id="choose-' + tag + '"><a href="javascript:void(0);" name="' + item['desc'] + '" onclick="addgoods_1(\'' + one + '\',\'' + two + '\',\'' +item['id'] + '\',\'' + item['desc'] + '\', this);" >' + ((search_result && search_result.keyword) ? desc.replace(search_result.keyword, "<i class='c_blue'>" + search_result.keyword + "</i>") : desc) + '</a></li>';
            } else {
                html += '<li class="' + (getid("tm-id-" + Crc32(item['id'] + "-" + item['desc'])) ? ' selected"' : "")  +jian+' " id="choose-' + tag + '"><a href="javascript:void(0);" name="' +item['desc'] + '" onclick="addgoods_1(\'' + one + '\',\'' + two + '\',\'' + item['id'] + '\',\'' + item['desc']+ '\', this);" >' + ((search_result && search_result.keyword) ? desc.replace(search_result.keyword, "<i>" + search_result.keyword + "</i>") : desc) + '</a></li>';
            }
        }
        block.innerHTML ='<ul>'+htmlhover + html+'</ul>';
        block.style.display = 'block';
    } else if (block.style.display == 'none') {
        if (!getid("tm-sub-" + two)) $(src).removeClass('cur');
        block.style.display = 'block';
    }
}

function addgoods_1(one, two, three, desc, src, noupdate) {  //添加商品项
    if(Number(one)<10) one='0'+Number(one);
    if(src)$(src).parent().addClass('selected');
    addgoods(one, two, three, desc, noupdate);
    return true
}

function addgoods(one, two, three, desc, noupdate) {  //添加商品项
    var html = "";
    if ($("#class_info>div[data-id='" + one + "']").length == 0) {
        $("#class_info").find('img').hide();
        html = '<div class="item" data-id="' + one + '" >';
        html += ' <div class="top fn16 clearfix">';
        html += '<a href="javascript:void(0);" onclick="deletegoods(\'' + one + '\');" class="icon icon-remove right j-remove" ></a>';
        html += '<span><em class="c_orange bold">第' + one + '类 ' + classes[one] + '</em>';
        html += '(已选<em id="ab' + one + '" class="c_orange bold"></em>项,<em id="qiehuan' + one + '"></em>)</span>';
        html += '</div>';
        html += '<div class="content clearfix" id="clearfix"></div></div>';
        $("#class_info").append(html);
    }

    var block = $("#class_info>div[data-id='" + one + "']").get(0).lastChild;
    if (!getid("tm-sub-" + two)) {
        $(block).append('<div id="tm-sub-' + two + '"><span class="newlook" style="display:none;">' + two + '</span></div>');
    }
    var items = getid("tm-sub-" + two), tag = Crc32(Number(one) + "-" + two + "-" + three + "-" + desc), tag2 = Crc32(three + "-" + desc);
    if (getid("tm-id-" + tag2)) return;
    descs=desc.replace(/,/g,"，");
    $(items).append('<a class="ui-btnItem4" href="javascript:void(0);" title="' +three+ desc + '" onclick="deletegoods(\'' + tag + '\', this)" id="tm-id-' + tag2 + '" data-content="' + one + "`" + two + "`" + three + "`" + desc + '">' +three+ desc + '<input type="hidden"  name="Tm[]"  value="'+one+','+two+','+three+'vs'+descs+','+descs+'"   /><i class="close">x</i></a>');
    if (noupdate!==false) updategoods();
}
function updategoods(id) {  //更新商品项单状态
    var fee = 0,     //官费
        ordersfee = 0,    //总费用
        danfee=0,      //担保费
        gongzheng=0,   //公证费
        jq = null;
    var cids=id;
    var gongid=$("#extra").val();
    if (id) jq = $("#" + id).siblings();
    else jq = $("#sort_first").find('.j-tit');
    jq.each(function(){
        if (!isenabled(this)) return;
        $(this).removeClass("c_orange").addClass("c_gray");
    });
    $("#class_info>div[data-id]").each(function () {
        var count = $(this).find("a[data-content]").length, one = Number($(this).data("id")), ifee=0;
        if (count == 0) {
            this.parentNode.removeChild(this);
            return;
        }
        var coseOne=$(".list_sec").attr('ims');
        ones=Number(one)>9? one: '0'+one;
        if(coseOne==ones){
            $("#" + ones).removeClass('c_gray').addClass('c_orange');
        }
        ifee = base;
        getid("ab" + ones).innerHTML = count;
        var danbao='';
        if(isproxy==2){ danbao='，担保费<em style="color:red;">'+dpri+'</em>元';}
        if (count >= 10) {
            ifee += (count - 10) * add;
            getid("qiehuan" + ones).innerHTML = '10项以上每项加收<em style="color:red;">' + add + '</em>元'+danbao;
        } else {
            getid("qiehuan" + ones).innerHTML = '还可以再选择<em style="color:red;">' + (10 - count) + '</em>项,10项以内<em style="color:red;">' + base + '</em>元'+danbao;
        }
        ordersfee+=ifee;
        fee += ifee;

        if(isproxy==2){
            ordersfee+=dpri;
            danfee+=dpri;
        }
        if(gongid==1){
            gongzheng+=notarizaprice;
        }
    });




    if(ordersfee==0){
        $("#class_info").html('<img class="mt50 ml40" src="../style/images/sb_blank.png">');
    }
    ordersfee+=gongzheng;
    $("#gzf").html(gongzheng);
    $(".fn22").find('em').html('￥'+ordersfee);
    var fename=isproxy==2?'担保费':'服务费';
    $("#detail").html('(官费'+fee+'元+'+fename+danfee+'元<label class="registhide gzshow">+商标图样存证<em id="gzf">'+gongzheng+'</em>元</label>)');
    if(aptitude==3 || aptitude==4) $(".registhide").hide();
    else $(".registhide").show();
}

function deletegoods(tag, src) {   //删除商品项
    if(tag===undefined){
        $("#class_info").children().remove();
        $("#sort_first").find('li.selected').removeClass('selected');
        $("#sort_first").find('div.content').remove();
        //	$("#sort_first").find('div.p-mid').hide();
        buttnchange();
    }else{
        if (src === undefined) {
            $("#class_info>div[data-id='" + tag + "']").remove();
            $("div.content dl[ims='" + tag + "']>dd>ul>li.selected").removeClass('selected');
            $("#bg"+tag).remove();
            $("#"+tag).parent('li').find('div.content').remove();
            //  $("#"+tag).find('div.p-mid').hide();
            changeguideset(tag);
        } else {
            changeguideset(tag);
            $("#choose-" + tag).removeClass("selected");
            var p = src.parentNode;
            p.removeChild(src);
            var idmp=p.parentNode.parentNode;
            var tps=$(idmp).data('id')>9?$(idmp).data('id'):'0'+$(idmp).data('id');
            var sum=$("#ab"+tps).html();
            if ($(p).find("a[data-content]").length == 0 && (Number(sum)-1==0)) {
                p.parentNode.removeChild(p);
                $("#"+tps).parent('li').find('div.content').remove();
                //  $("#"+tps).find('div.p-mid').hide();
            }
        }
    }
    updategoods();
}

function changeguideset(tag)
{
    $(".instru1").each(function(){
        if($(this).hasClass('on')){
            if($(this).data('rcls')==Number(tag)){
                buttnchange();
            }
        }
    })

    $(".instru2").each(function(){
        if($(this).hasClass('on')){
            if($(this).data('rcls')==Number(tag)){
                buttnchange();
            }
        }
    })

}

function getid(o)
{
    return document.getElementById(o);
}

for (var key in sorted)
{
    if (!sorted.hasOwnProperty(key)) continue;
    $("#listTotals").append('<li><a href="javascript:void(0);" data-classes="' + sorted[key] + '">' + key + '</a></li>');
}

function shows(id)
{
    $("#"+id).show();
}

function closes(id)
{
    $("#"+id).hide();
}

function checkTmName()   //查询商标名是否重复
{
    var tmname=$("#TmName").val();
    $("#tmsame").html('');
    $("#tmsame").hide();
    if(enameid=='' || enameid==0 || tmname=='' ||tmname==0) return false;
    $.ajax({
        type:"post",
        url:"/tm/checktmname",
        data:{'TmName':tmname},
        datatype:'json',
        success:function(son){
            var son = eval("(" + son + ")");
            if(son.status==200){
                var data=son.data;
                $("#tmsame").html('<i class="icon-zhong left mr5"></i>您已提交过：'+data.SName+'等'+data.SNum+'个商标');
                $("#tmsame").show();
            } else{
                if(son.msg=='您输入的内容涉及敏感词汇'){
                    alert_show("您输入的内容涉及敏感词，请重新输入");
                    $("#TmName").val('');
                }
            }
        },
        error:function(son){
            if(son.status==100 && son.msg!=''){
                if(son.msg=='您输入的内容涉及敏感词汇'){
                    alert_show("您输入的内容涉及敏感词，请重新输入");
                    $("#TmName").val('');
                }
            }
        }
    })
}

$("input[name='Color']").click(function(){
    var val=$(this).val();
    if(val==2){
        if(old_one_img){
            $("#TmPattern_test").val('');
        }
        if(old_two_img){
            $("#TmPatternTwo_test").val(old_one_img);
        }
        $("#colortwo").hide();
        $("#colorOne").show();
    }else {
        if(old_one_img){
            $("#TmPattern_test").val(old_one_img);
        }
        if(old_two_img){
            $("#TmPatternTwo_test").val('');
        }
        $("#colortwo").show();
        $("#colorOne").hide();
    }
})


//切换时显示或隐藏公证
function setregist()
{
    var allprice=$("#tprice").html();
    var setprice=allprice.replace(/(¥|元|￥)/g,"");
    var nu=0;
    $("#class_info>div[data-id]").each(function () {
        nu+=1;
    });
    if(aptitude==3 || aptitude==4){
        $("#register").removeClass('register_on');
        $("#register").addClass('register_off');
        if(Number(setprice)==0){
            $("#tprice").html("¥0");
        }else{
            if($("#extra").val()==-1){
                var rest =setprice;
            }else{
                var rest= Number(setprice)-(Number(notarizaprice)*nu);
                $("#extra").val(-1);
            }
            if(nu==0){
                $("#tprice").html("¥0");
            }
            else{
                $("#tprice").html("¥"+rest);
                $("#gzf").html("0");
            }
        }
    }else{
        if(Number(ExtraPrice)==0){
            $("#register").removeClass('register_on');
            $("#register").addClass('register_off');
            if(Number(setprice)==0){
                $("#tprice").html("¥0");
            }else{
                if($("#extra").val()==-1){
                    var rest =setprice;
                }else{
                    var rest= Number(setprice)-(Number(notarizaprice)*nu);
                    $("#extra").val(-1);
                }
                if(nu==0){
                    $("#tprice").html("¥0");
                }
                else{
                    $("#tprice").html("¥"+rest);
                    $("#gzf").html("0");
                }
            }
        }
    }
}

function getsortsbyapname()
{
    //根据申请人获取商标大类
    var aname=$("#AName").val();
    if(enameid=='' || enameid==0) return;
    if(aname=='' || aname==0) return;
    $("#deng_sort").html("");
    //	$("#sort_first .p-mid").html('');
    $.ajax({
        type:"POST",
        url:"/tm/getsorts",
        data:{"ApName":aname,'Sorts':deng_sort},
        dataType:"json",
        success:function(sons){
            if(sons.status==200 && sons.data!=''){
                var j=0; var firhtl="";
                for(var key in sons.data)
                {
                    var k=Number(key);
                    if(k<=9) k="0"+k;
                    firhtl="";
                    if(j==0){
                        firhtl='<div class="tip_box qiang sort_msg" style="display:'+act+';" ><div class="posrel">鼠标移上可查看注册过的类别详情<div class="icon_close" onclick="colsemoban(1)"></div></div></div>';
                        if(sons.data[key]=="0"){  //0表示申请人在该大类下没有注册商标,显示黄色
                            $("#deng-"+k).html('<div class="posrel dis_inl p-mid"><img class="yellow_deng j-deng cur_poi" src="/images/dp2.gif" onmouseover="checkhas(\''+k+'\',\'yellow\')" > </div> '+firhtl);
                        }else if(sons.data[key]==1){  //1表示有注册商标，个数跟总的类别下个数相同  红色
                            $("#deng-"+k).html('<div class="posrel dis_inl p-mid"><img class="red_deng j-deng cur_poi" src="/images/deng.gif" onmouseover="checkhas(\''+k+'\',\'red\')" > </div> '+firhtl);
                        }else if(sons.data[key]==2){ //2是有别的申请人注册该类
                            $("#deng-"+k).html('<div class="posrel dis_inl p-mid"><img class="red_deng j-deng cur_poi" src="/images/deng.gif" onmouseover="checkhas(\''+k+'\',\'red\')" >  </div>');
                            $("#deng-"+k).append('<div class="posrel dis_inl p-mid"><img class="yellow_deng j-deng cur_poi" src="/images/dp2.gif" onmouseover="checkhas(\''+k+'\',\'yellow\')" >  </div>'+firhtl);
                        }
                        j++
                    }
                    else{
                        if(sons.data[key]=="0"){  //0表示申请人在该大类下没有注册商标,显示黄色
                            $("#deng-"+k).html('<div class="posrel dis_inl p-mid"><img class="yellow_deng j-deng cur_poi" src="/images/dp2.gif" onmouseover="checkhas(\''+k+'\',\'yellow\')" ></div>');
                        }else if(sons.data[key]==1){  //1表示有注册商标，个数跟总的类别下个数相同  红色
                            $("#deng-"+k).html('<div class="posrel dis_inl p-mid"><img class="red_deng j-deng cur_poi" src="/images/deng.gif" onmouseover="checkhas(\''+k+'\',\'red\')" ></div>');
                        }else if(sons.data[key]==2){ //2是有别的申请人注册该类
                            $("#deng-"+k).html('<div class="posrel dis_inl p-mid"><img class="red_deng j-deng cur_poi" src="/images/deng.gif" onmouseover="checkhas(\''+k+'\',\'red\')" ></div>');
                            $("#deng-"+k).append('<div class="posrel dis_inl p-mid"><img class="yellow_deng j-deng cur_poi" src="/images/dp2.gif" onmouseover="checkhas(\''+k+'\',\'yellow\')" ></div>');

                        }
                    }
                }
                return;
                var list=sons.data.split(","); var j=0;
                for (var i=0;i<list.length;i++){
                    var k=Number(list[i]);
                    if(k<=9) k="0"+k;
                    $("#"+k).append('<div class="dis_inl" id="dengh-'+k+'"><img class="j-deng cur_poi" src="/images/dp2.gif" onmouseover="checkhas(\''+k+'\')" ></div>');
                    // $("#deng-"+k+" .j-deng").append("<img class='' src='/images/dp2.gif'>");
                    /* if(j==0){
                        $("#deng-"+k).html('<img class="j-deng cur_poi" src="/images/deng.png" onmouseover="checkhas(\''+k+'\')" > <div class="tip_box qiang sort_msg" style="display:'+act+';" ><div class="posrel">鼠标移上可查看注册过的类别详情<div class="icon_close" onclick="colsemoban(1)"></div></div>');
                        j++
                     }
                     else{
                         $("#deng-"+k).html('<img class="j-deng cur_poi" src="/images/deng.png" onmouseover="checkhas(\''+k+'\')" >');
                     }*/
                }
            }
        }
    })

}

function choseregist()   //存证
{
    var allprice=$("#tprice").html();
    var setprice=allprice.replace(/(¥|元|￥)/g,"");
    var nu=0;
    $("#class_info>div[data-id]").each(function () {
        nu+=1;
    });

    if($("#register").hasClass('register_on')){
        $("#register").removeClass('register_on');
        $("#register").addClass('register_off');
        $("#extra").val(-1);
        $(".gzshow").hide();
        if(Number(setprice)==0){
            $("#tprice").html("¥0");
        }else{
            var rest= Number(setprice)-(Number(notarizaprice)*nu); //
            if(nu==0){
                $("#tprice").html("¥0");
            }
            else{
                $("#tprice").html("¥"+rest);
                $("#gzf").html("0");
            }
        }
    }
    else
    {
        if(aptitude!=3 && aptitude!=4){
            $("#register").removeClass('register_off');
            $("#register").addClass('register_on');
            $("#extra").val(1);
            var rest= Number(setprice)+(Number(notarizaprice)*nu); //
            if(nu>0){
                $("#gzf").html((Number(notarizaprice))*nu); //
            }
            if(nu==0) rest=notarizaprice;
            $("#tprice").html("¥"+rest);
            $("#gzf").html(notarizaprice*nu);
            $(".gzshow").show();
        }
    }
}

function downProxy()   //下载委托书
{
    if(enameid=='' || enameid==0) return;
    $("#downproxy").show();
}

// 清空所有项
function showdeletegoods()
{
    var htm=$("#class_info>div").html();
    deletegoods();

}

function downProxyfile(isst)  //下载委托书
{
    if(enameid=='' || enameid==0) return;
    var tmname='';
    closeap();
    if(isst==1){   //下载有商标名
        tmname=$("#TmName").val();
        if(tmname=='' || tmname==0){
            alert_show("请先填写商标名称");
            return;
        }
        tmname=	encodeURIComponent(tmname);  //对加号等字符进行编译
    }
    var isys = $("#isYs").is(':checked');
    var isbh = isys == true? 2:1;
    var apname=$("#AName").val();
    var addr=$("#IDAddress").val();
    var pho=$("#Phone").val();
    var postcode=$("#PostCode").val();
    var contact=$("#Contacts").val();
    var country="";
    var idnum='';
    if( aptitude==3 || aptitude==4){
        apname=$("#ANameOs").val();
        country=$("#Country_val").val();
        if(country=='中国(港澳台)'){
            country="";
        }
        addr=$("#IDAddressOs").val();
        pho=$("#PhoneMd").val();
        postcode=$("#PostCodeMd").val();
        contact=$("#ContactsMd").val();
    }
    if(apname=='' || addr=='' || pho=='' || postcode=='' || contact==''){
        alert_show("申请人信息不完整，请先填写完整再下载委托书");
        return;
    }
    if(aptitude==-1 || aptitude==4){
        idnum=$("#IDNumber").val();
        if( idnum=='' || idnum==0){
            alert_show("申请人信息不完整，请先填写完整再下载委托书");
            return;
        }
    }
    apname=encodeURIComponent(apname);
    addr=encodeURIComponent(addr);
    window.location.href='/tm/downloadfile?tmname='+tmname+'&apname='+apname+'&addr='+addr+'&pho='+pho+'&isbh='+isbh+'&postcode='+postcode+'&contact='+contact+"&country="+country+"&idnum="+idnum;
}

function historyProxy()   //查找已存在委托书
{
    $("#hispro").html("");
    if(enameid=='' || enameid==0) return;
    var apname=$("#AName").val();
    if(apname=='' || apname==0) {
        alert_show("请先选择申请人，方便查找历史委托书");
        return;
    }
    var tmid=$("#TmId").val();
    if(tmid===undefined)  tmid='';
    $.ajax({
        type:'post',
        url:'/tm/gethistoryproxy',
        data:{'ApName':apname,'Aptitude':aptitude,'TmId':tmid},
        datatype:'json',
        success:function(son){
            var sons=eval("("+son+")");
            var htm='';
            if(sons.status==200 && sons.data.list.length>0){
                if(sons.data.list.length==1){
                    $("#hispro").html("您两个月内有相同主体订单，如果为无商标名称版，可"+'<a href="javascript:useProxy(\''+sons.data.list[0].ProxyImg+'\',\''+sons.data.path+'/tm'+sons.data.list[0].ProxyImg+'\');">点击直接使用</a>');
                }else{
                    for(var i=0;i<sons.data.list.length;i++){
                        htm+='<tr><td class=""><label class="checkbox fn16"><input type="checkbox" onclick="addStyle(this);" data-pro="'+sons.data.list[i].ProxyImg+'"><span class="checkbox_but"></span>'+sons.data.list[i].TmName+'</label><p class="ml20">'+sons.data.list[i].TmSort+'</p></td>';
                        htm+='<td>'+sons.data.list[i].CreateTime+'</td>';
                        htm+='<td><a href="'+sons.data.path+'/tm'+sons.data.list[i].ProxyImg+'"  target="_blank">查看大图</a></td></tr>';
                    }
                    $("#his_body").html(htm);
                    $("#hispro").html("您两个月内有相同主体订单，如果为无商标名称版，可"+'<a href="javascript:useProxy();">点击直接使用</a>');
                }
            }
        },
        error:function(son){
            $("#hispro").html("");
        }
    })

}

function addStyle(obj)
{
    $("#his_body").find("input[type='checkbox']").each(function(){
        this.checked = false;
    })
    $(obj).attr('checked',true);
}

function choseProxy()
{
    var nu=0; var htm=''; var link='';
    $("#his_body input[type='checkbox']").each(function(){
        if($(this).prop("checked")){
            nu++;
            htm=$(this).data('pro');
            link=$(this).parents('tr').find('a').attr('href');
        }
    })
    if(nu>1){
        alert_show("只能选择一个委托书");
        return false;
    }
    if(nu==0){
        alert_show("请选择一个委托书");
        return false;
    }
    $("#tmfirstImageText").attr('src',link);
    $("#ProxyImg_test").val(htm);
    $(".first").attr('id','example2-first');
    $('#example2-first').attr('href',link);
    tup_mt();
    closeap();
}

function useProxy(htm,link)    //使用已存在的委托书
{
    if(htm!==undefined){
        $("#tmfirstImageText").attr('src',link);
        $("#ProxyImg_test").val(htm);
        $(".first").attr('id','example2-first');
        $('#example2-first').attr('href',link);
        tup_mt();
    }else{
        $("#his_proy").show();
    }
}

$("button[id='search']").click(function(){   //点击按钮查询
    if(emptysearch()){
        $("#listTotals").hide();
        do_search();
    }
})

$("#listTotals").on('click','a',function(){   //下拉推荐大类查询
    closeregguide();
    getid('sortName').value=this.innerHTML;
    var lists=$(this).data('classes').replace(/\b(\d+)/g,"#$1").split(',');
    $("#sort_first").find(".j-tit").removeClass('c_blue').removeClass('c_orange').addClass('c_gray');
    for(var i=0;i<lists.length;i++){
        $(lists[i]).removeClass('c_gray').addClass('c_blue');
    }
    $("#listTotals").hide();
})

$("#sortName").on('keyup',function(e){   //鼠标输入情况
    if(!emptysearch()){
        return;
    }
    if(e.keyCode==13){
        showAndhide('listTotals','hide');
        do_search();
    }
}).on('focus',function(){
    showAndhide('listTotals','show');
})

$(".brand_search").on('mouseleave',function(e){  //鼠标移开情况
    showAndhide('listTotals','hide');
});

function emptysearch()   //处理空的情况
{
    closeregguide();
    var value=getid("sortName").value;
    if(value=='' || value==0){
        if(lod_search_sort){
            $("#sort_first").find(".j-tit").removeClass('c_blue').removeClass('c_orange').addClass('c_gray');
            $("#"+lod_search_sort).removeClass('ui-btnItem-nothing').addClass('optional');
        }else{
            $("#sort_first").find(".j-tit").removeClass('c_blue').removeClass('c_orange').addClass('c_gray');
        }
        search_result=null;
        var  isshow=$("input[name='show']:checked").val();
        switch(isshow){
            case '1':
                setSort();
                imgshoworhide('hide');
                break;
            case '2':
                imgshoworhide('show');
                break;
        }
        return false;
    }
    return true;
}

function imgshoworhide(type)   //查询图片显示或隐藏
{
    switch(type){
        case 'show':
            $("#search_msg").show();
            $("#sort_first").hide();
            break;
        case 'hide':
            $("#search_msg").hide();
            $("#sort_first").show();
            break;
    }
}

function searchgoods(value,isshow){   //查找服务项
    if(!emptysearch()){
        return;
    }

    $("#sort_first").find(".j-tit").removeClass('c_blue').removeClass('c_orange').addClass('c_gray');
    var TM=trademark; var lists=[];
    for(var one in TM){
        if(!TM.hasOwnProperty(one)) continue;
        var item2=TM[one]['objs'];
        for(var two in item2){
            if(!item2.hasOwnProperty(two)) continue;
            var item3=item2[two]['objs'];
            for(var three in item3){
                if(!item3.hasOwnProperty(three)) continue;
                if(item3[three]['desc'].indexOf(value)>=0 || item3[three]['id'].indexOf(value)>=0){
                    var smm=item2[two].id
                    var son=TM[one].id;
                    lists.push(Number(son)>9?son:'0'+Number(son));
                    if(lod_search_sort){
                        if((Number(son)>9?son:'0'+Number(son))==lod_search_sort){
                            $("#"+(Number(son)>9?son:'0'+Number(son))).removeClass('c_gray').addClass('c_blue');
                            if(!search_result) search_result ={keyword:value};
                            if(!search_result[son]) search_result[son] ={name:TM[one]['desc'],objs:{}};
                            if(!search_result[son]['objs'][two]) search_result[son]['objs'][two] ={name:item2[two]['desc'],objs:{}};
                            search_result[son]['objs'][two]['objs'][Crc32(son+"-"+smm+"-"+item3[three]['id']+"-"+item3[three]['desc'])]=true;
                        }
                    }else{
                        $("#"+(Number(son)>9?son:'0'+Number(son))).removeClass('c_gray').addClass('c_blue');
                        if(!search_result) search_result ={keyword:value};
                        if(!search_result[son]) search_result[son] ={name:TM[one]['desc'],objs:{}};
                        if(!search_result[son]['objs'][two]) search_result[son]['objs'][two] ={name:item2[two]['desc'],objs:{}};
                        search_result[son]['objs'][two]['objs'][Crc32(son+"-"+smm+"-"+item3[three]['id']+"-"+item3[three]['desc'])]=true;
                    }
                }
            }
        }
    }
    changeResult(isshow,$.unique(lists));
}

$("input[name='show']").click(function(){  //切换展示结果
    if(!emptysearch()){
        return;
    }
    do_search();
})

function do_search()   //搜索商品项
{
    $("#sort_first img").remove();
    getsortsbyapname();
    var  isshow=$("input[name='show']:checked").val();
    var keyword=getid('sortName').value;
    setSort();
    if(sorted[keyword]){
        var lists=sorted[keyword].replace(/\b(\d+)/g,"$1").split(",");
        $("#sort_first").find(".j-tit").removeClass('c_blue').removeClass('c_orange').removeClass('c_gray');
        for(var i=0;i<lists.length;i++){
            $("#"+lists[i]).addClass('c_blue');
        }
        changeResult(isshow,lists);
        return false;
    }
    searchgoods(keyword,isshow);
}


function changeResult(isshow,lists)   //将查询结果处理成只展示的
{
    if(lists==''){
        $("input[name='show']").each(function(){
            $(this).removeAttr('checked');
            if($(this).val()==2){
                $(this).attr('checked',true);
            }
        })
        imgshoworhide('show');
    }
    if(isshow==2 && lists!=''){
        setSort();
        imgshoworhide('hide');
        $("#sort_first").find(".j-tit").each(function(){
            if($.inArray(this.id,lists)<0){
                $(this).parent('li').remove();
            }
        })
    }
}

function showAndhide(obj,type)
{
    var Layer=getid(obj);
    if(!Layer) return ;
    switch(type){
        case 'show':
            Layer.style.display="block";
            break;
        case 'hide':
            Layer.style.display="none";
            break;
    }
}


function resetTm()   //重置
{
    $("#sortName").val('');
    if(lod_search_sort){
        $("#sort_first").find(".j-tit").removeClass('c_blue').removeClass('c_orange').addClass('c_gray');
        $("#"+lod_search_sort).removeClass('c_gray').addClass('c_blue');
    }else{
        $("#sort_first").find(".j-tit").removeClass('c_blue').removeClass('c_orange').addClass('c_gray');
        $("input[name='show']").each(function(){
            $(this).removeAttr('checked');
            if($(this).val()==1){
                $(this).attr('checked',true);
            }
        })
        emptysearch();
    }
    search_result=null;
}


/*

    exports('self_zc', {});
});*/


/*function addImgs()   //显示智能提示
{
    if(enameid=='' || enameid==0) return false;
    $("#makelogo_msg").html("智能生成图样字体为“黑体”。如果您有设计要求，请点击图标样式上传按钮上传定稿图样。");
    $("#makelogo").show();
}*/



function makeImg()   //智能生成图样
{
    var name=$("#TmName").val();
    if(name=='' || name==0){
        layer.alert('请填写商标名称', {icon: 7});
        return false;
    }
    $.ajax({
        type:'post',
        url:'/tm/addimgs',
        data:{'name':name},
        datatype:'json',
        success:function(son){
            var sons = eval("(" + son + ")");
            if(sons.status==200)
            {
                $("#upload-image8").attr('src',sons.data.path+sons.data.img);
                $("#TmPattern_test").val(sons.data.img);
                $(".second").attr('id','example2-second');
                $('#example2-second').attr('href',sons.data.path+sons.data.img);
                // tup_mt();
            }else{
                if(sons.msg){
                    layer.alert(sons.msg);
                }else{
                    layer.alert('自动生成失败，请上传', {icon: 2});
                }
            }
        },
        error:function(son){
            layer.alert('自动生成失败，请上传', {icon: 2});
        }
    })
}




