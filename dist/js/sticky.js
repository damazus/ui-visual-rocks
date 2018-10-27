class Sticky {
    constructor (element){
        this.el = element
        this.offset = parseInt(this.el.dataset.stickyOffset) || 0
        this.sticky_class = this.el.dataset.stickyClass || 'fixed'
        this.rect = element.getBoundingClientRect()
        this.top = this.rect.top + this.scrollY()
        this.fake = document.createElement('div')
        this.fake.style.width = this.rect.width + 'px'
        this.fake.style.height = this.rect.height + 'px'

        window.addEventListener('scroll', this.onScroll.bind(this))
        window.addEventListener('resize', this.onResize.bind(this))
    }

    onScroll (){
        let isSticky = this.el.classList.contains(this.sticky_class)

        if(this.scrollY() > this.top + this.offset && !isSticky){
            this.el.classList.add(this.sticky_class)
            this.el.style.width = this.rect.width + 'px'
            this.el.parentNode.insertBefore(this.fake, this.el)
        }else if (this.scrollY() < this.top + this.offset && isSticky) {
            this.el.classList.remove(this.sticky_class)
            this.fake.remove()
        }
    }

    onResize (){
        this.el.style.width = 'auto'
        this.el.classList.remove(this.sticky_class)
        this.rect = this.el.getBoundingClientRect()
        this.top = this.rect.top + this.scrollY()
        this.fake.style.width = this.rect.width + 'px'
        this.fake.style.height = this.rect.height + 'px'
        this.onScroll()
    }

    scrollY () {
        const supportPageOffset = window.pageXOffset !== undefined;
        const isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");

        return supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
    }
}

const sticky = new Sticky(document.querySelector('#header'))