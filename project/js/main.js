const products = [
    {id: 1, title: 'Notebook', price: 20000},
    {id: 2, title: 'Mouse', price: 1500},
    {id: 3, title: 'Keyboard', price: 5000},
    {id: 4, title: 'Gamepad', price: 4500},
];

/**
 * Функция свойства объекта  преобразует их и возвращает строку
 * @param title название товара
 * @param price цена товара
 * @param img картинка если есть
 * @return {string} часть кода HTML (для одного продукта)
 */
const renderProduct = (title, price, img = 'http://dummyimage.com/260x350/99cccc.jpg/0b0b0b&text=Фото+товара!') => {
    return `<div class="product-item">
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
    const productList = list.map(item => renderProduct(item.title, item.price));
    for (let i = 0; i < productList.length; i++) {
        document.querySelector('.products').innerHTML += productList[i];
    }
    // console.log(productList);
    // document.querySelector('.products').innerHTML = productList;
};

renderProducts(products);
