const buttons = document.querySelectorAll('button');

const display = document.querySelector('.display-input');
const result_screen = document.querySelector('.result-screen');


const calculator = {

    currentOperand: '',
    previousOperand: '',
    operation: null,
    operation_checker: null,


    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        result_screen.textContent = 'Have a nice day.';
        this.operation = null;
        display.style.fontSize = '1.5em';
    },

    backspace() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    },

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    },

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.calculate();
        }
        if (operation != null) {
            this.calculate();
        }
        this.operation = operation;

        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    },

    calculate() {
        let result;
        // Convert string operands to numbers for calculation
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        // Don't do anything if the numbers aren't valid
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '%':
                result = prev % current;
                break;
            case '/':

                if (current === 0) {
                    alert("You can't divide by zero!");
                    this.clear();
                    return;
                }
                result = prev / current;
                break;

            default:
                return;
        }


        result_screen.textContent = result.toString();
        this.currentOperand = result.toString();
        this.operation = null;
        this.previousOperand = '';

    },
    adjustFontSize() {

        while (display.scrollWidth > display.clientWidth) {
            const currentSize = parseFloat(window.getComputedStyle(display).fontSize);
            display.style.fontSize = `${currentSize - 1}px`;
        }
    },

    updateDisplay() {
        if (this.operation != null) {
            display.textContent = `${this.previousOperand} ${this.operation} ${this.currentOperand}`;
        }

        else {

            display.textContent = this.currentOperand === '' ? '0' : this.currentOperand;
        }

        this.adjustFontSize();
    }
};


buttons.forEach(button => {
    button.addEventListener('click', () => {
        const { value, type } = button.dataset;


        switch (type) {
            case 'number':
                calculator.currentOperand += value;
                break;
            case 'decimal':
                calculator.appendNumber(value);
                break;
            case 'operator':
                calculator.chooseOperation(value);
                break;
            case 'equals':
                calculator.calculate();
                break;
            case 'clear':
                calculator.clear();
                break;
            case 'backspace':
                calculator.backspace();
                break;
        }


        calculator.updateDisplay();
    });
});

window.addEventListener('keydown', (event) => {
    const button = document.querySelector(`button[data-value="${event.key}"]`);


    if (button) {
        button.click();
        return;
    }


    if (event.key === 'Enter') {
        document.querySelector('#equal').click();
    }
    if (event.key === 'Backspace') {
        document.querySelector('.back').click();
    }
    if (event.key === 'Escape') {
        document.querySelector('.AC').click();
    }
});