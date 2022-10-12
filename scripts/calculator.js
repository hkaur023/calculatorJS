const Buttons = ['1','2','3','+','4','5','6','-','7','8','9','*','AC','0','=','/']
const Operators = ['+','-','*','/'];

class Calcultor {
    constructor() {
        this.currentOperator;
        this.operatorPressed= false;
        this.expression = '';
    }

    clear (ele) {
        ele.innerHTML = '0';
        this.currentOperator = undefined;
        this.expression = '';
    }

    equals(ele) {
        this.expression = `${this.expression}${ele.innerHTML}`;
        if (!Operators.includes(this.expression.charAt(this.expression.length-1))) {
            ele.innerHTML = eval(this.expression);
            this.expression = '';
            this.currentOperator = undefined;
            this.operatorPressed = true;
        }
    }

    operatorPress(ele, value) {
        this.currentOperator = value;
        this.operatorPressed = true;
        this.expression += `${this.expression}${ele.innerHTML}${this.currentOperator}`;
    }

    numberPress (ele, value) {
        if (this.operatorPressed || ele.innerHTML === '0') {
            this.operatorPressed = false;
            ele.innerHTML = value
        } else {
            ele.innerHTML = `${ele.innerHTML}${value}`; 
        }
    }
}

function createCalculator() {
    const C = new Calcultor;
    let containerElm = document.querySelector('div.container');
    let numValue = document.createElement('div');
    numValue.innerHTML = '0';
    numValue.classList.add('expInput');
    containerElm.append(numValue);

    Buttons.forEach(btn => {
        let button = document.createElement('button');
        button.innerHTML = btn;
        button.value = btn;
        button.classList.add('numBtn')

        button.addEventListener('click', function() {
            if (button.value === 'AC') {
                C.clear(numValue);
            } else if (button.value == '=') {
                if (!this.operatorPressed) {
                   C.equals(numValue); 
                }
            } else {
                if (Operators.includes(button.value)){
                    C.operatorPress(numValue, button.value);
                } else {
                    C.numberPress(numValue, button.value);
                }
            }
        })
        containerElm.append(button);
    });
}

window.addEventListener('load', () => {
    createCalculator();
});
