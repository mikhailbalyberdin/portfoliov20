class Creator {
    element = null;
    constructor(elemParams) {
        this.params = elemParams;
        this.createTag();
        this.setText();
        this.setClass();
        this.setAttr();
    }
// Add condition for params-checking
    createTag() {
        if (this.params.tagName) {
            this.element = document.createElement(this.params.tagName);
        }
    }

    setText(){
        try {
            if (this.params.text) {
            this.element.innerText(this.params.text);
        }
        } catch (error) {
            console.log("Error")
        }
    }

    setClass() {
        if (this.params.class) {
            this.element.classList.add(...this.params.class);
        }
    }

    setAttr() {
        if (this.params.attr) {
            for (let key in this.params.attr) {
                this.element.setAttribute(key, this.params.attr[key]);
        }
    }
    }

    getElement() {
        return this.element;
    }

}

export default Creator;