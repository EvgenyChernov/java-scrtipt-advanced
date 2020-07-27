"use strict";

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

/**
 * Главный класс
 * включает в себя основные методы:
 * 1. запрос json файла с каталогом (получение массива с товаром)
 * 2. преобразование объекта товара в массив объектов
 * 3. отрисоввывает html элементы товаров
 */
class ProductList {
    constructor(container = ".products") {
        this.container = container;
        this.goods = [];
        this.allProducts = [];

        /**
         * then
         * 1. получает объект с документами
         * 2. принудительно помещает объекты документа в массив
         * 3. запускает метод render()
         * 4. инициализирует класс слушателя событий
         */
        this.getProducts()
            .then((data) => {
                this.goods = [...data];
                this.goods.forEach((product) => {
                    product.quantity_product = 1;
                })
                this.render();
                new EventButtons(this.goods);
            });
    }

    /**
     * Метод:
     * 1. получает массив с объектами товаров
     * 2. возвращает запрашиваемый документ в виде объекта
     * @return {Promise<data>} возвращает запрашиваемый документ в виде объекта
     */
    getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log('Error!', error)
            });
    }

    /**
     * Метод:
     * 1. помещает в константу div с классом .products
     * 2. помещает в константу productObject инициализированный объект с свойствами товара
     * 3. добавляет в массив allProducts созданный объект
     * 4. в константу div с классом .products помещает отрисованную html разметку
     */
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObject = new ProductItem(product);
            this.allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }

    static productObjectInBasket = [];
}

/**
 * Класс содержит:
 * 1. сущности одного товара
 * 2. html разметку одного товара
 */
class ProductItem {
    constructor(product, img = 'http://placehold.it/200x150', quantity_product = 1) {
        this.product_name = product.product_name;
        this.price = product.price;
        this.id_product = product.id_product;
        this.img = img;
        this.quantity_product = quantity_product;
    }

    /**
     * Метод
     * 1. возвращает html разметку одного блока товара в виде строки
     * @return {string} html разметку одного блока товара в виде строки
     */
    render() {
        return `<div class="product-item" data-id_product="${this.id_product}">
                <img src="${this.img}" alt="Something img">
                    <div class="product-item__description">
                        <h3>${this.product_name}</h3>
                        <p>${this.price} \u20bd</p>
                        <button class="by-btn product-item__button">Купить</button>
                    </div>
              </div>`;
    }
}

/**
 * Класс
 * 1. назначает слушатель событий на кнопке "купить"
 * 2. отображает или скрывает корзину
 * 3. инициализирует объекты корзины на которые кликнул user
 */
class EventButtons {
    constructor(goods) {
        this.goods = goods;

        this.eventListenersButtonsBy();
        this.eventListenersButtonsBasket();
        this.removeFromCart();
    }

    /**
     * Метод
     * 1.  в константу buttonsBy помещает html коллекцию с тегами содержащие класс '.by-btn'
     * 2.  перебирает полученные элементы и каждой кнопке назначает слушатель событий при клике
     * 2.1 помещает в константу button кнопку в виде html элемента
     * 2.2 помещает в константу productElement продукта в виде html элемента
     * 3.  в переменную idProductElement помещается id полученный из дата атрибута
     * 4.  инициализируются новые объекты класса BasketList в который передаются id и массив объектов
     * назначает слушатель событий всем кнопкам при клике, возвращает при клике на кнопку  продукта.
     */
    eventListenersButtonsBy = () => {
        const buttonsBy = document.querySelectorAll('.by-btn');
        buttonsBy.forEach(buttonBy => {
            buttonBy.addEventListener('click', event => {
                const button = event.currentTarget;
                const productElement = button.closest('.product-item');
                let idProductElement = Number(productElement.dataset.id_product);
                new BasketList(idProductElement, this.goods);
            })

        });
    };

    /**
     * Метод
     * 1. создает переменную buttonStatus для отображения статуса отображения корзины
     * 2. в константу buttonBasket помещает html тег содержащий класс '.header__button' (кнопка корзины)
     * 3. назначает кнопке слушатель событий при клике
     * 4. добавляет или удаляет класс basketList_visibility в зависимости от переменной buttonStatus
     * назначает слушатель событий на кнопку корзина отображая содержимое корзины
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

/**
 * Класс корзины
 * 1.
 */
class BasketList {
    constructor(idProductElement, goods) {
        this.idProductElement = idProductElement;
        this.goods = goods;

        this.addProductToBasket();

    }

    /**
     * Метод
     * 1. в константу basketList помещает html тег содержащий класс '.basketList'
     * 2. перебирает массив с товарами
     * 2.1. сравнивает id выбранного user товара с каждым товаром объекта
     * 2.2. при совпадении помещает объект товара в массив productObject
     * 3. запускает метод подсчета суммы товара
     * 4. помещает в константу productObjectToBasket объект с товарами для корзины
     * 5. в корзину помещает html разметку выбранного товара
     */
    addProductToBasket = () => {
        this.goods.forEach((product) => {
            if (product.id_product === this.idProductElement) {
                console.log(this.checkForPresenceInBasket())
                if (ProductList.productObjectInBasket.length === 0 || this.checkForPresenceInBasket()) {
                    ProductList.productObjectInBasket.push(product);
                } else {
                    this.checkInBasket()
                }
            }
        })
        this.renderBasketList();
        this.removeFromCart();
    }

    renderBasketList = () => {
        const basketList = document.querySelector('.basketList__content');
        basketList.textContent = "";
        ProductList.productObjectInBasket.forEach((product) => {
            const productObjectToBasket = new ProductItemInToBasket(product);
            basketList.insertAdjacentHTML('beforeend', productObjectToBasket.render());
        })
        this.renderTotalPrice();

    }

    /**
     * Метод
     * 1. проверяет есть ли в корзине аналогичный товар
     * @return {boolean}
     */
    checkForPresenceInBasket = () => {
        let status = 0;
        ProductList.productObjectInBasket.forEach((product) => {
            if (product.id_product === this.idProductElement) {
                status = ++status
            }
        })
        if (status === 0)
            return true
    }
    /**
     * Метод
     * 1. Увеличивает на 1 количество товаров в корзине
     */
    checkInBasket = () => {
        ProductList.productObjectInBasket.forEach((product) => {
            if (product.id_product === this.idProductElement) {
                product.quantity_product++;
            }
        })
    };

    /**
     * Метод
     * 1. в константу totalPriseInBasket помещает html элемент для отображения суммы товаров в корзине
     * 2. обнуляет состояние суммы товара
     * 3. в статическую переменную помещает цену полученного продукта
     * 4. отображает сумму товаров в html разметке
     */
    renderTotalPrice = () => {
        let totalPrice = 0;
        const totalPriseInBasket = document.querySelector('.basketList__total');
        totalPriseInBasket.textContent = "";
        for(let product of ProductList.productObjectInBasket){
            totalPrice +=( Number(product.price) * Number(product.quantity_product));
        }
        totalPriseInBasket.insertAdjacentText('beforeend', `${totalPrice}`)
    };

    removeFromCart = () => {
        let buttonsRemoveCart = document.querySelectorAll(".buttonRemoveCart");
        buttonsRemoveCart.forEach(buttonRemove => {
            buttonRemove.addEventListener('click', event => {
                const buttonRemove = event.currentTarget;
                const productElementToCart = buttonRemove.closest('.basketList__product-item');
                let idProductElement = Number(productElementToCart.dataset.id_product);
                ProductList.productObjectInBasket.forEach((product) => {
                    if (product.id_product === idProductElement) {
                        product.quantity_product--
                    }
                })
                this.renderTotalPrice();
                this.renderBasketList();
                this.removeFromCart();
            })
        });
    }
}


/**
 * Класс для отрисовки элементов корзины
 */
class ProductItemInToBasket {
    constructor(product, img = 'http://placehold.it/100x75') {
        this.product_name = product.product_name;
        this.price = product.price;
        this.id_product = product.id_product;
        this.img = img;
        this.quantity_product = product.quantity_product;

    }

    render() {
        return `<div class="basketList__product-item" data-id_product="${this.id_product}">
                    <img class="basketList__img" src="${this.img}" alt="Something img">
                    <div class="basketList__description">
                        <h3>${this.product_name}</h3>
                        <p>${this.price} \u20bd</p>
                        <p>${this.quantity_product}</p>
                        <button class="buttonRemoveCart">удалить</button>
                    </div>
                </div>`;
    }
}

new ProductList();
