"use strict";

class ProductList {
    constructor(container = ".products") {
        this.container = container;
        this.goods = [];
        this.allProducts = [];

        this.fetchProducts();
        this.render();
        new EventButtonsBy(this.goods);
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
            this.allProducts.push(productObject);
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

class EventButtonsBy {
    constructor(goods) {
        this.goods = goods;
        this.eventListenersButtonsBy();
        this.eventListenersButtonsBasket();

    }

    /**
     * метод назначает слушатель событий всем кнопкам при клике, возвращает при клике на кнопку  продукта.
     */
    eventListenersButtonsBy = () => {
        let arrayIdSelectedProduct = [];
        const buttonsBy = document.querySelectorAll('.by-btn');
        buttonsBy.forEach(buttonBy => {
            buttonBy.addEventListener('click', event => {
                const button = event.currentTarget;
                const productElement = button.closest('.product-item');
                let idProductElement = Number(productElement.dataset.id);
                new BasketList(idProductElement, this.goods);
            })

        });
    };

    /**
     * метод назначает слушатель событий на кнопку корзина отображая содержимое корзины
     */
    eventListenersButtonsBasket() {
        let buttonStatus = 0;
        const buttonBasket = document.querySelector('.header__button');
        buttonBasket.addEventListener('click', function () {
            const basketList = document.querySelector('.basketList');
            console.log(basketList);
            if (buttonStatus === 0) {
                basketList.classList.add('basketList_visibility');
                buttonStatus++;
                return
            }
            basketList.classList.remove('basketList_visibility');
            buttonStatus = 0;
        });
    }
}

class BasketList {
    constructor(idProductElement, goods) {
        this.idProductElement = idProductElement;
        this.goods = goods;

        this.productObject = {};
        this.addProductToBasket();
    }

    addProductToBasket = () => {
        const basketList = document.querySelector('.basketList');
        this.goods.forEach(good => {
            if (this.idProductElement === good.id) {
                this.productObject = good;
                this.renderTotalPrice();
                const productObjectToBasket = new ProductItemInToBasket(good);
                basketList.insertAdjacentHTML('beforeend', productObjectToBasket.render());
            }
        })
    }

    renderTotalPrice = () => {
        const totalPriseInBasket = document.querySelector('.basketList__total');
        totalPriseInBasket.textContent = "";
        BasketList.totalPrice += Number(this.productObject.price);
        console.log(BasketList.totalPrice);

        totalPriseInBasket.insertAdjacentText('beforeend', `${BasketList.totalPrice}`)
    };

    static totalPrice = 0;
}

class ProductItemInToBasket {
    constructor(product, img = 'http://placehold.it/100x75') {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }

    render() {
        return `<div class="basketList__product-item" data-id="${this.id}">
                    <img class="basketList__img" src="${this.img}" alt="Something img">
                    <div class="basketList__description">
                        <h3>${this.title}</h3>
                        <p>${this.price} \u20bd</p>
                        <button class="">удалить</button>
                    </div>
                </div>`;
    }
}


new ProductList();
