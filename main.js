Vue.config.devtools = true;
Vue.component('product-details', {
    props: {
        details: {
            type: String,
            required: true
        }
    },
    template: `<ul>
    <li v-for="detail in details">{{detail}}</li>
    </ul>
    `
});

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
    <div class="product-image">
        <img v-bind:src="image">
    </div>
    <div class="product-info">
        <h1>{{title}}</h1>
        <p v-if="inStock">In Stock</p>
        <p v-else :class="{outOfStock: !inStock}">Out of Stock</p>
        <p>Shipping: {{shipping}}</p>
        <!-- challenge add onSale-->
        <!-- <span v-if="onSale">On Sale!</span> -->
        <product-details :details="details"></product-details>
        <div v-for="(variant, index) in variants" :key="variant.variantId" class="color-box"
            :style="{backgroundColor: variant.variantColor}" @mouseover="updateProduct(index)">
        </div>
        <!-- challenge add sizes -->
        <!-- <ul>
            <li v-for="size in sizes">{{size}}</li>
        </ul> -->
        <button v-on:click="addToCart" :disabled="!inStock" :class="{disabledButton: !inStock}">Add to
            Cart</button>
        <button @click="removeFromCart">Remove</button>
    </div>
    <product-review @review-submitted="addReviews"></product-review>
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
            description: 'A pair of warm, fuzzy socks',
            link: 'https://www.vuemastery.com/courses/intro-to-vue-js/attribute-binding',
            onSale: true,
            sizes: ["small", "medium", "large", "extra large"],
            reviews: []
        }
    },
    methods: {
        addToCart: function () {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },
        updateProduct: function (index) {
            this.selectedVariant = index
        },
        removeFromCart: function () {
            this.$emit('remove-from-cart');
        },
        addReviews: function (productReview) {
            this.reviews.push(productReview);
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
        },
        shipping: function () {
            return this.premium ? 'free' : 2.99;
        }
    }
});

Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
        <p>
          <label for="name">Name:</label>
          <input id="name" v-model="name">
        </p>
        
        <p>
          <label for="review">Review:</label>
          <textarea id="review" v-model="review"></textarea>
        </p>
        
        <p>
          <label for="rating">Rating:</label>
          <select id="review" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
          </select>
        </p>

        <p>
          <input type="submit" value="Submit">
    </form>
    `,
    data: function () {
        return {
            name: null,
            review: null,
            rating: null
        }
    },
    methods: {
        onSubmit: function () {
            let productReview = {
                name: this.name,
                review: this.review,
                rating: this.rating
            };
            this.$emit('review-submitted', productReview);
            this.name = null;
            this.review = null;
            this.rating = null;
        }
    }
});

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart: function (id) {
            this.cart.push(id);
        },
        removeFromCart: function () {
            this.cart.pop();
        }
    }
});