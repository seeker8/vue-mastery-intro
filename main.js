Vue.component('product', {
    template: `
    <div class="product">
    <div class="product-image">
        <img v-bind:src="image">
    </div>
    <div class="product-info">
        <h1>{{title}}</h1>
        <p v-if="inStock">In Stock</p>
        <p v-else :class="{outOfStock: !inStock}">Out of Stock</p>
        <!-- challenge add onSale-->
        <!-- <span v-if="onSale">On Sale!</span> -->
        <ul>
            <li v-for="detail in details">{{detail}}</li>
        </ul>
        <div v-for="(variant, index) in variants" :key="variant.variantId" class="color-box"
            :style="{backgroundColor: variant.variantColor}" @mouseover="updateProduct(index)">
        </div>
        <!-- challenge add sizes -->
        <!-- <ul>
            <li v-for="size in sizes">{{size}}</li>
        </ul> -->
        <button v-on:click="addToCart" :disabled="!inStock" :class="{disabledButton: !inStock}">Add to
            Cart</button>
        <div class="cart">
            <p>Cart ({{cart}})</p>
        </div>
        <button @click="removeFromCart">Remove</button>
    </div>
</div>
    `,
    data: function () {
        return {
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
        }
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
        inStock: function () {
            return this.variants[this.selectedVariant].variantQuantity;
        }
    }
});

var app = new Vue({
    el: '#app'
});