const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        imgCatalog: 'https://placehold.it/200x150',
        isVisibleCart: false,
        isEmptyCart: true,
        cartProducts: [],
        searchLine: '',


    },
    methods: {
        filterGoods() {
            const regexp = new RegExp(this.searchLine, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
            console.log(this.filtered)
            //TODO товар удаляется но нужно переделать на скрытие 
            this.products.forEach(el => {
                if (!this.filtered.includes(el)) {
                    this.products.splice(this.cartProducts.indexOf(el), 1);
                } else {
                }
            })

        },
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        /**
         * добвавить продукт в корзину
         * @param elem
         */
        addProduct(elem) {
            let find = this.cartProducts.find(product => product.id_product === elem.id_product);
            if (find) {
                find.quantity++;
            } else {
                elem.quantity = 1;
                this.cartProducts.push(elem);
                this.emptyCartMessage();
            }
        },

        /**
         * удалить продукт из корзины
         * @param elem
         */
        removeProduct(elem) {
            let find = this.cartProducts.find(product => product.id_product === elem.id_product);
            if (find.quantity > 1) {
                find.quantity--;
            } else {
                this.cartProducts.splice(this.cartProducts.indexOf(find), 1);
                this.emptyCartMessage();
            }
        },

        /**
         * вывод сообщения если корзина пуста
         */
        emptyCartMessage() {
            this.isEmptyCart = this.cartProducts.length === 0 ? true : false;
        },

    },
    computed: {},
    created() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                }
            });
    },
})
