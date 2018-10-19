(function (window) {
  var svgSprite = '<svg><symbol id="icon-icon_arrow_right" viewBox="0 0 1024 1024"><path d="M751.552 551.936l-399.232 399.232c-22.080 22.080-57.792 22.080-79.872 0-22.016-22.016-22.080-57.792 0-79.872l359.296-359.296-359.296-359.296c-22.016-22.016-22.080-57.792 0-79.872s57.792-22.016 79.872 0l399.232 399.232c22.016 22.080 22.016 57.792 0 79.872z"  ></path></symbol><symbol id="icon-jiantouzuo" viewBox="0 0 1024 1024"><path d="M272.448 472.064l399.232-399.232c22.08-22.08 57.792-22.08 79.872 0 22.016 22.016 22.08 57.792 0 79.872l-359.296 359.296 359.296 359.296c22.016 22.016 22.08 57.792 0 79.872s-57.792 22.016-79.872 0l-399.232-399.232c-22.016-22.08-22.016-57.792 0-79.872z"  ></path></symbol></svg>';
  var script = function () {
    var scripts = document.getElementsByTagName("script");
    return scripts[scripts.length - 1]
  }();
  var shouldInjectCss = script.getAttribute("data-injectcss");
  var ready = function (fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function () {
          document.removeEventListener("DOMContentLoaded", loadFn, false);
          fn()
        };
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        init = function () {
          if (!done) {
            done = true;
            fn()
          }
        };
      var polling = function () {
        try {
          d.documentElement.doScroll("left")
        } catch (e) {
          setTimeout(polling, 50);
          return
        }
        init()
      };
      polling();
      d.onreadystatechange = function () {
        if (d.readyState == "complete") {
          d.onreadystatechange = null;
          init()
        }
      }
    }
  };
  var before = function (el, target) {
    target.parentNode.insertBefore(el, target)
  };
  var prepend = function (el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  };

  function appendSvg() {
    var div, svg;
    div = document.createElement("div");
    div.innerHTML = svgSprite;
    svgSprite = null;
    svg = div.getElementsByTagName("svg")[0];
    if (svg) {
      svg.setAttribute("aria-hidden", "true");
      svg.style.position = "absolute";
      svg.style.width = 0;
      svg.style.height = 0;
      svg.style.overflow = "hidden";
      prepend(svg, document.body)
    }
  }
  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true;
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")
    } catch (e) {
      console && console.log(e)
    }
  }
  ready(appendSvg)
})(window)