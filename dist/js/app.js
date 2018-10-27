document.addEventListener("DOMContentLoaded", function () {
    // header
    const body = document.querySelector('body')
    const header = document.querySelector('#header')
    const header_height = header.getBoundingClientRect().height
    const menu_trigger = document.querySelector("#header__trigger")
    const links = document.querySelectorAll(".header-menu-link")
    let $active_link = null

    menu_trigger.addEventListener("click", function () {
        header.classList.add("header--mobile")
        body.classList.add('no-scroll')
    });

    links.forEach(function (link) {
        link.addEventListener("click", function (e) {
            e.preventDefault()
            let attribute = link.getAttribute("href")
            let href = attribute.substr(1)
            let section = document.querySelector("[id='"+href+"']")
            let top = parseInt(section.getBoundingClientRect().top + scrollY() - header_height + 2)

            if($active_link !== null) $active_link.classList.remove('is-active')
            body.classList.remove('no-scroll')
            header.classList.remove('header--mobile')
            this.classList.add('is-active')
            $active_link = this
            window.scrollTo(0, top)
        })
    })

    // map
    const map = L.map('map', {
        scrollWheelZoom: false
    });
    const myIcon = L.icon({
        iconUrl: 'dist/img/pin.svg',
        iconSize: [50, 50],
        iconAnchor: [25, 50],
        popupAnchor: [-3, -76],
        shadowSize: [68, 95],
        shadowAnchor: [22, 94]
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    const marker = L.marker([51.5, -0.09], {
        icon: myIcon
    }).addTo(map)
    const latLngs = [ marker.getLatLng() ];
    const markerBounds = L.latLngBounds(latLngs);
    map.fitBounds(markerBounds);
});

