const docElem = window.document.documentElement;

function getViewportH() {
    let client = docElem['clientHeight'],
        inner = window['innerHeight'];

    if( client < inner )
        return inner;
    else
        return client;
}


function scrollY() {
    const supportPageOffset = window.pageXOffset !== undefined;
    const isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");

    return supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
}

// http://stackoverflow.com/a/5598797/989439
function getOffset( el ) {
    let offsetTop = 0, offsetLeft = 0;
    do {
        if ( !isNaN( el.offsetTop ) ) {
            offsetTop += el.offsetTop;
        }
        if ( !isNaN( el.offsetLeft ) ) {
            offsetLeft += el.offsetLeft;
        }
    } while( el = el.offsetParent );

    return {
        top : offsetTop,
        left : offsetLeft
    }
}

function inViewport( el, h ) {
    let elH = el.offsetHeight,
        scrolled = scrollY(),
        viewed = scrolled + getViewportH(),
        elTop = getOffset(el).top,
        elBottom = elTop + elH;
        // if 0, the element is considered in the viewport as soon as it enters.
        // if 1, the element is considered in the viewport only when it's fully inside
        // value in percentage (1 >= h >= 0)
        h = h || 0;

    return (elTop + elH * h) <= viewed && (elBottom) >= scrolled;
}

class Scroller {
    constructor (el, options){
        const defaults = {
            viewportFactor: 0.2,
            hidden_class: 'section--hidden',
            animation_class: 'section--animation',
            selector: '[data-section]'
        }
        this.el = el
        this.options = {...defaults, ...options}
        this.items = [...this.el.querySelectorAll('[data-section]')]
        this.didScroll = false

        this.items.forEach(item => {
            let elH = item.offsetHeight,
                elTop = getOffset(item).top,
                elBottom = elTop + elH;

            if(!inViewport(item)){
                item.classList.add(this.options.hidden_class)
            }
        })

        window.addEventListener('scroll', this.onScroll.bind(this))
        window.addEventListener('resize', this.onResize.bind(this))
    }

    scrollPage(){
        this.items.forEach(item => {
            if(inViewport(item, this.options.viewportFactor) && item.classList.contains(this.options.hidden_class)){
                item.classList.add(this.options.animation_class)
            }
        })
        this.didScroll = false
    }

    onScroll(){
        if(!this.didScroll){
            this.didScroll = true
            setTimeout(() => {
                this.scrollPage()
            }, 60)
        }
    }

    onResize(){
        let delayed = () => {
            this.onScroll()
            this.resizeTimeout = null
        }

        if(this.resizeTimeout) clearTimeout(this.resizeTimeout)
        this.resizeTimeout = setTimeout(delayed, 200)
    }
}

new Scroller(document.querySelector('#scroller'))