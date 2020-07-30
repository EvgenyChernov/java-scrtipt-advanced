"use strict";

class Editing {
    constructor() {
        this.originalText = '';
        this.regExp = new RegExp("'", "g");
        this.editingText();
    }

    editingText() {
        this.originalText = document.querySelector('.original-text').textContent;
        let editorText = this.originalText.replace(this.regExp, "\"");
        document.querySelector('.ready-text').insertAdjacentHTML("beforeend", editorText);
    }
}

new Editing()