window.addEventListener('load', () => {
    const productList = new ProductList();


    productList.fetchProducts();
    productList.render();
    const basket = new Basket(productList.goods);
    basket.seeBasket();
    basket.getButtonsBy();
})

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allproducts = [];
    }

    fetchProducts() {
        this.goods = [
            {id: 1, title: 'Notebook', price: 20000},
            {id: 2, title: 'Mouse', price: 1500},
            {id: 3, title: 'Keyboard', price: 5000},
            {id: 4, title: 'Gamepad', price: 4500},
        ];
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObject = new ProductItem(product);
            this.allproducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }
}

class ProductItem {
    constructor(product, img = 'http://placehold.it/200x150') {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Something img">
                    <div class="product-item__description">
                        <h3>${this.title}</h3>
                        <p>${this.price} \u20bd</p>
                        <button class="by-btn product-item__button">Купить</button>
                    </div>
              </div>`;
    }
}

class Basket {
    constructor(goods) {
        this.id = null;
        this.goods = goods;
        this.basketProducts = [];
    }


    /**
     * функция отображает поле корзины при нажатии на кнопку "корзина"
     */
    seeBasket() {
        let basketBtns = document.querySelector(".header__button");
        basketBtns.addEventListener("click", function () {
            let basketList = document.querySelector(".basketList");
            basketList.classList.add("basketList_visibility");
        });
    };

    /**
     * Функция добавляет продукт при нажатии кнопки "Купить"
     */
    addToBasket(product) {
        const basket = document.querySelector(".basketList")
        const productBasket = new ProductItem(product);
        this.basketProducts.push(productBasket);
        basket.insertAdjacentHTML('beforeend', productBasket.render());
    }


    /**
     * Функция ищет все кнопки "Купить" и задает им слушатели событий при клике кнопка возвращает data-id
     */
    getButtonsBy() {
        let byButtons = document.querySelectorAll(".by-btn");
        byButtons.forEach(function (btn) {
            btn.addEventListener('click', function (eventClick) {
                let elemEventClick = eventClick.currentTarget;
                let elemDivProduct = elemEventClick.closest('.product-item')
                let id = Number(elemDivProduct.dataset.id);
                let goods = [
                    {id: 1, title: 'Notebook', price: 20000},
                    {id: 2, title: 'Mouse', price: 1500},
                    {id: 3, title: 'Keyboard', price: 5000},
                    {id: 4, title: 'Gamepad', price: 4500},
                ]//TODO; не понимаю как получить массив объектов с товарами из другого класса , для дальнейшего использования, (goods)
                for (let product of goods) {
                    if (id === product.id) {
                        addToBasket(product)
                        console.log(product.title)

                        //TODO по моей логике после удачного сравнения можно объект товара перенести в div корзины и создать переменную в которой
                        // будет храниться массив объектов которые добавили в корзину
                        // после чего циклом for перебрать и получить сумму товаров
                    }
                }
            });
        })
    }
}


