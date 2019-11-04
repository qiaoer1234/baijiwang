function child_of(a,b){
    while(a=a.parentNode){
        if(a==b)return true;
    }
    return false;
}


(function(){
    var Crc32Table=[], map_hex2 = ["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];
    function MakeTable()
    {
        var i,j,crc;
        for (i = 0; i < 256; i++)
        {
            crc = i;
            for (j = 0; j < 8; j++)
            {
                if (crc & 1)
                    crc = (crc >>> 1) ^ 0xEDB88320;
                else
                    crc >>>= 1;
            }
            Crc32Table[i] = crc;
        }
    }
    function GetCrc(csData)
    {
        if(typeof csData == 'string') csData = Utf8.getByteArray(csData);
        var crc  = 0xffffffff, len = csData.length, i=0;

        for(var i=0;i<len;i++)
        {
            crc = (crc >>> 8) ^ Crc32Table[(crc^ csData[i]) & 0xff ];
        }
        return word2hex(crc ^ 0xffffffff);
    }
    function word2hex(word){
        return map_hex2[word>>>24] +
            map_hex2[(word>>16) & 0xff] +
            map_hex2[(word>>8) & 0xff] +
            map_hex2[word & 0xff];
    }
    MakeTable();
    window.Crc32 = GetCrc;
    window.Utf8 = (function(){
        var utoutf8=function(u){
            var a,b,c,d;
            if(u<=0x7f) return u;
            else if(u<=0x07FF){
                a = 0xc0 | (u >> 6);
                b = 0x80 | (u & 0x3f);
                return (a<<8) | b;
            }
            else if(u<=0xFFFF){
                a = 0xe0 | (u >> 12);
                b = 0x80 | ((u >> 6) & 0x3f);
                c = 0x80 | (u & 0x3f);
                return (a<<16) | (b<<8) | c;
            }
            else if(u<=0x10FFFF){
                a = 0xf0 | (u >> 18);
                b = 0x80 | ((u >> 12) & 0x3f);
                c = 0x80 | ((u >> 6) & 0x3f);
                d = 0x80 | (u & 0x3f);
                var ret = (a<<24) | (b<<16) | (c<<8) | d;
                if(ret<0)ret+=0x100000000;
                return ret;
            }else return 0;
        };
        var utf8tou=function(u){
            var a,b,c,d;
            if(u<=0x7f) return u;
            else if(u<=0xdfbf) {
                a = (u >> 8) & 0x1f;
                b = u & 0x3f;
                return (a << 6) | b;
            }
            else if(u<=0xefbfbf) {
                a = (u >> 16) & 0xf;
                b = (u >> 8) & 0x3f;
                c = u & 0x3f;
                return (a << 12) | (b << 6) | c;
            }
            else if(u<=0xf48fbfbf) {
                a = (u >>> 24) & 0x7;
                b = (u >> 16) & 0x3f;
                c = (u >> 8) & 0x3f;
                d = u & 0x3f;
                return (a << 18) | (b << 12) | (c << 6) | d;
            }
            else return 0;
        };
        var bytestoword = function(u,i){
            var c = u[i],ret=[1,c];
            if(c<=0x7f)ret[1]=c;
            else if(c<=0xDF){
                ret[1]=(c << 8) | u[i+1];
                ret[0]=2;
            }else if(c<=0xEF){
                ret[1]=(c << 16) | (u[i+1] << 8) | u[i+2];
                ret[0]=3;
            }else if(c<=0xF7){
                ret[1]=(c << 24) | (u[i+1] << 16) | (u[i+2] << 8) | u[i+3];
                ret[0]=4;
            }
            return ret;
        };
        var $utf8={};
        $utf8.getWordArray = function(u){
            if(u.length<=0)return [];
            var i=0,c,ret=[];
            while(i<u.length){
                c = u.charCodeAt(i);
                if(c<0x7f) ret.push(c);
                else{
                    ret.push(utoutf8(c));
                }
                i++;
            }
            return ret;
        };
        $utf8.bytesToWords = function(u){
            if(u.length<=0)return [];
            var i=0,c,ret=[];
            while(i<u.length){
                var word = bytestoword(u,i);
                ret.push(word[1]);
                i+=word[0];
            }
            return ret;
        };
        $utf8.getByteArray = function(u){
            var _len = u.length;
            if(_len<=0)return [];
            var i=0,c,ret=[];
            while(i<_len){
                c = u.charCodeAt(i);
                if(c<0x7f) ret.push(c);
                else{
                    var word = utoutf8(c);
                    if(word>0xffffff) {
                        ret.push(u >>> 24,(u >> 16) & 0xff,(u >> 8) & 0xff,u & 0xff);
                    }else if(word>0xffff){
                        ret.push(word >> 16,(word >> 8) & 0xff,word & 0xff);
                    }else if(word>0xff){
                        ret.push(word >> 8,word & 0xff);
                    }
                }
                i++;
            }
            return ret;
        };
        $utf8.getBinary = function(u){
            return String.fromCharCode.apply(null,$utf8.getByteArray(u));
        };
        $utf8.toString = function(u){
            var _len = u.length;
            if(_len<=0)return "";
            var i=0,c,ret="";
            while(i<_len){
                if(u[i]<0x7f) ret+=String.fromCharCode(u[i]);
                else{
                    ret+=String.fromCharCode(utf8tou(u[i]));
                }
                i++;
            }
            return ret;
        };
        $utf8.getString = function(u){
            var _len = u.length;
            if(_len<=0)return [];
            var i=0,c,ret="";
            while(i<_len){
                var word = bytestoword(u,i);
                ret+=String.fromCharCode(utf8tou(word[1]));
                i+=word[0];
            }
            return ret;
        };
        return $utf8;
    })();
})();