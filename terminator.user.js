// ==UserScript==
// @name        ChatFilter
// @description ChatFilter - Chat optimizator
// @author      Semanticworld,MemchachedAG (v0.0.0.22) TornadoSN (v2.0.0.22)
// @version     2.0.0.22
// @updateURL   https://tornadosn.github.io/ChatFilter/terminator.user.js
// @icon        https://tornadosn.github.io/ChatFilter/assets/ico/ico128.png
// @icon64      https://tornadosn.github.io/ChatFilter/assets/ico/ico64.png
// @namespace   https://livacha.com/
// @match       https://livacha.com/*
// @match       https://dropmefiles.com/*
// @match       *.chatovod.ru*
// @connect     livacha.com
// @connect     dropmefiles.com
// @require     https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.min.js
// @grant       GM_xmlhttpRequest
// @run-at      document-end
// ==/UserScript==
(function () {
    'use strict';
    var home = 'https://tornadosn.github.io/ChatFilter/assets/';
    localStorage.setItem('tr-home', home);
    localStorage.setItem('tr-ver', '0.0.0.22');

    function getHostName(url) {
        var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
        if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
            return match[2];
        } else {
            return null;
        }
    }

    function LoadSelectedTerminator(url) {
        var xhr = new XMLHttpRequest();
        xhr.open("get", url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                    var script = document.createElement("script");
                    script.type = "text/javascript";
                    script.text = xhr.responseText;
                    document.body.appendChild(script);
                }
            }
        };
        xhr.send(null);
    }
    switch (getHostName(document.location.href)) {
        case 'livacha.com':
            LoadSelectedTerminator(home + 'js/livacha.js?r=' + Math.random());
            break;
        case 'marshat.com':
            LoadSelectedTerminator(home + 'js/marshat.js?r=' + Math.random());
            break;
        default:
            var sd = (document.location.href).split(".");
            if (sd[1] == "chatovod") {
                LoadSelectedTerminator(home + 'js/chatovod.js?r=' + Math.random());
            }
            break;
    }
})();
