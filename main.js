var app = new Vue({
    el: '#app',
    data: {
        brand: 'Vue Mastery',
        product: 'Socks',
        selectedVariant: 0,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: "green",
                variantImage: "./assets/vmSocks-green-onWhite.jpg",
                variantQuantity: 10
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                variantQuantity: 0
            }
        ],
        cart: 0,
        description: 'A pair of warm, fuzzy socks',
        link: 'https://www.vuemastery.com/courses/intro-to-vue-js/attribute-binding',
        onSale: true,
        sizes: ["small", "medium", "large", "extra large"]
    },
    methods: {
        addToCart: function () {
            this.cart += 1;
        },
        updateProduct: function (index) {
            this.selectedVariant = index
        },
        removeFromCart() {
            if (this.cart > 0) this.cart -= 1;
        }
    },
    computed: {
        title: function () {
            return this.brand + ' ' + this.product;
        },
        image: function () {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock: function(){
            return this.variants[this.selectedVariant].variantQuantity;
        }
    }
})