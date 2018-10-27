function slideOnScroll() {
    for (var e = 0; e < elements.length; e += 1) {
        var t = elements[e].getBoundingClientRect();
        t.top - window.innerHeight < 0 ? elements[e].classList.remove("rewind-slide") : t.top - window.innerHeight - 100 > 0 && elements[e].classList.add("rewind-slide"),
            t.bottom + 100 < 0 ? (elements[e].classList.add("out-of-screen"),
                elements[e].classList.add("rewind-slide")) : elements[e].classList.remove("out-of-screen")
    }
    var n = headerImageElement.getBoundingClientRect().height
        , i = window.scrollY;
    n > i && (headerImageElement.style.transform = "translateY(" + i / 2 + "px) scale(1.07, 1.07)",
        headerImageElement.style.opacity = 1 - i / (.6 * n))
}

function fixHeaderHeight() {
    headerElement.style.removeProperty("height"),
        setTimeout(function () {
            headerElement.style.height = headerElement.getBoundingClientRect().height + "px"
        }, 300)
}

var elements = document.querySelectorAll(".slide-on-scroll")
    , headerImageElement = document.querySelector(".m-header--image");
window.addEventListener("scroll", slideOnScroll),
    window.addEventListener("resize", slideOnScroll),
    slideOnScroll();
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(navigator.userAgent)
    , headerElement = document.querySelector(".m-header")
    , eventName = isMobile ? "orientationchange" : "resize";
window.addEventListener(eventName, fixHeaderHeight),
    fixHeaderHeight();
