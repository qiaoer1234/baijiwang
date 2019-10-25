/* *
 * 全局空间 Vcity
 * */
var Vcity = {};
/* *
 * 静态方法集
 * @name _m
 * */
Vcity._m = {
    /* 选择元素 */
    $:function (arg, context) {
        var tagAll, n, eles = [], i, sub = arg.substring(1);
        context = context || document;
        if (typeof arg == 'string') {
            switch (arg.charAt(0)) {
                case '#':
                    return document.getElementById(sub);
                    break;
                case '.':
                    if (context.getElementsByClassName) return context.getElementsByClassName(sub);
                    tagAll = Vcity._m.$('*', context);
                    n = tagAll.length;
                    for (i = 0; i < n; i++) {
                        if (tagAll[i].className.indexOf(sub) > -1) eles.push(tagAll[i]);
                    }
                    return eles;
                    break;
                default:
                    return context.getElementsByTagName(arg);
                    break;
            }
        }
    },

    /* 绑定事件 */
    on:function (node, type, handler) {
        node.addEventListener ? node.addEventListener(type, handler, false) : node.attachEvent('on' + type, handler);
    },

    /* 获取事件 */
    getEvent:function(event){
        return event || window.event;
    },

    /* 获取事件目标 */
    getTarget:function(event){
        return event.target || event.srcElement;
    },

    /* 获取元素位置 */
    getPos:function (node) {
        var scrollx = document.documentElement.scrollLeft || document.body.scrollLeft,
                scrollt = document.documentElement.scrollTop || document.body.scrollTop;
        var pos = node.getBoundingClientRect();
        return {top:pos.top + scrollt, right:pos.right + scrollx, bottom:pos.bottom + scrollt, left:pos.left + scrollx }
    },

    /* 添加样式名 */
    addClass:function (c, node) {
        if(!node)return;
        node.className = Vcity._m.hasClass(c,node) ? node.className : node.className + ' ' + c ;
    },

    /* 移除样式名 */
    removeClass:function (c, node) {
        var reg = new RegExp("(^|\\s+)" + c + "(\\s+|$)", "g");
        if(!Vcity._m.hasClass(c,node))return;
        node.className = reg.test(node.className) ? node.className.replace(reg, '') : node.className;
    },

    /* 是否含有CLASS */
    hasClass:function (c, node) {
        if(!node || !node.className)return false;
        return node.className.indexOf(c)>-1;
    },

    /* 阻止冒泡 */
    stopPropagation:function (event) {
        event = event || window.event;
        event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
    },
    /* 去除两端空格 */
    trim:function (str) {
        return str.replace(/^\s+|\s+$/g,'');
    }
};

/* 所有城市数据,可以按照格式自行添加（北京|beijing|bj），前16条为热门城市 */

Vcity.allCity = ['北京市|beijingshi|bjs|2|37','天津市|tianjinshi|tjs|3|54','石家庄市|shijiazhuangshi|sjzs|4|71','唐山市|tangshanshi|tss|4|72','秦皇岛市|qinhuangdaoshi|qhds|4|73','邯郸市|handanshi|hds|4|74','邢台市|xingtaishi|xts|4|75','保定市|baodingshi|bds|4|76','张家口市|zhangjiakoushi|zjks|4|77','承德市|chengdeshi|cds|4|78','沧州市|cangzhoushi|czs|4|79','廊坊市|langfangshi|lfs|4|80','衡水市|hengshuishi|hss|4|81','太原市|taiyuanshi|tys|5|261','大同市|datongshi|dts|5|262','阳泉市|yangquanshi|yqs|5|263','长治市|changzhishi|czs|5|264','晋城市|jinchengshi|jcs|5|265','朔州市|shuozhoushi|szs|5|266','晋中市|jinzhongshi|jzs|5|267','运城市|yunchengshi|ycs|5|268','忻州市|xinzhoushi|xzs|5|269','临汾市|linfenshi|lfs|5|270','吕梁市|lyuliangshi|lls|5|271','呼和浩特市|huhehaoteshi|hhhts|6|400','包头市|baotoushi|bts|6|401','乌海市|wuhaishi|whs|6|402','赤峰市|chifengshi|cfs|6|403','通辽市|tongliaoshi|tls|6|404','鄂尔多斯市|eerduosishi|eedss|6|405','呼伦贝尔市|hulunbeiershi|hlbes|6|406','巴彦淖尔市|bayannaoershi|bynes|6|407','乌兰察布市|wulanchabushi|wlcbs|6|408','兴安盟|xinganmeng|xam|6|409','锡林郭勒盟|xilinguolemeng|xlglm|6|410','阿拉善盟|alashanmeng|alsm|6|411','沈阳市|shenyangshi|sys|7|524','大连市|dalianshi|dls|7|525','鞍山市|anshanshi|ass|7|526','抚顺市|fushunshi|fss|7|527','本溪市|benxishi|bxs|7|528','丹东市|dandongshi|dds|7|529','锦州市|jinzhoushi|jzs|7|530','营口市|yingkoushi|yks|7|531','阜新市|fuxinshi|fxs|7|532','辽阳市|liaoyangshi|lys|7|533','盘锦市|panjinshi|pjs|7|534','铁岭市|tielingshi|tls|7|535','朝阳市|zhaoyangshi|zys|7|536','葫芦岛市|huludaoshi|hlds|7|537','长春市|changchunshi|ccs|8|652','吉林市|jilinshi|jls|8|653','四平市|sipingshi|sps|8|654','辽源市|liaoyuanshi|lys|8|655','通化市|tonghuashi|ths|8|656','白山市|baishanshi|bss|8|657','松原市|songyuanshi|sys|8|658','白城市|baichengshi|bcs|8|659','延边朝鲜族自治州|yanbianchaoxianzuzizhizhou|ybcxzzzz|8|660','哈尔滨市|haerbinshi|hebs|9|729','齐齐哈尔市|qiqihaershi|qqhes|9|730','鸡西市|jixishi|jxs|9|731','鹤岗市|hegangshi|hgs|9|732','双鸭山市|shuangyashanshi|syss|9|733','大庆市|daqingshi|dqs|9|734','伊春市|yichunshi|ycs|9|735','佳木斯市|jiamusishi|jmss|9|736','七台河市|qitaiheshi|qths|9|737','牡丹江市|mudanjiangshi|mdjs|9|738','黑河市|heiheshi|hhs|9|739','绥化市|suihuashi|shs|9|740','大兴安岭地区|daxinganlingdiqu|dxaldq|9|741','上海市|shanghaishi|shs|10|883','南京市|nanjingshi|njs|11|900','无锡市|wuxishi|wxs|11|901','徐州市|xuzhoushi|xzs|11|902','常州市|changzhoushi|czs|11|903','苏州市|suzhoushi|szs|11|904','南通市|nantongshi|nts|11|905','连云港市|lianyungangshi|lygs|11|906','淮安市|huaianshi|has|11|907','盐城市|yanchengshi|ycs|11|908','扬州市|yangzhoushi|yzs|11|909','镇江市|zhenjiangshi|zjs|11|910','泰州市|taizhoushi|tzs|11|911','宿迁市|suqianshi|sqs|11|912','杭州市|hangzhoushi|hzs|12|1023','宁波市|ningboshi|nbs|12|1024','温州市|wenzhoushi|wzs|12|1025','嘉兴市|jiaxingshi|jxs|12|1026','湖州市|huzhoushi|hzs|12|1027','绍兴市|shaoxingshi|sxs|12|1028','金华市|jinhuashi|jhs|12|1029','衢州市|quzhoushi|qzs|12|1030','舟山市|zhoushanshi|zss|12|1031','台州市|taizhoushi|tzs|12|1032','丽水市|lishuishi|lss|12|1033','合肥市|hefeishi|hfs|13|1134','芜湖市|wuhushi|whs|13|1135','蚌埠市|bengbushi|bbs|13|1136','淮南市|huainanshi|hns|13|1137','马鞍山市|maanshanshi|mass|13|1138','淮北市|huaibeishi|hbs|13|1139','铜陵市|tonglingshi|tls|13|1140','安庆市|anqingshi|aqs|13|1141','黄山市|huangshanshi|hss|13|1142','滁州市|chuzhoushi|czs|13|1143','阜阳市|fuyangshi|fys|13|1144','宿州市|suzhoushi|szs|13|1145','六安市|luanshi|las|13|1146','亳州市|bozhoushi|bzs|13|1147','池州市|chizhoushi|czs|13|1148','宣城市|xuanchengshi|xcs|13|1149','福州市|fuzhoushi|fzs|14|1271','厦门市|xiamenshi|xms|14|1272','莆田市|putianshi|pts|14|1273','三明市|sanmingshi|sms|14|1274','泉州市|quanzhoushi|qzs|14|1275','漳州市|zhangzhoushi|zzs|14|1276','南平市|nanpingshi|nps|14|1277','龙岩市|longyanshi|lys|14|1278','宁德市|ningdeshi|nds|14|1279','南昌市|nanchangshi|ncs|15|1374','景德镇市|jingdezhenshi|jdzs|15|1375','萍乡市|pingxiangshi|pxs|15|1376','九江市|jiujiangshi|jjs|15|1377','新余市|xinyushi|xys|15|1378','鹰潭市|yingtanshi|yts|15|1379','赣州市|ganzhoushi|gzs|15|1380','吉安市|jianshi|jas|15|1381','宜春市|yichunshi|ycs|15|1382','抚州市|fuzhoushi|fzs|15|1383','上饶市|shangraoshi|srs|15|1384','济南市|jinanshi|jns|16|1496','青岛市|qingdaoshi|qds|16|1497','淄博市|ziboshi|zbs|16|1498','枣庄市|zaozhuangshi|zzs|16|1499','东营市|dongyingshi|dys|16|1500','烟台市|yantaishi|yts|16|1501','潍坊市|weifangshi|wfs|16|1502','济宁市|jiningshi|jns|16|1503','泰安市|taianshi|tas|16|1504','威海市|weihaishi|whs|16|1505','日照市|rizhaoshi|rzs|16|1506','临沂市|linyishi|lys|16|1507','德州市|dezhoushi|dzs|16|1508','聊城市|liaochengshi|lcs|16|1509','滨州市|binzhoushi|bzs|16|1510','菏泽市|hezeshi|hzs|16|1511','郑州市|zhengzhoushi|zzs|17|1665','开封市|kaifengshi|kfs|17|1666','洛阳市|luoyangshi|lys|17|1667','平顶山市|pingdingshanshi|pdss|17|1668','安阳市|anyangshi|ays|17|1669','鹤壁市|hebishi|hbs|17|1670','新乡市|xinxiangshi|xxs|17|1671','焦作市|jiaozuoshi|jzs|17|1672','濮阳市|puyangshi|pys|17|1673','许昌市|xuchangshi|xcs|17|1674','漯河市|taheshi|ths|17|1675','三门峡市|sanmenxiashi|smxs|17|1676','南阳市|nanyangshi|nys|17|1677','商丘市|shangqiushi|sqs|17|1678','信阳市|xinyangshi|xys|17|1679','周口市|zhoukoushi|zks|17|1680','驻马店市|zhumadianshi|zmds|17|1681','济源市|jiyuanshi|jys|17|1856','武汉市|wuhanshi|whs|18|1857','黄石市|huangshishi|hss|18|1858','十堰市|shiyanshi|sys|18|1859','宜昌市|yichangshi|ycs|18|1860','襄阳市|xiangyangshi|xys|18|1861','鄂州市|ezhoushi|ezs|18|1862','荆门市|jingmenshi|jms|18|1863','孝感市|xiaoganshi|xgs|18|1864','荆州市|jingzhoushi|jzs|18|1865','黄冈市|huanggangshi|hgs|18|1866','咸宁市|xianningshi|xns|18|1867','随州市|suizhoushi|szs|18|1868','恩施土家族苗族自治州|enshitujiazumiaozuzizhizhou|estjzmzzzz|18|1869','仙桃市|xiantaoshi|xts|18|1981','潜江市|qianjiangshi|qjs|18|1982','天门市|tianmenshi|tms|18|1983','神农架林区|shennongjialinqu|snjlq|18|1984','长沙市|changshashi|css|19|1985','株洲市|zhuzhoushi|zzs|19|1986','湘潭市|xiangtanshi|xts|19|1987','衡阳市|hengyangshi|hys|19|1988','邵阳市|shaoyangshi|sys|19|1989','岳阳市|yueyangshi|yys|19|1990','常德市|changdeshi|cds|19|1991','张家界市|zhangjiajieshi|zjjs|19|1992','益阳市|yiyangshi|yys|19|1993','郴州市|chenzhoushi|czs|19|1994','永州市|yongzhoushi|yzs|19|1995','怀化市|huaihuashi|hhs|19|1996','娄底市|loudishi|lds|19|1997','湘西土家族苗族自治州|xiangxitujiazumiaozuzizhizhou|xxtjzmzzzz|19|1998','广州市|guangzhoushi|gzs|20|2134','韶关市|shaoguanshi|sgs|20|2135','深圳市|shenzhenshi|szs|20|2136','珠海市|zhuhaishi|zhs|20|2137','汕头市|shantoushi|sts|20|2138','佛山市|foshanshi|fss|20|2139','江门市|jiangmenshi|jms|20|2140','湛江市|zhanjiangshi|zjs|20|2141','茂名市|maomingshi|mms|20|2142','肇庆市|zhaoqingshi|zqs|20|2143','惠州市|huizhoushi|hzs|20|2144','梅州市|meizhoushi|mzs|20|2145','汕尾市|shanweishi|sws|20|2146','河源市|heyuanshi|hys|20|2147','阳江市|yangjiangshi|yjs|20|2148','清远市|qingyuanshi|qys|20|2149','东莞市|dongguanshi|dgs|20|2150','中山市|zhongshanshi|zss|20|2151','潮州市|chaozhoushi|czs|20|2152','揭阳市|jieyangshi|jys|20|2153','云浮市|yunfushi|yfs|20|2154','南宁市|nanningshi|nns|21|2296','柳州市|liuzhoushi|lzs|21|2297','桂林市|guilinshi|gls|21|2298','梧州市|wuzhoushi|wzs|21|2299','北海市|beihaishi|bhs|21|2300','防城港市|fangchenggangshi|fcgs|21|2301','钦州市|qinzhoushi|qzs|21|2302','贵港市|guigangshi|ggs|21|2303','玉林市|yulinshi|yls|21|2304','百色市|baiseshi|bss|21|2305','贺州市|hezhoushi|hzs|21|2306','河池市|hechishi|hcs|21|2307','来宾市|laibinshi|lbs|21|2308','崇左市|chongzuoshi|czs|21|2309','海口市|haikoushi|hks|22|2435','三亚市|sanyashi|sys|22|2436','三沙市|sanshashi|sss|22|2437','儋州市|danzhoushi|dzs|22|2438','五指山市|wuzhishanshi|wzss|22|2453','琼海市|qionghaishi|qhs|22|2454','文昌市|wenchangshi|wcs|22|2455','万宁市|wanningshi|wns|22|2456','东方市|dongfangshi|dfs|22|2457','定安县|dinganxian|dax|22|2458','屯昌县|tunchangxian|tcx|22|2459','澄迈县|chengmaixian|cmx|22|2460','临高县|lingaoxian|lgx|22|2461','白沙黎族自治县|baishalizuzizhixian|bslzzzx|22|2462','昌江黎族自治县|changjianglizuzizhixian|cjlzzzx|22|2463','乐东黎族自治县|yuedonglizuzizhixian|ldlzzzx|22|2464','陵水黎族自治县|lingshuilizuzizhixian|lslzzzx|22|2465','保亭黎族苗族自治县|baotinglizumiaozuzizhixian|btlzmzzzx|22|2466','琼中黎族苗族自治县|qiongzhonglizumiaozuzizhixian|qzlzmzzzx|22|2467','重庆市|chongqingshi|cqs|23|2468','重庆市郊县|chongqingshijiaoxian|cqsjx|23|2469','成都市|chengdushi|cds|24|2508','自贡市|zigongshi|zgs|24|2509','攀枝花市|panzhihuashi|pzhs|24|2510','泸州市|luzhoushi|lzs|24|2511','德阳市|deyangshi|dys|24|2512','绵阳市|mianyangshi|mys|24|2513','广元市|guangyuanshi|gys|24|2514','遂宁市|suiningshi|sns|24|2515','内江市|neijiangshi|njs|24|2516','乐山市|yueshanshi|lss|24|2517','南充市|nanchongshi|ncs|24|2518','眉山市|meishanshi|mss|24|2519','宜宾市|yibinshi|ybs|24|2520','广安市|guanganshi|gas|24|2521','达州市|dazhoushi|dzs|24|2522','雅安市|yaanshi|yas|24|2523','巴中市|bazhongshi|bzs|24|2524','资阳市|ziyangshi|zys|24|2525','阿坝藏族羌族自治州|abazangzuqiangzuzizhizhou|abzzqzzzz|24|2526','甘孜藏族自治州|ganzizangzuzizhizhou|gzzzzzz|24|2527','凉山彝族自治州|liangshanyizuzizhizhou|lsyzzzz|24|2528','贵阳市|guiyangshi|gys|25|2730','六盘水市|lupanshuishi|lpss|25|2731','遵义市|zunyishi|zys|25|2732','安顺市|anshunshi|ass|25|2733','毕节市|bijieshi|bjs|25|2734','铜仁市|tongrenshi|trs|25|2735','黔西南布依族苗族自治州|qianxinanbuyizumiaozuzizhizhou|qxnbyzmzzzz|25|2736','黔东南苗族侗族自治州|qiandongnanmiaozudongzuzizhizhou|qdnmzdzzzz|25|2737','黔南布依族苗族自治州|qiannanbuyizumiaozuzizhizhou|qnbyzmzzzz|25|2738','昆明市|kunmingshi|kms|26|2830','曲靖市|qujingshi|qjs|26|2831','玉溪市|yuxishi|yxs|26|2832','保山市|baoshanshi|bss|26|2833','昭通市|zhaotongshi|zts|26|2834','丽江市|lijiangshi|ljs|26|2835','普洱市|puershi|pes|26|2836','临沧市|lincangshi|lcs|26|2837','楚雄彝族自治州|chuxiongyizuzizhizhou|cxyzzzz|26|2838','红河哈尼族彝族自治州|honghehanizuyizuzizhizhou|hhhnzyzzzz|26|2839','文山壮族苗族自治州|wenshanzhuangzumiaozuzizhizhou|wszzmzzzz|26|2840','西双版纳傣族自治州|xishuangbannadaizuzizhizhou|xsbndzzzz|26|2841','大理白族自治州|dalibaizuzizhizhou|dlbzzzz|26|2842','德宏傣族景颇族自治州|dehongdaizujingpozuzizhizhou|dhdzjpzzzz|26|2843','怒江傈僳族自治州|nujianglisuzuzizhizhou|njlszzzz|26|2844','迪庆藏族自治州|diqingzangzuzizhizhou|dqzzzzz|26|2845','拉萨市|lasashi|lss|27|2983','日喀则市|rikazeshi|rkzs|27|2984','昌都市|changdushi|cds|27|2985','林芝市|linzhishi|lzs|27|2986','山南市|shannanshi|sns|27|2987','那曲市|naqushi|nqs|27|2988','阿里地区|alidiqu|aldq|27|2989','西安市|xianshi|xas|28|3065','铜川市|tongchuanshi|tcs|28|3066','宝鸡市|baojishi|bjs|28|3067','咸阳市|xianyangshi|xys|28|3068','渭南市|weinanshi|wns|28|3069','延安市|yananshi|yas|28|3070','汉中市|hanzhongshi|hzs|28|3071','榆林市|yulinshi|yls|28|3072','安康市|ankangshi|aks|28|3073','商洛市|shangluoshi|sls|28|3074','兰州市|lanzhoushi|lzs|29|3192','嘉峪关市|jiayuguanshi|jygs|29|3193','金昌市|jinchangshi|jcs|29|3194','白银市|baiyinshi|bys|29|3195','天水市|tianshuishi|tss|29|3196','武威市|wuweishi|wws|29|3197','张掖市|zhangyeshi|zys|29|3198','平凉市|pingliangshi|pls|29|3199','酒泉市|jiuquanshi|jqs|29|3200','庆阳市|qingyangshi|qys|29|3201','定西市|dingxishi|dxs|29|3202','陇南市|longnanshi|lns|29|3203','临夏回族自治州|linxiahuizuzizhizhou|lxhzzzz|29|3204','甘南藏族自治州|gannanzangzuzizhizhou|gnzzzzz|29|3205','西宁市|xiningshi|xns|30|3304','海东市|haidongshi|hds|30|3305','海北藏族自治州|haibeizangzuzizhizhou|hbzzzzz|30|3306','黄南藏族自治州|huangnanzangzuzizhizhou|hnzzzzz|30|3307','海南藏族自治州|hainanzangzuzizhizhou|hnzzzzz|30|3308','果洛藏族自治州|guoluozangzuzizhizhou|glzzzzz|30|3309','玉树藏族自治州|yushuzangzuzizhizhou|yszzzzz|30|3310','海西蒙古族藏族自治州|haiximengguzuzangzuzizhizhou|hxmgzzzzzz|30|3311','银川市|yinchuanshi|ycs|31|3358','石嘴山市|shizuishanshi|szss|31|3359','吴忠市|wuzhongshi|wzs|31|3360','固原市|guyuanshi|gys|31|3361','中卫市|zhongweishi|zws|31|3362','乌鲁木齐市|wulumuqishi|wlmqs|32|3390','克拉玛依市|kelamayishi|klmys|32|3391','吐鲁番市|tulufanshi|tlfs|32|3392','哈密市|hamishi|hms|32|3393','昌吉回族自治州|changjihuizuzizhizhou|cjhzzzz|32|3394','博尔塔拉蒙古自治州|boertalamengguzizhizhou|betlmgzzz|32|3395','巴音郭楞蒙古自治州|bayinguolengmengguzizhizhou|byglmgzzz|32|3396','阿克苏地区|akesudiqu|aksdq|32|3397','克孜勒苏柯尔克孜自治州|kezilesukeerkezizizhizhou|kzlskekzzzz|32|3398','喀什地区|kashidiqu|ksdq|32|3399','和田地区|hetiandiqu|htdq|32|3400','伊犁哈萨克自治州|yilihasakezizhizhou|ylhskzzz|32|3401','塔城地区|tachengdiqu|tcdq|32|3402','阿勒泰地区|aleitaidiqu|altdq|32|3403','石河子市|shihezishi|shzs|32|3502','阿拉尔市|alaershi|ales|32|3503','图木舒克市|tumushukeshi|tmsks|32|3504','五家渠市|wujiaqushi|wjqs|32|3505','北屯市|beitunshi|bts|32|3506','铁门关市|tiemenguanshi|tmgs|32|3507','双河市|shuangheshi|shs|32|3508','可克达拉市|kekedalashi|kkdls|32|3509','昆玉市|kunyushi|kys|32|3510','中西区|zhongxiqu|zxq|34|3511','湾仔区|wanzaiqu|wzq|34|3512','东区|dongqu|dq|34|3513','南区|nanqu|nq|34|3514','油尖旺区|youjianwangqu|yjwq|34|3515','深水埗区|shenshuibuqu|ssbq|34|3516','九龙城区|jiulongchengqu|jlcq|34|3517','黄大仙区|huangdaxianqu|hdxq|34|3518','观塘区|guantangqu|gtq|34|3519','荃湾区|quanwanqu|qwq|34|3520','屯门区|tunmenqu|tmq|34|3521','元朗区|yuanlangqu|ylq|34|3522','北区|beiqu|bq|34|3523','大埔区|dabuqu|dbq|34|3524','西贡区|xigongqu|xgq|34|3525','沙田区|shatianqu|stq|34|3526','葵青区|kuiqingqu|kqq|34|3527','离岛区|lidaoqu|ldq|34|3528','花地玛堂区|huadimatangqu|hdmtq|35|3529','花王堂区|huawangtangqu|hwtq|35|3530','望德堂区|wangdetangqu|wdtq|35|3531','大堂区|datangqu|dtq|35|3532','风顺堂区|fengshuntangqu|fstq|35|3533','嘉模堂区|jiamotangqu|jmtq|35|3534','路凼填海区|ludangtianhaiqu|ldthq|35|3535','圣方济各堂区|shengfangjigetangqu|sfjgtq|35|3536','燕郊|yanjiao|yj|4|3623'];


/* 正则表达式 筛选中文城市名、拼音、首字母 */

Vcity.regEx = /^([\u4E00-\u9FA5\uf900-\ufa2d]+)\|(\w+)\|(\w)\w*\|([0-9]*)\|([0-9]*)$/i;
Vcity.regExChiese = /([\u4E00-\u9FA5\uf900-\ufa2d]+)/;

/* *
 * 格式化城市数组为对象oCity，按照a-h,i-p,q-z,hot热门城市分组：
 * {HOT:{hot:[]},ABCDEFGH:{a:[1,2,3],b:[1,2,3]},IJKLMNOP:{i:[1.2.3],j:[1,2,3]},QRSTUVWXYZ:{}}
 * */
(function () {
    var citys = Vcity.allCity, match, letter,
            regEx = Vcity.regEx,
            reg2 = /^[a-b]$/i, reg3 = /^[c-d]$/i, reg4 = /^[e-g]$/i,reg5 = /^[h]$/i,reg6 = /^[j]$/i,reg7 = /^[k-l]$/i,reg8 =  /^[m-p]$/i,reg9 =  /^[q-r]$/i,reg10 =  /^[s]$/i,reg11 =  /^[t]$/i,reg12 =  /^[w]$/i,reg13 =  /^[x]$/i,reg14 =  /^[y]$/i,reg15 =  /^[z]$/i;
    if (!Vcity.oCity) {
        Vcity.oCity = {hot:{},AB:{},CD:{},EFG:{},H:{},J:{},KL:{},MNP:{},QR:{},S:{},T:{},W:{},X:{},Y:{},Z:{}};
        
        //console.log(citys.length);
        for (var i = 0, n = citys.length; i < n; i++) {
            match = regEx.exec(citys[i]);
            letter = match[3].toUpperCase();
            if (reg2.test(letter)) {
                if (!Vcity.oCity.AB[letter]) Vcity.oCity.AB[letter] = [];
                Vcity.oCity.AB[letter].push(match[0]);
            } else if (reg3.test(letter)) {
                if (!Vcity.oCity.CD[letter]) Vcity.oCity.CD[letter] = [];
                Vcity.oCity.CD[letter].push(match[0]);
            } else if (reg4.test(letter)) {
                if (!Vcity.oCity.EFG[letter]) Vcity.oCity.EFG[letter] = [];
                Vcity.oCity.EFG[letter].push(match[0]);
            }else if (reg5.test(letter)) {
                if (!Vcity.oCity.H[letter]) Vcity.oCity.H[letter] = [];
                Vcity.oCity.H[letter].push(match[0]);
            }else if (reg6.test(letter)) {
                if (!Vcity.oCity.J[letter]) Vcity.oCity.J[letter] = [];
                Vcity.oCity.J[letter].push(match[0]);
            }else if (reg7.test(letter)) {
                if (!Vcity.oCity.KL[letter]) Vcity.oCity.KL[letter] = [];
                Vcity.oCity.KL[letter].push(match[0]);
            }else if (reg8.test(letter)) {
                if (!Vcity.oCity.MNP[letter]) Vcity.oCity.MNP[letter] = [];
                Vcity.oCity.MNP[letter].push(match[0]);
            }else if (reg9.test(letter)) {
                if (!Vcity.oCity.QR[letter]) Vcity.oCity.QR[letter] = [];
                Vcity.oCity.QR[letter].push(match[0]);
            }else if (reg10.test(letter)) {
                if (!Vcity.oCity.S[letter]) Vcity.oCity.S[letter] = [];
                Vcity.oCity.S[letter].push(match[0]);
            }else if (reg11.test(letter)) {
                if (!Vcity.oCity.T[letter]) Vcity.oCity.T[letter] = [];
                Vcity.oCity.T[letter].push(match[0]);
            }else if (reg12.test(letter)) {
                if (!Vcity.oCity.W[letter]) Vcity.oCity.W[letter] = [];
                Vcity.oCity.W[letter].push(match[0]);
            }else if (reg13.test(letter)) {
                if (!Vcity.oCity.X[letter]) Vcity.oCity.X[letter] = [];
                Vcity.oCity.X[letter].push(match[0]);
            }else if (reg14.test(letter)) {
                if (!Vcity.oCity.Y[letter]) Vcity.oCity.Y[letter] = [];
                Vcity.oCity.Y[letter].push(match[0]);
            }else if (reg15.test(letter)) {
                if (!Vcity.oCity.Z[letter]) Vcity.oCity.Z[letter] = [];
                Vcity.oCity.Z[letter].push(match[0]);
            }

            /* 热门城市 前16条 */
            if(i<20){
                if(!Vcity.oCity.hot['hot']) Vcity.oCity.hot['hot'] = [];
                Vcity.oCity.hot['hot'].push(match[0]);
            }
        }
    }
})();


/* 城市HTML模板 */
Vcity._template = [
    '<p class="tip">直接输入可搜索城市(支持汉字/拼音)</p>',
    '<ul>',
    '<li class="on">热门城市</li>',
    '<li>AB</li>',
    '<li>CD</li>',
    '<li>EFG</li>',
    '<li>H</li>',
    '<li>J</li>',
    '<li>KL</li>',
    '<li>MNP</li>',
    '<li>QR</li>',
    '<li>S</li>',
    '<li>T</li>',
    '<li>W</li>',
    '<li>X</li>',
    '<li>Y</li>',
    '<li>Z</li>',
    '</ul>'
];

/* *
 * 城市控件构造函数
 * @CitySelector
 * */

Vcity.CitySelector = function () {
    this.initialize.apply(this, arguments);
};

Vcity.CitySelector.prototype = {

    constructor:Vcity.CitySelector,

    /* 初始化 */

    initialize :function (options) {
        var input = options.input;
        this.input = Vcity._m.$('#'+ input);
        this.inputEvent();
    },

    /* *
        

    /* *
     * @createWarp
     * 创建城市BOX HTML 框架
     * */

    createWarp:function(){
        var inputPos = Vcity._m.getPos(this.input);
        var div = this.rootDiv = document.createElement('div');
        var that = this;

        // 设置DIV阻止冒泡
        Vcity._m.on(this.rootDiv,'click',function(event){
            Vcity._m.stopPropagation(event);
        });

        // 设置点击文档隐藏弹出的城市选择框
        Vcity._m.on(document, 'click', function (event) {
            event = Vcity._m.getEvent(event);
            var target = Vcity._m.getTarget(event);
            if(target == that.input) return false;
            //console.log(target.className);
            if (that.cityBox)Vcity._m.addClass('hide', that.cityBox);
            if (that.ul)Vcity._m.addClass('hide', that.ul);
            if(that.myIframe)Vcity._m.addClass('hide',that.myIframe);
        });
        div.className = 'citySelector';
        div.style.position = 'absolute';
        div.style.left = inputPos.left + 'px';
        div.style.top = inputPos.bottom + 5 + 'px';
        div.style.zIndex = 999999;

        // 判断是否IE6，如果是IE6需要添加iframe才能遮住SELECT框
        var isIe = (document.all) ? true : false;
        var isIE6 = this.isIE6 = isIe && !window.XMLHttpRequest;
        if(isIE6){
            var myIframe = this.myIframe =  document.createElement('iframe');
            myIframe.frameborder = '0';
            myIframe.src = 'about:blank';
            myIframe.style.position = 'absolute';
            myIframe.style.zIndex = '-1';
            this.rootDiv.appendChild(this.myIframe);
        }

        var childdiv = this.cityBox = document.createElement('div');
        childdiv.className = 'cityBox';
        childdiv.id = 'cityBox';
        childdiv.innerHTML = Vcity._template.join('');
        var hotCity = this.hotCity =  document.createElement('div');
        hotCity.className = 'hotCity';
        childdiv.appendChild(hotCity);
        div.appendChild(childdiv);
        this.createHotCity();
    },

    /* *
     * @createHotCity
     * TAB下面DIV：hot,a-h,i-p,q-z 分类HTML生成，DOM操作
     * {HOT:{hot:[]},ABCDEFGH:{a:[1,2,3],b:[1,2,3]},IJKLMNOP:{},QRSTUVWXYZ:{}}
     **/

    createHotCity:function(){
        var odiv,odl,odt,odd,odda=[],str,key,ckey,sortKey,regEx = Vcity.regEx,
                oCity = Vcity.oCity;
        for(key in oCity){
            odiv = this[key] = document.createElement('div');
            // 先设置全部隐藏hide
            odiv.className = key + ' ' + 'cityTab hide';
            sortKey=[];
            for(ckey in oCity[key]){
                sortKey.push(ckey);
                // ckey按照ABCDEDG顺序排序
                sortKey.sort();
            }
            for(var j=0,k = sortKey.length;j<k;j++){
                odl = document.createElement('dl');
                odt = document.createElement('dt');
                odd = document.createElement('dd');
                odt.innerHTML = sortKey[j] == 'hot'?'&nbsp;':sortKey[j];
                odda = [];
                for(var i=0,n=oCity[key][sortKey[j]].length;i<n;i++){
                    str = '<a href="javascript:;" data-fid="' + oCity[key][sortKey[j]][i].split("|")[3] + '" data-id="' + oCity[key][sortKey[j]][i].split("|")[4] + '">' + oCity[key][sortKey[j]][i].split("|")[0] + '</a>';
                    odda.push(str);
                }
                odd.innerHTML = odda.join('');
                odl.appendChild(odt);
                odl.appendChild(odd);
                odiv.appendChild(odl);
            }

            // 移除热门城市的隐藏CSS
            Vcity._m.removeClass('hide',this.hot);
            this.hotCity.appendChild(odiv);
        }
        document.body.appendChild(this.rootDiv);
        /* IE6 */
        this.changeIframe();

        this.tabChange();
        this.linkEvent();
    },

    /* *
     *  tab按字母顺序切换
     *  @ tabChange
     * */

    tabChange:function(){
        var lis = Vcity._m.$('li',this.cityBox);
        var divs = Vcity._m.$('div',this.hotCity);
        var that = this;
        for(var i=0,n=lis.length;i<n;i++){
            lis[i].index = i;
            lis[i].onclick = function(){
                for(var j=0;j<n;j++){
                    Vcity._m.removeClass('on',lis[j]);
                    Vcity._m.addClass('hide',divs[j]);
                }
                Vcity._m.addClass('on',this);
                Vcity._m.removeClass('hide',divs[this.index]);
                /* IE6 改变TAB的时候 改变Iframe 大小*/
                that.changeIframe();
            };
        }
    },

    /* *
     * 城市LINK事件
     *  @linkEvent
     * */

    linkEvent:function(){
        var links = Vcity._m.$('a',this.hotCity);
        var that = this;
        for(var i=0,n=links.length;i<n;i++){
            links[i].onclick = function(){
                that.input.value = this.innerHTML;
                $('#sheng-id').val(this.getAttribute('data-fid'));
                $('#shi-id').val(this.getAttribute('data-id'));
                Vcity._m.addClass('hide',that.cityBox);
                /* 点击城市名的时候隐藏myIframe */
                Vcity._m.addClass('hide',that.myIframe);
                $(".city-input .arrow").removeClass("rotate");
            }
        }
    },

    /* *
     * INPUT城市输入框事件
     * @inputEvent
     * */

    inputEvent:function(){
        var that = this;
        Vcity._m.on(this.input,'click',function(event){
            event = event || window.event;
            if(!that.cityBox){
                that.createWarp();
            }else if(!!that.cityBox && Vcity._m.hasClass('hide',that.cityBox)){
                // slideul 不存在或者 slideul存在但是是隐藏的时候 两者不能共存
                if(!that.ul || (that.ul && Vcity._m.hasClass('hide',that.ul))){
                    Vcity._m.removeClass('hide',that.cityBox);

                    /* IE6 移除iframe 的hide 样式 */
                    //alert('click');
                    Vcity._m.removeClass('hide',that.myIframe);
                    that.changeIframe();
                }
            }
        });
        // Vcity._m.on(this.input,'focus',function(){
        //     that.input.select();
        //     if(that.input.value == '城市名') that.input.value = '';
        // });
        Vcity._m.on(this.input,'blur',function(){
            // if(that.input.value == '') that.input.value = '城市名';
            
            var value = Vcity._m.trim(that.input.value);
            if(value != ''){
                var reg = new RegExp("^" + value + "|\\|" + value, 'gi');
                var flag=0;
                for (var i = 0, n = Vcity.allCity.length; i < n; i++) {
                    if (reg.test(Vcity.allCity[i])) {
                        flag++;
                    }
                }
                if(flag==0){
                    that.input.value= '';
                }else{
                    var lis = Vcity._m.$('li',that.ul);
                    if(typeof lis == 'object' && lis['length'] > 0){
                        var li = lis[0];
                        var bs = li.children;
                        if(bs && bs['length'] > 1){
                            that.input.value = bs[0].innerHTML;
                        }
                    }else{
                        that.input.value = '';
                    }
                }
            }

        });
        Vcity._m.on(this.input,'keyup',function(event){
            event = event || window.event;
            var keycode = event.keyCode;
            Vcity._m.addClass('hide',that.cityBox);
            that.createUl();

            /* 移除iframe 的hide 样式 */
            Vcity._m.removeClass('hide',that.myIframe);

            // 下拉菜单显示的时候捕捉按键事件
            if(that.ul && !Vcity._m.hasClass('hide',that.ul) && !that.isEmpty){
                that.KeyboardEvent(event,keycode);
            }
        });
    },

    /* *
     * 生成下拉选择列表
     * @ createUl
     * */

    createUl:function () {
        //console.log('createUL');
        var str;
        var value = Vcity._m.trim(this.input.value);
        // 当value不等于空的时候执行
        if (value !== '') {
            var reg = new RegExp("^" + value + "|\\|" + value, 'gi');
            // 此处需设置中文输入法也可用onpropertychange
            var searchResult = [];
            for (var i = 0, n = Vcity.allCity.length; i < n; i++) {
                if (reg.test(Vcity.allCity[i])) {
                    var match = Vcity.regEx.exec(Vcity.allCity[i]);
                    if (searchResult.length !== 0) {
                        str = '<li data-fid="' + match[4] + '" data-id="' + match[5] + '"><b class="cityname">' + match[1] + '</b><b class="cityspell">' + match[2] + '</b></li>';
                    } else {
                        str = '<li data-fid="' + match[4] + '" data-id="' + match[5] + '" class="on"><b class="cityname">' + match[1] + '</b><b class="cityspell">' + match[2] + '</b></li>';
                    }
                    searchResult.push(str);
                }
            }
            this.isEmpty = false;
            // 如果搜索数据为空
            if (searchResult.length == 0) {
                this.isEmpty = true;
                str = '<li class="empty">对不起，没有找到 "<em>' + value + '</em>"</li>';
                searchResult.push(str);
            }
            // 如果slideul不存在则添加ul
            if (!this.ul) {
                var ul = this.ul = document.createElement('ul');
                ul.className = 'cityslide mCustomScrollbar';
                this.rootDiv && this.rootDiv.appendChild(ul);
                // 记录按键次数，方向键
                this.count = 0;
            } else if (this.ul && Vcity._m.hasClass('hide', this.ul)) {
                this.count = 0;
                Vcity._m.removeClass('hide', this.ul);
            }
            this.ul.innerHTML = searchResult.join('');

            /* IE6 */
            this.changeIframe();

            // 绑定Li事件
            this.liEvent();
        }else{
            Vcity._m.addClass('hide',this.ul);
            Vcity._m.removeClass('hide',this.cityBox);

            Vcity._m.removeClass('hide',this.myIframe);

            this.changeIframe();
        }
    },

    /* IE6的改变遮罩SELECT 的 IFRAME尺寸大小 */
    changeIframe:function(){
        if(!this.isIE6)return;
        this.myIframe.style.width = this.rootDiv.offsetWidth + 'px';
        this.myIframe.style.height = this.rootDiv.offsetHeight + 'px';
    },

    /* *
     * 特定键盘事件，上、下、Enter键
     * @ KeyboardEvent
     * */

    KeyboardEvent:function(event,keycode){
        var lis = Vcity._m.$('li',this.ul);
        var len = lis.length;
        switch(keycode){
            case 40: //向下箭头↓
                this.count++;
                if(this.count > len-1) this.count = 0;
                for(var i=0;i<len;i++){
                    Vcity._m.removeClass('on',lis[i]);
                }
                Vcity._m.addClass('on',lis[this.count]);
                break;
            case 38: //向上箭头↑
                this.count--;
                if(this.count<0) this.count = len-1;
                for(i=0;i<len;i++){
                    Vcity._m.removeClass('on',lis[i]);
                }
                Vcity._m.addClass('on',lis[this.count]);
                break;
            case 13: // enter键
                this.input.value = Vcity.regExChiese.exec(lis[this.count].innerHTML)[0];
                $('#sheng-id').val(lis[this.count].getAttribute('data-fid'));
                $('#shi-id').val(lis[this.count].getAttribute('data-id'));
                Vcity._m.addClass('hide',this.ul);
                Vcity._m.addClass('hide',this.ul);
                /* IE6 */
                Vcity._m.addClass('hide',this.myIframe);
                $(".city-input .arrow").removeClass("rotate");
                break;
            default:
                break;
        }
    },

    /* *
     * 下拉列表的li事件
     * @ liEvent
     * */

    liEvent:function(){
        var that = this;
        var lis = Vcity._m.$('li',this.ul);
        for(var i = 0,n = lis.length;i < n;i++){
            Vcity._m.on(lis[i],'click',function(event){ 
                event = Vcity._m.getEvent(event);
                var target = Vcity._m.getTarget(event);
                $('#sheng-id').val(target.getAttribute('data-fid'));
                $('#shi-id').val(target.getAttribute('data-id'));
                that.input.value = Vcity.regExChiese.exec(target.innerHTML)[0];
                Vcity._m.addClass('hide',that.ul);
                /* IE6 下拉菜单点击事件 */
                Vcity._m.addClass('hide',that.myIframe);
            });
            Vcity._m.on(lis[i],'mouseover',function(event){
                event = Vcity._m.getEvent(event);
                var target = Vcity._m.getTarget(event);
                Vcity._m.addClass('on',target);
            });
            Vcity._m.on(lis[i],'mouseout',function(event){
                event = Vcity._m.getEvent(event);
                var target = Vcity._m.getTarget(event);
                Vcity._m.removeClass('on',target);
            })
        }
    }
};