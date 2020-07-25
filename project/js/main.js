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
                this.render();
                new EventButtonsBy(this.goods);
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
}

/**
 * Класс содержит:
 * 1. сущности одного товара
 * 2. html разметку одного товара
 */
class ProductItem {
    constructor(product, img = 'http://placehold.it/200x150') {
        this.product_name = product.product_name;
        this.price = product.price;
        this.id_product = product.id_product;
        this.img = img;
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
class EventButtonsBy {
    constructor(goods) {
        this.goods = goods;

        this.eventListenersButtonsBy();
        this.eventListenersButtonsBasket();
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
 * Класс
 * 1.
 */
class BasketList {
    constructor(idProductElement, goods) {
        this.idProductElement = idProductElement;
        this.goods = goods;

        this.productObject = {};
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
        const basketList = document.querySelector('.basketList');
        this.goods.forEach(good => {
            if (this.idProductElement === good.id_product) {
                this.productObject = good;
                this.renderTotalPrice();
                const productObjectToBasket = new ProductItemInToBasket(good);
                basketList.insertAdjacentHTML('beforeend', productObjectToBasket.render());
            }
        })
    }
    /**
     * Метод
     * 1. в константу totalPriseInBasket помещает html элемент для отображения суммы товаров в корзине
     * 2. обнуляет состояние суммы товара
     * 3. в статическую переменную помещает цену полученного продукта
     * 4. отображает сумму товаров в html разметке
     */
    renderTotalPrice = () => {
        const totalPriseInBasket = document.querySelector('.basketList__total');
        totalPriseInBasket.textContent = "";
        BasketList.totalPrice += Number(this.productObject.price);
        totalPriseInBasket.insertAdjacentText('beforeend', `${BasketList.totalPrice}`)
    };
    //TODO переделать на массив и считать сумму элементов массива
    // переменная для отслеживания суммы товаров
    static totalPrice = 0;

    //TODO метод для удаления товаров из корзины
    //логика сравнение по id

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
    }

    render() {
        return `<div class="basketList__product-item" data-id_product="${this.id_product}">
                    <img class="basketList__img" src="${this.img}" alt="Something img">
                    <div class="basketList__description">
                        <h3>${this.product_name}</h3>
                        <p>${this.price} \u20bd</p>
                        <button class="">удалить</button>
                    </div>
                </div>`;
    }//TODO дописать дата атрибут для отображения повторяющегося товара
}

new ProductList();
