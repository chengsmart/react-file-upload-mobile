(function (win) {
    var renderTime;
    win.addEventListener("resize", function () {
        clearTimeout(renderTime);
        renderTime = setTimeout(initPage, 300);
    }, false);

    win.addEventListener("pageshow", function (e) {
        e.persisted && (clearTimeout(renderTime), renderTime = setTimeout(initPage, 300));
    }, false);

    initPage();
    function addClass (docElem, clazz) {
        docElem.className === '' ? docElem.className += clazz : docElem.className += ' ' + clazz;
    }
    function initPage () {
        var document = window.document,
            ua = navigator.userAgent,
            docElem = document.documentElement,
            dpr = win.devicePixelRatio || 1,
            matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i),
            UCversion = ua.match(/U3\/((\d+|\.){5,})/i),
            isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80,
            isIOS = navigator.appVersion.match(/(iphone|ipad|ipod)/gi),
            vpm = document.querySelector('meta[name="viewport"]');

        if (!isIOS && !(matches && matches[1] > 534) && !isUCHd) {
            // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
            dpr = 1;
        }
        if (isIOS) {
            addClass(docElem, 'ios')
        }


        var scale = 1 / dpr;

        if (!vpm) {
            vpm = document.createElement("meta");
            vpm.setAttribute("name", "viewport");
            docElem.firstElementChild.appendChild(vpm);
        }

        vpm.setAttribute("content", "width=device-width, initial-scale=" + scale + ",maximum-scale=" + scale + ",minimum-scale=" + scale + ", user-scalable=no, minimal-ui");
        var htmlWidth = docElem.getBoundingClientRect().width;
        htmlWidth * scale > 960 && (htmlWidth = 960 / scale);
        win.rem = htmlWidth / 10;

        docElem.style.fontSize = win.rem + "px";
    }
})(window);