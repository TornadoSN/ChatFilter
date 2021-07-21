if (((localStorage.getItem('tr-antimainchat') == "1") ? "1" : "0") == "1") {
    var trdiv = document.getElementById("chat-global");
    if (trdiv != null) {
        trdiv.parentNode.removeChild(trdiv);
    }
}

$(document).ready(function () {
    function Terminator() {
        this.version = localStorage.getItem('tr-ver') != undefined ? localStorage.getItem('tr-ver') : "";
        this.home = localStorage.getItem('tr-home') != undefined ? localStorage.getItem('tr-home') : "";
    }
    Terminator.prototype.run = function () {
        console.log(this.version);
        var waitPanel = setInterval(function () {
            if ($(".stream-starter").length) {
                if ($(".video-output-container").length) {
                    clearInterval(waitPanel);
                    Terminator.initSmailes();
                } else {
                    return true;
                }
            }
            if ($("i.em-smiley").length) {
                clearInterval(waitPanel);
                Terminator.initSmailes();
            }
        }, 3000);
    };

    Terminator.prototype.initSmailes = function () {
        $("i.em-smiley").parent().parent().before('<div class="col text-right"><span id="tr-smbtn" class="toggler cursor-pointer smiles mr-3"><i class="em em-nerd_face"></i></span></div>');
        Terminator.loader("css", this.home + "css/main.css?r=" + Math.random());
        Terminator.loader("js", this.home + "js/functions.js?r=" + Math.random(), function () {
            Terminator.createSmilesBox();
        });
        if (((localStorage.getItem('tr-template') == "1") ? "1" : "0") == "1") {
            Terminator.loader("css-template", this.home + 'templates/livacha/' + ((localStorage.getItem('tr-template-name') == undefined) ? 'aa' : localStorage.getItem('tr-template-name')) + '.css?r=' + Math.random());
        }
    }

    Terminator.prototype.loader = function (type, url, cb) {
        var xhr = new XMLHttpRequest(),
            f = false;
        xhr.open("get", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                    switch (type) {
                        case "css":
                            head = document.head || document.getElementsByTagName('head')[0],
                                style = document.createElement('style');
                            style.type = 'text/css';
                            if (style.styleSheet) {
                                style.styleSheet.cssText = xhr.responseText;
                            } else {
                                style.appendChild(document.createTextNode(xhr.responseText));
                            }
                            head.appendChild(style);
                            break;
                        case "css-template":
                            head = document.head || document.getElementsByTagName('head')[0];
                            style = document.createElement('style');
                            style.type = 'text/css';
                            var s = xhr.responseText;
                            s = s.replace("[BASE_PATH]", Terminator.home);
                            if (style.styleSheet) {
                                style.styleSheet.cssText = s;
                            } else {
                                style.appendChild(document.createTextNode(s));
                            }
                            head.appendChild(style);
                            //$("body").find(":last").after(style);
                            break;
                        case "js":
                            f = document.createElement("script");
                            f.type = "text/javascript";
                            f.text = xhr.responseText;
                            document.body.appendChild(f);
                            break;
                    }
                    if (typeof cb === "function") {
                        cb();
                    }
                }
            }
        };
        xhr.send(null);
    }

    Terminator.prototype.playSound = function (url) {
        if ($("#traudio").length) {
            $("#traudio").remove();
        }
        if (!$("#traudio").length) {
            var sound = document.createElement('audio');
            sound.id = 'traudio';
            sound.controls = 'controls';
            sound.src = url;
            sound.type = 'audio/mpeg';
            sound.autobuffer = true;
            sound.controls = true;
            sound.style.position = 'fixed';
            sound.style.bottom = '30px';
            sound.addEventListener("play", function () {}, false);
            sound.addEventListener("ended", function () {
                sound.style.visibility = 'hidden';
            }, false);
            document.body.appendChild(sound);
            sound.play();
            //    const playPromise = sound.play();
            //    if (playPromise !== null) {
            //        playPromise.catch(() => {
            //            sound.play();
            //        })
            // }
        }

    }
    Terminator.prototype.createTempChat = function () {
        if (((localStorage.getItem('tr-tempchat') == "1") ? "1" : "0") == "1") {
            if ($(".tr-tempchat").length) {
                return true;
            }
            $("#page").append($("<div/>").addClass("tr-tempchat").prepend($("<div/>").addClass("tr-tempchat-title").prepend('<span>Резервный чат</span><span class="tr-tempchat-close"></span>')));
            $('.tr-tempchat').tr_drags({
                handle: ".tr-tempchat-title"
            });

            $($("<div/>").addClass("tr-chatovod")).insertAfter($(".tr-tempchat-title"));
            $(".tr-chatovod").prepend('<center><iframe class="chatovodframe" src="//semantic.chatovod.ru/" frameborder="0" marginheight="0" marginwidth="0" width="385" height="345"></iframe></center>');


            $('.tr-tempchat').sizeChanged(function (size) {
                $('.chatovodframe').css('height', size.height - 55);
                $('.chatovodframe').css('width', size.width - 25);
            });
            $(".tr-tempchat-close").on("click", function (e) {
                e.preventDefault();
                $(".tr-tempchat").remove();
            });


        }
    }
    Terminator.prototype.createSmilesBox = function () {

        Terminator.createTempChat();

        $("#page").append($("<div/>").addClass("tr-window").prepend($("<div/>").addClass("tr-title").prepend('<span>Смайлы</span><span class="tr-close"></span>')));
        $($("<div/>").addClass("tr-tabs")).insertAfter($(".tr-title"));
        for (var i = 9; i >= 0; i--) {
            $(".tr-window .tr-tabs").prepend($("<div/>").addClass("tr-tab-content tr-sm" + i + "-block"));
        }
        $(".tr-sm0-block").addClass("active");
        $(".tr-tabs")
            .prepend('<ul class="tr-tab-caption"><li class="active"><img src="' + this.home + 'ico/0.png"></li><li><img src="' + this.home + 'ico/1.png"></li><li><img src="' + this.home + 'ico/2.png"></li</li><li><img src="' + this.home + 'ico/3.png"></li><li><img src="' + this.home + 'ico/4.png"></li><li><img src="' + this.home + 'ico/5.png"></li><li><img src="' + this.home + 'ico/6.png"></li><li><img src="' + this.home + 'ico/7.png"></li><li><img src="' + this.home + 'ico/8.png"></li><li><img src="' + this.home + 'ico/9.png"></l></ul>');
        $('.tr-window').tr_drags({
            handle: ".tr-title"
        });
        $(".tr-close").on("click", function (e) {
            e.preventDefault();
            localStorage.setItem('tr-win-y', $(".tr-window").offset().top);
            localStorage.setItem('tr-win-x', $(".tr-window").offset().left);
            $(".tr-window").css("visibility", "hidden");
        });

        $('ul.tr-tab-caption').on('click', 'li:not(.active)', function () {
            $(this)
                .addClass('active').siblings().removeClass('active')
                .closest('div.tr-tabs').find('div.tr-tab-content').removeClass('active').eq($(this).index()).addClass('active');
        });
        var smilespack = [];
        smilespack["1"] = [
            "Девочка", "xe", "lm", "he", "hk", "lp", "hp", "iv", "fi", "jh", "aa", "aj", "cm", "cn", "co", "cp", "cq", "cr", "cs", "ct", "cu", "cw", "cx", "cy", "cz", "da", "db", "go", "qe", "ef", "eh", "ey", "ez", "ff", "fg", "fj", "fl", "fm", "fp", "ft", "fv", "fy", "ha", "hb", "hc", "hf", "hh", "hi", "hj", "hm", "ho", "hs", "ht", "hu", "hn", "hw", "ia", "ii", "il", "it", "ja", "je", "jf", "ji", "jj", "jk", "jl", "jm", "jo", "la", "lb", "lc", "ld", "le", "lf", "lg", "lh", "li", "lj", "lk", "ll", "ln", "lo", "lq", "lr", "ls", "lt", "lu", "lv", "lw", "lx", "ly", "lz", "ma", "mb", "mc", "md", "me", "mf", "mg", "mh", "mi", "mj", "mk", "ml", "mm", "ec", "mn", "mq", "mr", "ms", "mt", "mu", "mv", "mw", "mx", "my", "mz", "na", "nb", "nc", "nd", "ne", "nf", "ng", "nh", "ni", "nk", "nl", "nm", "nn", "np", "nq", "nr", "ns", "nw", "od", "oi", "om", "ot", "ov", "ox", "ru", "xo", "xt", "xu", "xx", "yb", "yc", "yd", "yf", "yi", "yj", "yr", "yx", "yy", "zg", "zm", "zi", "zn", "zo", "zu", "zw", "zx", "zy", "rr", "rx", "qc", "oa", "nv",
            "Мальчик", "ab", "ac", "ad", "ae", "af", "ag", "ah", "ai", "ak", "al", "am", "an", "ao", "ap", "ar", "as", "at", "au", "av", "ax", "ay", "ba", "bc", "bd", "be", "bf", "bh", "bi", "bj", "bk", "bl", "bm", "bn", "bo", "bp", "bq", "br", "bs", "bt", "bu", "bv", "bw", "bx", "by", "bz", "ca", "cb", "cc", "cd", "ce", "cf", "cg", "ch", "ci", "cj", "ck", "cl", "cv", "dc", "dd", "de", "df", "dg", "dh", "di", "dj", "dm", "dn", "do", "dp", "dq", "dr", "ds", "dt", "du", "dw", "dx", "dy", "dz", "ek", "el", "ga", "gc", "gg", "gh", "gv", "gf", "gw", "gz", "hl", "ib", "im", "in", "ig", "io", "iq", "jg", "jn", "jp", "jq", "jr", "js", "ju", "jv", "jw", "jx", "ka", "kb", "kc", "kd", "kf", "kg", "kn", "kq", "kr", "kt", "zh", "zj", "zk", "zr", "zs", "zv",
            "Девочка и мальчик", "aw", "dv", "en", "iw", "ix", "iy", "ok", "iu", "em", "px", "ei", "ep", "eq", "er", "es", "et", "fz", "gs", "gt", "gu", "gx", "gy", "ip", "is", "ir", "jc", "jd", "kh", "ki", "kj", "kk", "kl", "ku", "mp", "nj", "rt", "rv", "gd", "if", "ij", "rj",
            "Разные", "aq", "bb", "bg", "dk", "dl",
            "ea", "eb", "ee", "eg", "ej", "eo", "eu", "ev", "ew", "ex",
            "fa", "fb", "fc", "fd", "fe", "fh", "fk", "fn", "fo", "fq", "fr", "fs", "fu", "fw", "fx",
            "gb", "ge", "gk",
            "hg", "hq", "hr", "hx", "hy", "hz",
            "ic", "id", "ie", "ih", "iz",
            "jb", "jt", "jy", "jz",
            "ke", "km", "ko", "kp", "ks",
            "mo",
            "no", "nt", "nu", "nx", "ny", "nz",
            "ob", "oc", "oe", "of", "og", "oh", "oj", "ol", "on", "oo", "op", "oq", "or", "os", "ou", "ow", "oy", "oz",
            "pa", "pb", "pc", "pd", "pe", "pf", "pg", "ph", "pi", "pj", "pk", "pl", "pm", "pn", "po", "pp", "pq", "pr", "ps", "pt", "pu", "pv", "pw", "py", "pz",
            "qa", "qb", "qd", "qf", "qg", "qh", "qi", "qj", "qk", "ql", "qm", "qn", "qo", "qp", "qq", "qr", "qs", "qt", "qu", "qv", "qw", "qx", "qz",
            "ra", "rb", "rc", "rd", "re", "rf", "rg", "rh", "ri", "rk", "rl", "rm", "rn", "ro", "rp", "rq", "rs", "rw", "ry",
            "xa", "xb", "xh", "xk", "xl", "xm", "xp", "xw", "xy",
            "ye", "yh", "yk", "yn", "yo", "yp", "ys", "yt", "yu", "yw", "yz",
            "za", "zb", "zc", "zf", "zl", "zp", "zq", "zz",
            "ik",
            "Пьющие", "az", "ed", "hd", "hv", "qy", "rz", "xf", "xg", "xj", "yg", "ym", "yl", "yq", "yv", "zd", "ze", "zt", "ya",
            "Мишки", "kv", "kw", "kx", "ky", "kz", "xi", "xn",
            "С табличками", "gi", "gj", "gn", "gm", "gl", "gp", "gq", "gr", "xc", "xd", "xz", "xv",
            "Флаги стран", "sv", "sy", "we", "vl", "sz", "ss", "sc", "sr", "xr", "wx", "sa", "sb", "sd", "se", "sf", "sg", "sh", "si", "sj", "sk", "sl", "sm", "sn", "so", "sp", "sq", "st", "su", "sw", "ta", "tb", "tc", "td", "te", "tf", "tg", "th", "ti", "tj", "tk", "tl", "tm", "tn", "to", "tp", "tq", "tr", "ts", "tt", "tu", "tv", "tw", "tx", "ty", "tz", "ua", "ub", "uc", "ud", "ue", "uf", "ug", "uh", "ui", "uj", "uk", "ul", "um", "un", "uo", "up", "uq", "ur", "us", "ut", "uu", "uv", "uw", "ux", "uy", "uz", "va", "vb", "vc", "vd", "ve", "vf", "vg", "vh", "vi", "vj", "vk", "vm", "vn", "vo", "vp", "vq", "vr", "vs", "vt", "vu", "vv", "vw", "vx", "vy", "vz", "wa", "wb", "wc", "wd", "wf", "wg", "wh", "wi", "wj", "wk", "wl", "wm", "wn", "wo", "wp", "wq", "wr", "ws", "wt", "wu", "wv", "ww", "wy", "wz", "sx", "xq", "xs"
        ];
        smilespack["4"] = [
            "aa", "ab", "ac", "ad", "ae", "af", "ag", "ah", "ai", "aj", "ak", "al", "am", "an", "ao", "ap", "aq", "ar", "as", "at", "au", "av", "aw", "ax", "ay", "az",
            "ba", "bb", "bc", "bd", "be", "bf", "bg", "bh", "bi", "bj", "bk", "bl", "bm", "bn", "bo", "bp", "bq", "br", "bs", "bt", "bu", "bv", "bw", "bx", "by", "bz",
            "ca", "cb", "cc", "cd", "ce", "cf", "cg", "ch", "ci", "cj", "ck", "cl", "cm", "cn", "co", "cp", "cq", "cr", "cs", "ct", "cu", "cv", "cw", "cx", "cy", "cz",
            "da", "db", "dc", "dd", "de", "df", "dg", "dh", "di", "dj", "dk", "dl", "dm", "dn", "do", "dp", "dq", "dr"
        ];
        smilespack["2"] = [
            "aa", "ab", "ac", "ad", "ae", "af", "ag", "ah", "ai", "aj", "ak", "al", "am", "an", "ao", "ap", "ar", "at", "au", "av", "aw", "ax", "ay", "az",
            "ba", "bb", "bc", "bd", "be", "bf", "bg", "bh", "bi", "bj",
            "ca", "cb", "cc", "cd", "ce", "cf", "cg", "ch", "ci", "cj", "ck", "cl", "cm", "cn", "co", "cp", "cq", "cr", "cs", "ct", "cu", "cv", "cw", "cx", "cy", "cz",
            "da", "db", "dc", "dd", "de", "df", "dg", "dh", "di", "dj", "dk", "dl", "dm", "dn", "do", "dp", "dq", "dr", "ds", "dt", "du", "dv", "dw", "dx"
        ];
        smilespack["3"] = [
            "aa", "ab", "ac", "ad", "ae", "zd", "ag", "ah", "ai", "aj", "ak", "al", "am", "an", "ao", "ap", "aq", "ar", "as", "at", "au", "av", "aw", "ax", "ay", "az",
            "ja", "jb", "jc", "jd", "je", "jf", "jg", "jh", "ji", "jj", "jk", "jl", "jm", "jn", "jo", "jp", "jq", "jr", "js", "jt", "ju", "jv", "jw", "jx", "jy", "jz",
            "ka", "kb", "kc", "kd", "ke", "kf", "kg", "kh", "ki", "kj", "kk", "kl", "km", "kn", "ko", "kp", "kq", "kr", "ks", "kt", "ku", "kv", "kw", "kx", "ky", "kz",
			"la", "lb", "lc", "ld", "le", "lf", "lg", "lh", "li", "lj", "lk", "ll", "lm", "ln", "lo", "lp", "lq", "lr", "ls", "lt", "lu", "lv", "lw", "lx", "ly", "lz",
            "ma", "mb", "mc", "md", "me", "mf", "mg", "mh", "mi", "mj", "mk", "ml", "mm", "mn", "mo", "mp", "mq", "mr", "ms", "mt", "mu", "mv", "mw", "mx", "my", "mz",
			"na", "nb", "nc", "nd", "ne", "nf", "ng", "nh", "ni", "nj", "nk", "nl", "nm", "nn", "no", "np", "nq", "nr", "ns", "nt", "nu", "nv", "nw", "nx", "ny", "nz",
			"oa", "ob", "oc", "od", "oe", "of", "og", "oh", "oi", "oj", "ok", "ol", "om", "on", "oo", "op", "oq", "or", "os", "ot", "ou", "ov", "ow", "ox", "oy", "oz",
			"pa", "pb", "pc", "pd", "pe", "pf", "pg", "ph", "pi", "pj", "pk", "pl", "pm", "pn", "po", "pp", "pq", "pr", "ps", "pt", "pu", "pv", "pw", "px", "py", "pz",
			"qa", "qb", "qc", "qd", "qe", "qf", "qg", "qh", "qi", "qj", "qk", "ql", "qm", "qn", "qo", "qp", "qq", "qr", "qs", "qt", "qu", "qv", "qw", "qx", "qy", "qz", 			
			"ra", "rb", "rc", "rd", "re", "rf", "rg", "rh", "ri", "rj", "rk", "rl", "rm", "rn", "ro", "rp", "rq", "rr", "rs", "rt", "ru", "rv", "rw", "rx", "ry", "rz", 
            "sa", "sb", "sc", "sd", "se", "sf", "sg", "sh", "si", "sj", "sk", "sl", "sm", "sn", "so", "sp", "sq", "sr", "ss", "st", "su", "sv", "sw", "sx", "sy", "sz",
            "ba", "bb", "bc", "bd", "be", "bf", "bg", "bh", "bi", "bj", "bk", "bl", "bm", "bn", "bo", "bp", "bq", "br", "bs", "bt", "bu", "bv", "bw", "bx", "by", "bz",
            "ca", "cb", "cc", "cd", "ce", "cf", "cg", "ch", "ci", "cj", "ck", "cl", "cm", "cn", "co", "cp", "cq", "cr", "cs", "ct", "cu", "cv", "cw", "cx", "cy", "cz",
            "da", "db", "dc", "dd", "de", "df", "dg", "dh", "di", "dj", "dk", "dl", "dm", "dn", "do", "dp", "dq", "dr", "ds", "dt", "du", "dv", "dw", "dx", "dy", "dz",
            "ea", "eb", "ec", "ed", "ee", "ef", "eg", "eh", "ei", "ej", "ek", "el", "em", "en", "eo", "ep", "eq", "er", "es", "et", "eu", "ev", "ew", "ex", "ey", "ez",
            "fa", "fb", "fc", "fd", "fe", "ff", "fg", "fh", "fi", "fj", "fk", "fl", "fm", "fn", "fo", "fp", "fq", "fr", "fs", "ft", "fu", "fv", "fw", "fx", "fy", "fz",
            "ga", "gb", "gc", "gd", "ge", "gf", "gg", "gh", "gi", "gj", "gk", "gl", "gm", "gn", "go", "gp", "gq", "gr", "gs", "gt", "gu", "gv", "gw", "gx", "gy", "gz",
            "ha", "hb", "hc", "hd", "he", "hf", "hg", "hh", "hi", "hj", "hk", "hl", "hm", "hn", "ho", "hp", "hq", "hr", "hs", "ht", "hu", "hv", "hw", "hx", "hy", "hz",
            "ia", "ib", "ic", "id", "ie", "if", "ig", "ih", "ii", "ij", "ik", "il", "im", "in", "io", "ip", "iq", "ir", "is", "it", "iu", "iv", "iw", "ix", "iy", "iz",
            "za", "zb", "zc", "zd", "ze", "zf", "zg", "zh", "zi", "zj", "zk", "zl", "zm", "zn", "zo", "zp", "zq", "zr", "zs", "zt", "zu", "zv", "zw", "zx", "zy", "zz",
        ];
        smilespack["5"] = [
            "aa", "ab", "ac", "ad", "ae", "af", "ag", "ah", "ai", "aj", "ak", "al", "am", "an", "ao", "ap", "aq", "ar", "as", "at", "au", "av", "aw", "ax", "ay", "az",
            "ba", "bb", "bc", "bd", "be", "bf", "bg", "bh", "bi", "bj", "bk", "bl", "bm", "bn", "bo", "bp", "bq", "br", "bs", "bt", "bu", "bv", "bw", "bx", "by", "bz",
            "ca", "cb", "cc", "cd", "ce", "cf", "cg", "ch", "ci", "cj", "ck", "cl", "cm", "cn", "co", "cp", "cq", "cr", "cs", "ct", "cu", "cv", "cw", "cx", "cy", "cz",
            "da", "db", "dc", "dd", "de", "df", "dg", "dh", "di", "dj", "dk", "dl", "dm", "dn", "do", "dp", "dq", "dr", "ds", "dt", "du", "dv", "dw", "dx", "dy", "dz",
            "ea", "eb", "ec", "ed", "ee", "ef", "eg", "eh", "ei", "ej", "ek", "el", "em", "en", "eo", "ep", "eq", "er", "es", "et", "eu", "ev", "ew", "ex", "ey", "ez",
            "fa", "fb", "fc", "fd", "fe", "ff", "fg", "fh", "fi", "fj", "fk", "fl", "fm", "fn", "fo", "fp", "fq", "fr", "fs", "ft", "fu", "fv", "fw", "fx", "fy", "fz",
            "ga", "gb", "gc", "gd", "ge", "gf", "gg", "gh", "gi", "gj", "gk", "gl", "gm", "gn", "go", "gp", "gq", "gr", "gs", "gt", "gu", "gv", "gw", "gx", "gy", "gz",
            "ha", "hb", "hc", "hd", "he", "hf", "hg", "hh", "hi", "hj", "hk", "hl", "hm", "hn", "ho", "hp", "hq", "hr", "hs", "ht", "hu", "hv", "hw", "hx", "hy", "hz",
            "ia", "ib", "ic", "id", "ie", "if", "ig", "ih", "ii", "ij", "ik", "il", "im", "in", "io", "ip", "iq", "ir", "is", "it", "iu", "iv", "iw", "ix", "iy", "iz",
            "ja", "jb", "jc", "jd", "je", "jf", "jg"
        ];
        smilespack["6"] = [
            "aa", "ab", "ac", "ad", "ae", "af", "ag", "ah", "ai", "aj", "ak", "al", "am", "an", "ao", "ap", "aq", "ar", "as", "at", "au", "av", "aw", "ax", "ay", "az",
            "ba", "bb", "bc", "bd", "be", "bf", "bg", "bh", "bi", "bj", "bk", "bl", "bm", "bn", "bo", "bp", "bq", "br", "bs", "bt", "bu", "bv", "bw", "bx", "by", "bz",
            "ca", "cb", "cc", "cd", "ce", "cf", "cg", "ch", "ci", "cj", "ck", "cl", "cm", "cn", "co", "cp", "cq", "cr", "cs", "ct", "cu", "cv", "cw", "cx", "cy", "cz",
            "da", "db", "dc", "dd", "de", "df", "dg", "dh", "di", "dj", "dk", "dl", "dm", "dn", "do", "dp", "dq", "dr", "ds", "dt", "du", "dv", "dw", "dx", "dy", "dz",
            "ia", "ib", "ic", "id", "ie", "if", "ig", "ih", "ii", "ij", "ik", "il", "im", "in", "io", "ip", "iq", "ir", "is", "it", "iu", "iv", "iw", "ix", "iy", "iz",
            "fa", "fb", "fc", "fd", "fe", "ff", "fg", "fh", "fi", "fj", "fk", "fl", "fm", "fn", "fo", "fp", "fq", "fr", "fs", "ft", "fu", "fv", "fw", "fx", "fy", "fz",
            "ga", "gb", "gc", "gd", "ge", "gf", "gg", "gh", "gi", "gj", "gk", "gl", "gm", "gn", "go", "gp", "gq", "gr", "gs", "gt", "gu", "gv", "gw", "gx", "gy", "gz",
            "ha", "hb", "hc", "hd", "he", "hf", "hg", "hh", "hi", "hj", "hk", "hl", "hm", "hn", "ho", "hp", "hq", "hr", "hs", "ht", "hu", "hv", "hw", "hx", "hy", "hz"
        ];
        smilespack["7"] = ["aa", "ab", "ae", "af", "ac", "ca", "cb", "cc", "ad", "сd"];

        smilespack["8"] = {
            "ДМБ": "",
            "jl": "Я тебе сейчас лицо обглодаю!",
            "ka": "Лучшее - детям...",
            "kb": "Армия не просто...",
            "kc": "Будешь ты, Федя...",
            "kd": "В человеке всё...",
            "ke": "Видишь суслика?",
            "kf": "Я здесь, я там...",
            "kg": "Есть разные люди...",
            "kh": "Есть такое слово...",
            "ki": "Жизнь без армии...",
            "kj": "Мама, я не хочу...",
            "kk": "Но потом...",
            "kl": "Надо ему указательный...",
            "km": "Иначе всё у нас пойдёт...",
            "kn": "...военный - это не профессия.",
            "ko": "А к тёте Вере ходи...",
            "kp": "Повторим? Гавно вопрос!",
            "kq": "Дело в самом пришивании...",
            "kr": "Тётя, а «Наука и Жизнь»...",
            "ks": "Товарищ дембель, а когда...",
            "kt": "Надо понимать всю глубину...",
            "ku": "Тому, кто это придумал...",
            "kv": "Ты маму любишь?",
            "kw": "Ты, дух, правильный...",
            "kx": "Что будем кушать...",
            "ky": "Что, солдат, ссымся?!",
            "kz": "Это вам не это!",
            "Иван Васильевич меняет профессию": "",
            "ba": "Вот что крест животворящий делает",
            "bb": "Житие мое",
            "bc": "Демоны! Демоны!",
            "bd": "Ключница водку делала",
            "be": "Замуровали! Замуровали демоны!",
            "bf": "Ляпота",
            "bh": "Оставь меня старушка я в печали.",
            "bi": "Танцуют все!",
            "bj": "Царем будешь! Ни-за-что!!!",
            "bk": "Ты на что царская морда намекаешь.",
            "bl": "Ты по што боярыню обидел смерд ?",
            "bm": "Тьфу на вас! Тьфу на вас еще раз!",
            "bn": "Человек...Человек...Оффициант..Почки один раз царице...",
            "bo": "Я требую продолжения банкета!",
            "Волки": "",
            "bp": "Вой волка 1",
            "bq": "Вой волка 2",
            "br": "Вой волка 3",
            "bs": "Вой волка 4",
            "bt": "Вой волка 5",
            "bu": "Вой волка 6",
            "bv": "Вой волка 7",
            "bw": "Вой волка 8",
            "Будильники": "",
            "ca": "Жириновский: Хватит спать пора вставать ты нужен стране! Подъем!",
            "cb": "Рота подъем! Форма одежды номер 2 и бегом на работу!",
            "cc": "Кукареку... хватит спаить у меня тут на глазах...",
            "ch": "Хватит дрыхнуть скотина...",
            "ci": "Вставай засранец, хватит спать...",
            "cj": "Вставай.. Поднимайся.. Да не ты...",
            "ck": "Вставай на работу сволочь...",
            "cl": "Красавица просыпайся на улице лето...",
            "cm": "Вставай и вали... я твой сотик...",
            "Ульянов": "",
            "cd": "А вы батюшка на 600 мерседесе не в тот...",
            "Поцелуи": "",
            "ce": "Поцелуй",
            "cf": "Поцелуй мужчины",
            "cg": "Поцелуй",
            "Операция Ы": "",
            "da": "А где бабуля?",
            "db": "А компот?",
            "dc": "А... Влип очкарик?",
            "dd": "Ах ты зрячий!?",
            "de": "Бить будете?",
            "df": "...в то время, как наши...",
            "dg": "Всё уже украдено до нас",
            "dh": "Вы не скажете, где здесь...",
            "di": "Где этот чёртов инвалид?!",
            "dj": "Если я встану, ты у меня...",
            "dk": "Как пройти в библиотеку?",
            "dl": "Кто не работает, тот ест!",
            "dm": "Надо, Федя… Надо!",
            "dn": "Парижской!.. Бога матери…",
            "do": "Кто хочет сегодня поработать?",
            "dp": "Огласите весь список...",
            "dq": "А я готовлюсь стать отцом!..",
            "dr": "Операция Ы!",
            "ds": "...сейчас к людям надо помягше",
            "dt": "...у вас несчастные случаи...",
            "du": "Разбить. Пол-литра?",
            "dv": "Руки... мыли?!",
            "dw": "...в твоём доме будет играть..",
            "dx": "Стой!!! Убью, студент!",
            "dy": "Тренируйся лучше… на кошках!",
            "dz": "Это же не наш метод!",
            "ea": "Это не серьезно!",
            "Собачье сердце": "",
            "eb": "Бить будете папаша..",
            "ec": "Вчера котов душили-душили...",
            "ed": "Я ещё водочки выпью?",
            "ee": "Не читайте до обеда...",
            "ef": "Господа все в Париже",
            "eg": "Где же я буду харчеваться?",
            "eh": "Мы к вам, профессор...",
            "ei": "Да не согласен я.",
            "ej": "Неприличными словами...",
            "ek": "В очередь, сукины дети!",
            "el": "Земля налетит на небесную ось.",
            "em": "Отлезь, гнида...",
            "en": "Дай папиросочку...",
            "eo": "Пивная! Ещё парочку!..",
            "ep": "Взять всё, да и поделить!",
            "eq": "Вы его напрасно прелестным...",
            "er": "Я тяжко раненый при операции",
            "es": "Следовательно, разруха...",
            "et": "Чисто как в трамвае",
            "eu": "Я тебе покажу твою мать!",
            "ev": "Что-то Вы меня больно...",
            "ew": "Я... водочки выпью?..",
            "ex": "Желаю, чтобы все!..",
            "ey": "Абрвал...",
            "Особенности национальной охоты": "",
            "ez": "Пьёте, да? И пьёте...",
            "ga": "Рашн элефант из...",
            "gb": "Семёнов - водку пить будешь?",
            "gc": "Та-ак!.. Кто это сделал?!",
            "gd": "Теперь ты можешь впадать...",
            "ge": "Тост на охоте должен быть...",
            "gf": "Цыц! Вы ещё подеритесь...",
            "gg": "Что это было?",
            "fa": "А ну колись где Серега...?",
            "fb": "Водку берет",
            "fc": "Вот что мне нравится в тебе...",
            "fd": "Вы арестованы!",
            "fe": "Где эта сволочь?",
            "ff": "Да... Жить захочешь...",
            "fg": "Ё-моё! А я за что...",
            "fh": "Завтра ж на охоту...",
            "fi": "... и тогда или вот это...",
            "fj": "Какая сволочь стреляла?!",
            "fk": "Ну, все что знал, рассказал",
            "fl": "Ну - за братство!",
            "fm": "Ну - за встречу!",
            "fn": "Ну - за дружбу!",
            "fo": "Ну - за искусство...",
            "fp": "Ну - за красоту!",
            "fq": "Ну - за рыбалку!",
            "fr": "Ну - за справедливость!",
            "fs": "Ну - теперь вся утка наша...",
            "ft": "Ну Вы блин даете...",
            "fu": "Ну и сколько можно ждать..",
            "fv": "Он его выжрал, гад!",
            "fw": "Оставь его - пусть отдыхает!..",
            "fx": "Пгостите - мне пгаво не удобно беспокоить Вас...",
            "fy": "Повторяю: если машины нет...",
            "fz": "Погоди, погоди... Потеряна...",
            "Бриллиантовая рука": "",
            "gh": "А у нас управдом друг человека!",
            "gi": "Куй железо не отходя от кассы",
            "gj": "Легким движением руки...",
            "gk": "Семен Семенович...",
            "gl": "Усигда готов!",
            "gm": "Чёрт побери... Чёрт побери...",
            "gn": "Шоб ты издох! Шоб я видел тебя...",
            "Кавказская пленница": "",
            "gq": "У меня будет к вам небольшое..",
            "gs": "Это... как его... волюнтаризм!",
            "gt": "Это студентка, комсомолка...",
            "gu": "Эээ-нее... Торопиться не надо.",
            "gr": "Чей туфля?... А! Моё!",
            "ha": "...а тост без вина...",
            "hb": "Аполитично рассуждаешь...",
            "hc": "Бамбарбия! Кергуду!",
            "hd": "Будь проклят тот день...",
            "he": "Ви не оправдали...",
            "hf": "Вы же просили в 3х экземплярах?",
            "hg": "Да здравствует наш суд...",
            "hh": "Да отсохнет его карбюратор...",
            "hi": "...плохо мы ещё воспитываем...",
            "hj": "Жить, как говорится, хорошо!",
            "hk": "Это бесплатная путевка.. в Сибирь..",
            "hl": "...и вот когда вся стая...",
            "hm": "Простите... часовню... тоже я",
            "hn": "Имею желание купить дом...",
            "ho": "...иначе - memento more!",
            "hp": "Короче..Склифасофский...",
            "hq": "Мой машина зверь..Слушай..",
            "hr": "Будьте добры, помедленнее!..",
            "hs": "Мне теперь из этого дома...",
            "ht": "Алкоголики - это наш профиль",
            "hu": "А я пью? Что тут пить?!",
            "hv": "Нэ беспокойся. В морге тебя...",
            "hw": "Будем ждать... Сдавай.",
            "hx": "Прекратим эту бесполезную...",
            "hy": "Птичку... жалко...",
            "hz": "Так выпьем же за кибернетикэ!",
            "Крылья, ноги и хвосты": "",
            "gv": "Ноги, крылья... Главное - хвост!!!",
            "gw": "Эй, ты, птичка, летим со мной...",
            "gx": "Крылья, крылья... Ноги!",
            "gy": "Эй, я же сказал полетели...",
            "gz": "Лучше день потерять...",
            "Джентльмены удачи": "",
            "ia": "А в тюрьме щас ужин...",
            "ib": "А ну, канай отсюда!",
            "ic": "Как что, так сразу Косой...",
            "id": "Ты - вор! Джентельмен удачи...",
            "ie": "Вот у меня один знакомый...",
            "if": "Всё. Кина не будет...",
            "ig": "Прямо насмерть?..",
            "ih": "Девушка, а девушка...",
            "ii": "Деточка! А вам не кажется...",
            "ij": "Такой хороший женщин...",
            "ik": "Женский туфли хочу...",
            "il": "Нет, это не мы!",
            "im": "Йес, йес, ОБХСС!",
            "in": "Какая отвратительная рожа!",
            "io": "Канай отсюда! Рога поотшибаю..",
            "ip": "Иди, иди, Вась...",
            "iq": "Садитесь жрать, пожалуйста!",
            "ir": "Лошадью ходи.",
            "is": "Моргалы выколю!",
            "it": "Нехороший ты человек, Косой.",
            "iu": "Ну вы будете жрать или нет?!",
            "iv": "Кто ж его посадит?! Он же...",
            "iw": "Явился. Нехороший человек...",
            "ix": "Давай червонец, пожалуйста...",
            "iy": "Сдаёмсу!..",
            "iz": "Слушай, Доцент. Ты был...",
            "ja": "Слушай, Доцент... Я говорил...",
            "jb": "Слушайте... Заткнитесь...",
            "jc": "Тут помню, тут... ничего...",
            "jd": "У тебя какой срок был?",
            "je": "Филонишь, гад!",
            "jf": "Чем больше сдадим - тем...",
            "jg": "Что это у тебя? Надо!",
            "jh": "Шакал я паршивый...",
            "ji": "Эй, гражданина!",
            "jj": "Это тебе не мелочь...",
            "jk": "Этот Василий Алибабаевич...",
            "Покровские ворота": "",
            "la": "Аркадий, алес гемахт!",
            "lb": "Полный алес капут!..",
            "lc": "Данке шон, Маргарита Павловна!",
            "ld": "От тебя один дискомфорт!",
            "le": "Я как утром встал, сразу за дрель!..",
            "lf": "Ну кой чёрт занёс Вас на эти галеры?!",
            "lg": "Да - искусство в большом долгу...",
            "lh": "Это мой крест!!! И нести его мне!..",
            "li": "Кулинар!",
            "lj": "Тогда - в кусты!",
            "lk": "Хоботов, это мелко!..",
            "ll": "Я служу Мосэстраде!",
            "lm": "Натюрлих, Маргарита Павловна!",
            "ln": "Хоботов, я всё оценила!",
            "lo": "...Ваша сложность идет Вам как Соеву пенсне...",
            "lp": "Заметьте, не я это предложил...",
            "lq": "Я вся такая несуразная...",
            "lr": "Я вся такая внезапная, такая..",
            "ls": "Резать к чёртовой матери...",
            "lt": "В прах разметал домашний очаг!..",
            "lu": "Одно дело шпицштихель...",
            "lv": "Но как вы спелись!..",
            "lw": "Кого Вы разбили под Аустерлицем?!",
            "lx": "...однажды Ваш Костик Вас удивит!",
            "ly": "Хоботов, это упадничество!",
            "lz": "Догнать Савранского - это утопия!",
            "ma": "Это кричит твой вакуум!..",
            "mb": "Вы её!.. Вожделели!!!",
            "mc": "Высокие... выс-сокие отношения!..",
            "md": "У больных большая взаимовыручка...",
            "me": "Яволь, Маргарита Павловна!",
            "mf": "Зер гут, Маргарита Павловна!",
            "Кин-Дза-Дза": "",
            "mg": "Когда у общества нет...",
            "mh": "Ну и зараза же ты, родной...",
            "mi": "Дикари!",
            "mj": "Подсаки.. Почему не в намордниках?",
            "mk": "Скрипач не нужен...",
            "ml": "У тебя в голове мозги или тю...",
            "mm": "Уэф, ты когда-нибудь...",
            "mn": "Что они хотят?",
            "mo": "Астронавты...",
            "mp": "Вот потому...",
            "mq": "Как же это вы без гравицаппы..",
            "mr": "КУ",
            "ms": "Люсенька...",
            "mt": "Небо не видело...",
            "Винни-пух": "",
            "na": "А не пойти ли нам в гости...",
            "nb": "А не пора ли нам подкрепиться?",
            "nc": "А что подумал кролик...",
            "nd": "Входит! И выходит...",
            "ne": "а если ты не выстрелишь, тогда испорчусь я...",
            "nf": "Если я чешу в затылке...",
            "ng": "И где интересно знать... Мой воздушный шарик",
            "nh": "Кажется дождь собирается..",
            "ni": "Кто ходит в гости по утрам...",
            "nj": "Куда идем мы с пятачком...",
            "nk": "Мед это уж очень хитрый предмет...",
            "nl": "Поздравляю с днем рождения..",
            "nm": "Сова.. Открывай! Медведь пришел!",
            "nn": "а кролик это подходящая компания!",
            "no": "Хорошо живет на свете Вини пух...",
            "np": "Я тучка.. Тучка..Тучка..",
            "nq": "потому что кто то слишком много ест!",
            "nr": "... не правильные пчёлы...",
            "sy": "Ой.. Что это случилось с твоим ***?...",
            "Малыш и Карлсон": "",
            "oa": "А мы тут, знаете...",
            "ob": "А я сошла с ума...",
            "oc": "Ведь я - умный, красивый...",
            "od": "Ку-ку мой мальчик!",
            "oe": "Надеюсь, Фрекен Бок...",
            "of": "Не надо... Я вас боюсь.",
            "og": "Ну я так не играю...",
            "oh": "Ну, мама-мама...",
            "oi": "Опять розыгрыш. Шалунишка!..",
            "oj": "Отдай клюшку!",
            "ok": "По телевизору показывают...",
            "ol": "Простите, у вас можно...",
            "om": "Скажи мне, милый ребёнок...",
            "on": "Спокойствие! Только...",
            "oo": "Что ты орешь?",
            "op": "Я мужчина хоть куда!",
            "Следствие ведут колобки": "",
            "oq": "и дайте мне большой справка...",
            "or": "Ничё не понимаю!",
            "os": "Ой, шеф! А я вас вижу!",
            "ot": "Или что-то случилось...",
            "ou": "Ой, шеф! А я вас не вижу!",
            "ov": "Ой, шеф! А я вас слышу!",
            "ow": "при звуках флейты... теряет...",
            "ox": "Покупайте наших слонов!",
            "oy": "Слон полосатый, большой...",
            "Падал прошлогодний снег": "",
            "oz": "Уж послала, так послала...",
            "pa": "Вот это мой размерчик",
            "pb": "...на что мне эта худая жена?!",
            "pc": "Знатный зверюга!",
            "pd": "Кто тут, к примеру, в цари ...",
            "pe": "Маловата, понимаешь...",
            "pf": "Маловато будет!!!",
            "pg": "Мы, бояре, народ работящий!",
            "ph": "Ничего не понимаю!..",
            "pi": "..как я очень это богатство...",
            "pj": "Ой, какой хороший половичок!",
            "pk": "Ох уж эти сказочки!",
            "pl": "Я волшебное слово знаю...",
            "Человек с б-ра Капуцинов": "",
            "qa": "Вилли... Заряжай!",
            "qb": "Вы что-то сказали?",
            "qc": "Готовитесь к лучшей жизни?",
            "qd": "Джек! Что ты можешь сделать...",
            "qe": "Джентльмены, скажите, а...",
            "qf": "Запомните, джентльмены...",
            "qg": "Искусство не горит.",
            "qh": "Никогда не пей эту гадость...",
            "qi": "О, Джонни, я хочу, как в...",
            "qj": "О! Какая ножк...",
            "qk": "Он не любил синематограф",
            "ql": "Пошел вон! Отец мой!",
            "qm": "Раба любви!",
            "qn": "Сдаётся мне, джентльмены...",
            "qo": "Сидите, сидите...",
            "qp": "Сэр! Это был мой бифштекс!",
            "qq": "Хо-тим филь-му!",
            "qr": "Чёрт побери... Живут же...",
            "Трое из Простоквашино": "",
            "ra": "А мы уже помиррились...",
            "rb": "А о нас кто подумает?",
            "rc": "А я говорю пей...",
            "rd": "Балбес он.. Балбес..",
            "re": "Вот он! Вот он!..",
            "rf": "Гаврюша! Комне!",
            "rg": "Извините!.. Я почему...",
            "rh": "Кот Матроскин меня зовут.",
            "ri": "Кто там?",
            "rj": "Мясо лучше в магазине...",
            "rk": "На дворе конец...",
            "rl": "Неправильно ты, дядя...",
            "rm": "Ну вот что ездовые собаки...",
            "rn": "Ну и что это?",
            "ro": "Подумаешь...",
            "rp": "Поздравляю тебя, Шарик...",
            "rq": "Попрошу внимания!",
            "rr": "Потому что совместный труд...",
            "rs": "Средства у нас есть.",
            "rt": "Усы, лапы и хвост!",
            "Формула любви": "",
            "sa": "Амор... и глазами так…",
            "sb": "За скоко сделаешь?",
            "sc": "Экий ты меркантильный",
            "sd": "Жуткий город",
            "se": "Хочешь большой, но чистой",
            "sf": "Видел я их Италию на карте",
            "sg": "Теряю былую легкость...",
            "sh": "А Вы оказывается бесчестный человек...",
            "si": "А она не одна придет",
            "sj": "Не пущу!!!",
            "sk": "Откушать изволите?",
            "sl": "Коли доктор сыт",
            "sm": "Да не простыл наш батюшка",
            "sn": "И сия пучина поглотила ия",
            "so": "Ежели один человек построил",
            "sp": "...и отправят в Сибирь убирать",
            "sq": "Сильвупле, дорогие гости",
            "sr": "Селянка, у тебя бабушка есть?",
            "ss": "Солонку спёр...",
            "st": "Так, свободна, ступай",
            "su": "...вчера попросил у ключницы",
            "sv": "А зачем нам кузнец?",
            "sw": "Да, это от души. Замечательно",
            "Брат": "",
            "sx": "Твои приходили...",
            "ta": "Брат! Ты брат мой!",
            "tb": "Чё делать будем?",
            "tc": "Денег дай мне, ладно...",
            "td": "Ну здравствуй, брат!..",
            "te": "Город - страшная сила...",
            "tf": "Вот ты говорил: город - сила",
            "tg": "Любишь медок - люби и холодок!",
            "th": "Что русскому хорошо...",
            "ti": "...мы... зачем живём?",
            "tj": "Брат!.. Не выручишь - мне...",
            "tk": "Эх, встретил бы я тебя в 43-м",
            "tl": "Оружие на пол, руки за голову",
            "tm": "Муж в Тверь - жена в дверь?..",
            "tn": "Музыка твоя вся американская..",
            "to": "Не брат ты мне...",
            "tp": "Не брат ты мне, гнида...",
            "tq": "А в чём разница?!",
            "tr": "А я вообще-то режиссёров...",
            "ts": "...я, наверно, не туда попал!",
            "tt": "А где служил-то?..",
            "tu": "В штабе, там, отсиделся...",
            "tv": "Поживёшь подольше...",
            "tw": "Поможешь мне! Ладно?",
            "tx": "П*доры они все!..",
            "ty": "Не тот счастлив...",
            "tz": "Ты где служил? В штабе...",
            "Белое солнце пустыни": "",
            "ua": "Абдулла! Таможня даёт добро!",
            "ub": "Аристарх! Договорись с...",
            "uc": "Восток - дело тонкое...",
            "ud": "Вот что ребята... Пулемёта ...",
            "ue": "Всё поёшь?!",
            "uf": "Давно здесь сидим...",
            "ug": "Господин назначил меня...",
            "uh": "Гюльчатай, открой личико...",
            "ui": "Я рассчитывал на тебя...",
            "uj": "Джавдет мой...",
            "uk": "...и встать!..",
            "ul": "Хорошая жена, хороший дом...",
            "um": "Махмуд... Зажигай!",
            "un": "Не говори никому...",
            "uo": "Опять ты мне эту икру...",
            "up": "авлины, говоришь?..",
            "uq": "Сухов, говоришь...",
            "ur": "Тебя как, сразу прикончить...",
            "us": "Я мзду не беру.",
            "ut": "Ты как здесь оказался?",
            "uu": "Я вот тоже - щас это допью...",
            "Возвращение блудного попугая": "",
            "va": "А мне надоело всё...",
            "vb": "Шурик, будьте осторожны...",
            "vc": "А Я что? Я ничего!",
            "vd": "Ах так!",
            "ve": "Ах, это прелестно, прелестно!",
            "vf": "Внимание, всем постам ГАИ!",
            "vg": "...на самом интересном месте!",
            "vh": "Не были мы ни в какой Гаити!..",
            "vi": "Хорошо живу, купаюсь в...",
            "vj": "- Василий! - Иннокентий...",
            "vk": "Нет - всё! Конец!",
            "vl": "Прилетаю я как-то на Таити...",
            "vm": "Прощай! Наша встреча...",
            "vn": "Свободу попугаям!",
            "vo": "Скажите, сколько тон клевера..",
            "vp": "Товарищ майор, докладывает...",
            "vq": "Эх вы! Жизни не нюхали?!",
            "vr": "Это же бубль-гум!",
            "vs": "Обо мне заговорят!..",
            "Двенадцать стульев": "",
            "wa": "Ваше политическое кредо? - Всегда!",
            "wb": "Вы знаете, кто этот мощный...",
            "wc": "Заграница нам поможет!",
            "wd": "Заседание продолжается...",
            "we": "Киса! Я давно хотел...",
            "wf": "Мальчик, разве плохо? Кто скажет что это девочка...",
            "wg": "Лёд тронулся...",
            "wh": "Месье! Же нэ манж па...",
            "wi": "Может тебе дать ключ от квартиры где деньги лежат?",
            "wj": "Ну что, отец...",
            "wk": "Торг здесь не уместен...",
            "wl": "Остапа понесло...",
            "wm": "Я дам Вам парабелум...",
            "wn": "Позвольте, товарищи...",
            "wo": "По чём опиум для народа...",
            "wp": "Помните... у нас длинные руки...",
            "wq": "Россия Вас не забудет!",
            "wr": "Скоро только кошки родятся...",
            "ws": "Утром деньги... Вечером стулья...",
            "Маугли": "",
            "xa": "Старый волк промахнулся!",
            "xb": "Акелла промахнулся...",
            "xc": "Бандерлоги... Хорошо ли вам...",
            "xd": "Мы принимаем бой!",
            "xe": "Мы принимаем бой! кричали они",
            "xf": "Встань, когда с тобой говорит",
            "xg": "Так они называли меня...",
            "xh": "Доброй охоты!",
            "xi": "Это говорю я, Шер-Хан!",
            "xj": "Это моя добыча!..",
            "xk": "Моя добыча будет твоей добычей",
            "xl": "Ты нарушил закон джунглей?!.",
            "xm": "Мы с тобой одной крови",
            "xn": "Позор джунглям!",
            "xo": "Каждый сам за себя!",
            "xp": "А мы уйдем на север!..",
            "xq": "Если понадобится, Маугли...",
            "xr": "Посмотрим, что скажет стая...",
            "xs": "Да, но что скажет стая?..",
            "xt": "Я волк свободного племени!..",
            "Мимино": "",
            "ya": "...мой знакомый друг...",
            "yb": "Я все могу рассказать.",
            "yc": "Ларису Ивановну хачу.",
            "yd": "Рубик-джан! Ты только...",
            "ye": "Такую личную неприязнь...",
            "yf": "Спасибо, я пешком постою...",
            "yg": "...что тебе тоже будет приятно",
            "yh": "Пойдём ресторан, туда-сюда...",
            "yi": "Не две пары в сапоги...",
            "yj": "Скажи, что машина украли!!!",
            "yk": "Я вам один умный вещь...",
            "yl": "Я так думаю...",
            "ym": "Пошёл в ресторан туда-сюда...",
            "yn": "Эти «Жигули»... чем думают...",
            "Приключения Мюнхаузена": "",
            "za": "Клянусь своей треуголкой",
            "zb": "Будет, будет... Шашлык...",
            "zc": "Не будет ли любезен...",
            "zd": "Спой, птичка...",
            "ze": "Какой такой павлин-мавлин?",
            "Разные": "",
            "zf": "А где эта сволочь?",
            "zg": "Автор.. пиши.. ЕсЧо",
            "zh": "Алло... Это ты дорогой (мужской голос)",
            "zi": "Апчхи...",
            "zj": "Ахтунг... Русишь партизанен.. сдавайся...",
            "zk": "Интим и гербалайф не предлагать",
            "zl": "Мур..Мур..Гламур...",
            "zm": "Мужик... Ты кто?",
            "zn": "О как все это не прилично...",
            "zo": "Какая прикольная тёлочка..."
        };
        smilespack.forEach(function (a, b) {
            var s = '';
            if (b == "8") {
                for (var u in a) {
                    if (u.length > 2) {
                        s += '<hr><center>' + u + '</center>';
                    } else {
                        s += '<img title="' + a[u] + '" src="' + Terminator.home + 'smiles/s8/aa.png" class="tr-smile" data-face="' + b + u + '">';
                    }
                }
            } else {
                var ext = 'gif';
                a.forEach(function (a) {
                    var ti = 'data:image/gif;base64,R0lGODlhIAAgAPUAAP///8+M6s+N6s+O6tCO6tCP6tCQ6tCQ69GR69GS69GT69KU69OW7NOX7NOY7NSY7NSZ7NSa7NWb7NWb7dWc7dac7dad7dae7def7deg7deg7teh7tii7tij7tmm79qn79uq7wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkDAAAAIf8LTkVUU0NBUEUyLjADAQAAACH/C3htcCBkYXRheG1w/z94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzA2NyA3OS4xNTc3NDcsIDIwMTUvMDMvMzAtMjM6NDA6NDIgICAgICAgICI+PHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3Lncub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJmOmFib3V0PSIiIP94bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bW5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChNYWNpbnRvcykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTZBRDI3MDg4NDNGMTFFNTlEMThEMEJDQ0ZCRDf/QjZFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjYwNjBGMEZDODQ0MDExRTlEMThEMEJDQ0ZCRDdCNkUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJPSJ4bXAuaWlkOjk2QUQyNzA2ODQzRjExRTU5RDE4RDBCQ0NGQkQ3QjZF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';
                    if (b == "6") {
                        ext = 'png';
                    }
                    if (a.length > 2) {
                        s += '<hr><center>' + a + '</center>';
                    } else {
                        s += '<img src="' + ti + '" class="tr-smile lazyload" data-face="' + b + a + '" data-src="' + Terminator.home + 'smiles/' + 's' + b + '/' + a + '.' + ext + '">';
                    }
                });
            }
            $(".tr-sm" + b + "-block").append(s);
        });


        function createInput(cmd, id, title) {
            var f1 = (localStorage.getItem('tr-' + cmd) == "1") ? "1" : "0";
            var s = '<div class="tr-pt10">';
            s += '<input value="' + f1 + '" data-cmd="' + cmd + '" type="checkbox" class="ios8-switch tr-config" id="tr-' + id + '"' + (f1 == "1" ? " checked" : "") + '>';
            s += '<label for="tr-' + id + '">' + title + '</label>';
            s += '</div>';
            return s;
        }
        s = createInput('snow', 'ch1', 'Падающие эффекты');
        s += createInput('sound', 'ch2', 'Звуковые эффекты');
        s += createInput('anticaps', 'ch3', 'Антикапс');
        s += createInput('antimat', 'ch4', 'Антимат');
        s += createInput('template', 'ch5', 'Стиль страницы');
        s += '<div class="tr-pt10"><select id="tr-t-select" data-cmd="template-name" class="form-control tr-select"><option value="aa">Стиль 1</option><option value="ab">Стиль 2</option><option value="ac">Стиль 3</option></select></div>';
        s += createInput('antigoto', 'ch6', 'Без редиректов');
        s += createInput('tempchat', 'ch7', 'Резервный чат');
        s += createInput('antimainchat', 'ch8', 'Отключить чат на главной');
        s += '<div class="tr-pt10 tr-pr">Ver:' + this.version + '</div>';
        $(".tr-sm9-block").append(s);
        $("#tr-t-select").val((localStorage.getItem('tr-template-name') == undefined) ? "aa" : localStorage.getItem('tr-template-name'));

        window.addEventListener("beforeunload", function (event) {
            if (((localStorage.getItem('tr-antigoto') == "1") ? "1" : "0") == "1") {
                event.preventDefault();
                event.returnValue = '';
            }
        });

        $(document).on("click", ".tr-config", function (e) {
            var s = ($(this).val() == "1") ? "0" : "1";
            localStorage.setItem('tr-' + $(this).data("cmd"), s);
            $(this).val((localStorage.getItem('tr-' + $(this).data("cmd")) == "1") ? "1" : "0");
            return true;
        });

        $('.tr-select').change(function () {
            localStorage.setItem('tr-' + $(this).data("cmd"), $(this).val());
            Terminator.loader("css-template", Terminator.home + 'templates/livacha/' + ((localStorage.getItem('tr-template-name') == undefined) ? 'aa' : localStorage.getItem('tr-template-name')) + '.css?r=' + Math.random());

        });

        $(document).on("click", ".tr-smilex", function (e) {
            e.preventDefault();
            var sm = $(this).data("face");
            sm = sm.split("-").join("");
            $(".chat-layout-container .textarea-wrapper textarea").val($(".chat-layout-container .textarea-wrapper textarea").val() + ' *' + sm + '* ');
            if (sm[0] == "8") {
                Terminator.playSound(Terminator.home + 'sound/' + sm[1] + sm[2] + ".mp3");
            }
        });

        $(document).on("click", ".tr-smile", function (e) {
            e.preventDefault();
            var sm = $(this).data("face");
            var index = lovesmiles.indexOf(sm);
            if (index > -1) {
                lovesmiles.splice(index, 1);
            } else {
                var ext = 'gif';
                if (sm[0] == "6") {
                    ext = 'png';
                }
                if (sm[0] != "8") {
                    $(".tr-tab-content.tr-sm0-block")
                        .prepend('<img src="' + Terminator.home + 'smiles/' + 's' + sm[0] + '/' + sm[1] + sm[2] + '.' + ext + '" class="tr-smile" data-face="' + sm + '">');
                    lovesmiles.push(sm);
                }
            }


            if (lovesmiles.length > 50) {
                lovesmiles.shift();
                $('.tr-tab-content.tr-sm0-block img').last().remove();
            };
            localStorage.setItem('tr-love-smiles', JSON.stringify(lovesmiles));
            $(".chat-layout-container .textarea-wrapper textarea").val($(".chat-layout-container .textarea-wrapper textarea").val() + ' *' + sm + '* ');
        });


        $(document).on("click", "button", function (e) {
            /*   console.log($(e).parent().parent());

               var t = $(this).parents().parents().parents().parents().parents().parents().attr('class');
               t = t.split(" ");
               if (t.indexOf("page_chat") != -1) {

                   t = $(this).parents().parents().parents().parents().html();
                   console.log(t);

               }
               */
        });

        var lovesmiles = [];
        var t = localStorage.getItem("tr-love-smiles");
        if (undefined != t) {
            lovesmiles = JSON.parse(t);
        }
        var s = '';
        if (lovesmiles) {
            lovesmiles.reverse().forEach(function (a) {
                var ext = 'gif';
                if (a[0] == "6") {
                    ext = 'png';
                }
                s += '<img src="' + Terminator.home + 'ico/ld.gif" class="tr-smile lazyload" data-face="' + a + '" data-src="' + Terminator.home + 'smiles/' + 's' + a[0] + '/' + a[1] + a[2] + '.' + ext + '">';
            });
        }
        $(".tr-sm0-block").append(s);
        $("#tr-smbtn").on("click", function (e) {
            $(".tr-window").css("visibility", "visible");
            var x = (localStorage.getItem("tr-win-x") != undefined) ? localStorage.getItem("tr-win-x") : 300;
            var y = (localStorage.getItem("tr-win-y") != undefined) ? localStorage.getItem("tr-win-y") : 300;
            $(".tr-window").offset({
                top: y,
                left: x
            });
        });
        lazyload();
    }

    Terminator.prototype.chat = function () {
        function repl(str, f, r) {
            var regex = new RegExp(f, "g");
            var l = str.replace(regex, r);
            return l.split("*").join("");
        }

        function antiCapsMat(m) {
            if (m == undefined) {
                return undefined;
            }
            m = $("<tag>" + m + "<tag>");
            var dict = {
                'уебище': 'твой моральный облик заставляет задуматься',
                'хуесос': 'твое поведение меня пугает',
                'похуй': 'разница не принципиальная',
                'пидарас': 'в данном случае не прав',
                'охуеть': 'я поражен!',
                'хуйня': 'тут какая то ошибка',
                'пошел нахуй': 'не отвлекай меня пожалуйста, я занят!',
                'иди нахуй': 'советую съездить отдохнуть на курорт',
                'пиздец': 'что то пошло не так..',
                'дура': 'мне сложно уловить ход твоих мыслей',
                'сука': 'девушка',
                'сучка': 'девушка',
                'пидор': 'в корне не прав',
                'гавно': 'не стоишь моего внимания',
                'блядь': 'меня переполняют разного рода эмоции!',
                'пох': 'суть не важна',
                'похуй': 'ничего страшного',
                'пизда': 'звезда',
                'хуй': 'краник',
                'хуевый' : 'солидный',
                'хуя' : 'желания',
                'минет' : 'больно',
                'в рот' : 'на свою голову',
                'врот' : 'на свою голову',
                'засажу' : 'помучаюсь',
                'член' : 'стручок',
                'нахуя' : 'непонятно с какой целью',
                'порву' : 'поглажу',
                'пизди' : 'красиво излагаешь',
                'шлюх'  : 'красотк',
                'пизду' : 'звезду',
                'нихуя' : 'совсем маловато',
                'еби' : 'не обижай меня',
                'ебать' : 'ломать меня снова',
                'ебал'  : 'умалял простить',
                'ебаный' :  'уважаемый',
                'ёбаный' : 'уважаемый',
                'кончу' : 'расплачусь',
                'кончил' : 'отмучался',
                'дроч' : 'медитировать',
                'гомик' : 'мой кумир',
                'пидар' : 'в данном случае ошибаешься',
                'сосать' : 'ломать меня полностью',
                'соси' : 'прости',
                'срать' : 'задуматься', 
                'срешь' :  'думаешь', 
                'анал' :  'я испытываю непреодолимое влечение к лицам мужского пола',
                'очко' : 'банку',
                'тебе вилкой в глаз или в жопу раз' : 'меня тянет облизывать розетки',
                'поссать' : 'отвлечься'
            };
            var i = 0;
            var o = [];
            $(m).find("img,span,div,a").map(function (i, h) {
                o[i] = $(h);
                $(h).after('[[' + i + ']]').detach();
                i++
            })
            if (((localStorage.getItem('tr-anticaps') == "1") ? "1" : "0") == "1") {
                m = $(m).html().toLowerCase();
            } else {
                m = $(m).html();
            }
            if (((localStorage.getItem('tr-antimat') == "1") ? "1" : "0") == "1") {
                for (var key in dict) {
                    m = m.replace(key, dict[key])
                };
            }
            o.map(function (h, i) {
                m = m.split("[[" + i + "]]").join(h[0].outerHTML);
            });
            return m;
        }

        $("div.app-chat").bind('DOMNodeInserted', "div.mess-row", function (e) {
            function showfx(name) {
                if (typeof $(document).snowfall != "function" || ((localStorage.getItem('tr-snow') == "1") ? "1" : "0") == "0") {
                    return false;
                }
                $(document).snowfall();
                $(document).snowfall('clear');
                switch (name) {
                    case "aa":
                        $(document).snowfall({
                            image: Terminator.home + 'smiles/s7/aa.gif',
                            minSize: 10,
                            maxSize: 32
                        });
                        break;
                    case "ab":
                        $(document).snowfall({
                            image: Terminator.home + 'smiles/s7/ab.gif',
                            minSize: 10,
                            maxSize: 32
                        });
                        break;
                    case "ac":
                        $(document).snowfall({
                            image: Terminator.home + 'smiles/s7/ac.gif',
                            minSize: 10,
                            maxSize: 32
                        });
                        break;
                    case "ca":
                        $(document).snowfall({
                            image: Terminator.home + 'smiles/s7/ca.gif',
                            minSize: 10,
                            maxSize: 32
                        });
                        break;
                    case "cb":
                        $(document).snowfall({
                            image: Terminator.home + 'smiles/s7/cb.gif',
                            minSize: 10,
                            maxSize: 32
                        });
                        break;
                    case "cc":
                        $(document).snowfall({
                            image: Terminator.home + 'smiles/s7/cc.gif',
                            minSize: 10,
                            maxSize: 32
                        });
                        break;
                    case "ad":
                        $(document).snowfall({
                            image: Terminator.home + 'smiles/s7/ad.gif',
                            minSize: 10,
                            maxSize: 32
                        });
						break;
                    case "ae":
                        $(document).snowfall({
                            image: Terminator.home + 'smiles/s7/ae.gif',
                            minSize: 10,
                            maxSize: 32
                        });
						break;
					case "af":
                        $(document).snowfall({
                            image: Terminator.home + 'smiles/s7/af.gif',
                            minSize: 10,
                            maxSize: 32
                        });
						break; 
					case "сd":
                        $(document).snowfall({
                            image: Terminator.home + 'smiles/s7/сd.gif',
                            minSize: 10,
                            maxSize: 20,
                            flakeCount: 150
                        });
                        break;
                }
                setTimeout(function () {
                    $(document).snowfall('clear')
                }, 20000);
            }
            var element = e.target;
            var $mms = $(element).find("div.chat-text-content");
            var t = $(element).find("div.chat-text-content").html();
            if (t != undefined) {
                var a = t.match(/\*...\*/g);
                if (a != null) {
                    a.forEach(function (a) {
                        var z = a.split("*").join("/*"),
                            ext = 'gif';
                        if (a[1] == "6") {
                            ext = 'png';
                        }
                        if (a[1] == "8") {
                            var l = '<img data-face="8-' + a[2] + a[3] + '" class="tr-smilex" src="' + Terminator.home + 'smiles/s8/aa.png">';
                            if ((localStorage.getItem('tr-sound') == "1") ? "1" : "0" == "1") {
                                Terminator.playSound(Terminator.home + 'sound/' + a[2] + a[3] + ".mp3");
                            }
                        } else {
                            var l = '<img data-face="' + a[1] + "-" + a[2] + a[3] + '" class="tr-smilex" src="' + Terminator.home + 'smiles/s' + a[1] + '/' + a[2] + a[3] + '.' + ext + '">';
                        }
                        t = repl(t, z, l);
                        if (a[1] == "7") {
                            showfx(a[2] + a[3]);
                        }
                    });
                }
                t = antiCapsMat(t);
                $($mms).html(t);
            }

        });
    }
    var Terminator = new Terminator();
    Terminator.run();
    Terminator.chat();

});
