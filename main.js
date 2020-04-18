var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        image: './assets/vmSocks-green-onWhite.jpg',
        inStock: true,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        description: 'A pair of warm, fuzzy socks',
        link: 'https://www.vuemastery.com/courses/intro-to-vue-js/attribute-binding',
        onSale: true
    }
})