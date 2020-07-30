class Validation {
    constructor() {
        this.regexp = '';
        this.m = null;
        this.arrayObjectsInput = [...document.querySelectorAll('.input')];
        console.log(this.arrayObjectsInput);
        this.eventListeners();
    }

    eventListeners() {
        for (let input of this.arrayObjectsInput) {
            input.addEventListener('change', (event) => {
                const chosenClass = [...event.target.classList].find(cl => cl === 'input_name' || cl === 'input_phone' || cl === 'input_email' || cl === 'input_text');

                switch (chosenClass) {
                    case "input_name":
                        this.regexp = /([a-zA-Z]+)?([а-яА-ЯёЁ]+)?/g;
                        this.regularExpressionCheck(event, chosenClass);
                        break;
                    case "input_phone":
                        this.regexp = /\+7\(\d{3}\)\d{3}-\d{4}/g;
                        this.regularExpressionCheck(event, chosenClass);
                        break;
                    case "input_email":
                        this.regexp = /([a-z]{2,6}[\.,\-]?@[a-z]{4}\.[a-z]{2})|([a-z]{2}[\.,\-]?[a-z]{4}@[a-z]{4}\.[a-z]{2})/g;
                        this.regularExpressionCheck(event, chosenClass);
                        break;
                    case "input_text":
                        this.regexp = /[\w?\'?\(?\)?\;?\??\-?\.]+/gi;
                        this.regularExpressionCheck(event, chosenClass);
                        break;
                }
            })
        }
    }

    /**
     * Проверка на валидность
     * @param event
     * @param chosenClass
     * @return {boolean}
     */
    regularExpressionCheck(event, chosenClass) {
        while ((this.m = this.regexp.exec(event.target.value)) !== null) {
            if (this.m.index === this.regexp.lastIndex) {
                this.regexp.lastIndex++;
            } else
                this.m.forEach((match, groupIndex) => {
                    this.getClass(chosenClass).classList.add('input__green')
                    console.log(`Валидация пройдена  ${groupIndex}: ${match}`);
                });
        }
    }

    /**
     * Получаем объект класса
     * @param chosenClass
     * @return {Element}
     */
    getClass(chosenClass) {
        return document.querySelector(`.${chosenClass}`);
    }
}

new Validation();