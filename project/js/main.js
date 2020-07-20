const products = [
    {id: 1, title: 'Notebook', price: 20000},
    {id: 2, title: 'Mouse', price: 1500},
    {id: 3, title: 'Keyboard', price: 5000},
    {id: 4, title: 'Gamepad', price: 4500},
];

/**
 * Функция получает свойства объекта и отображает карточку одного товара на странице
 * @param title название товара
 * @param price цена товара
 * @param img картинка если есть
 */
const renderProduct = (title, price, img = 'http://dummyimage.com/260x350/99cccc.jpg/0b0b0b&text=Фото+товара!') => {
    document.querySelector('.products').innerHTML += `<div class="product-item">
                <h3>${title}</h3>
                <img src="${img}" alt="">
                <p>Цена ${price}</p>
                <button class="by-btn">Добавить в корзину</button>
              </div>`;
};

/**
 * Функция создает карточки продукта
 * @param list
 */
const renderProducts = list => {
    list.map(item => renderProduct(item.title, item.price));
};

renderProducts(products);
