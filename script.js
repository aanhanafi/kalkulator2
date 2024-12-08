document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    let currentInput = '';
    let previousInput = '';
    let operation = null;
    let shouldResetDisplay = false;

    // Keyboard support
    document.addEventListener('keydown', handleKeyPress);

    // Button clicks
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            handleInput(button.dataset.value);
            button.classList.add('active');
            setTimeout(() => button.classList.remove('active'), 100);
        });
    });

    function handleKeyPress(e) {
        e.preventDefault();
        const key = e.key;

        if ((key >= '0' && key <= '9') || key === '.') {
            handleInput(key);
        } else if (key === '+' || key === '-' || key === '*' || key === '/') {
            handleInput(key);
        } else if (key === 'Enter' || key === '=') {
            handleInput('=');
        } else if (key === 'Backspace') {
            handleInput('backspace');
        } else if (key === 'Escape') {
            handleInput('C');
        }
    }

    function handleInput(value) {
        if ((value >= '0' && value <= '9') || value === '.') {
            if (shouldResetDisplay) {
                currentInput = ''; // Reset angka saat ini
                shouldResetDisplay = false;
            }
            if (value === '.' && currentInput.includes('.')) return;
            currentInput += value;
            updateDisplay();
        } else if (value === 'C') {
            clear();
        } else if (value === 'backspace') {
            currentInput = currentInput.slice(0, -1);
            updateDisplay();
        } else if (value === '+' || value === '-' || value === '*' || value === '/') {
            handleOperator(value);
        } else if (value === '=') {
            calculate();
        }
    }

    function handleOperator(op) {
        if (currentInput === '') return; // Abaikan jika tidak ada input saat ini
        if (previousInput !== '') {
            calculate();
        }
        operation = op;
        previousInput = currentInput;
        currentInput = ''; // Kosongkan angka saat ini
        shouldResetDisplay = true;
        updateDisplay();
    }

    function calculate() {
        if (previousInput === '' || currentInput === '') return;

        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    alert('Tidak bisa membagi dengan nol!');
                    clear();
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }

        result = parseFloat(result.toFixed(8));
        currentInput = result.toString();
        operation = null;
        previousInput = '';
        shouldResetDisplay = true;
        updateDisplay();
    }

    function updateDisplay() {
        if (operation && shouldResetDisplay) {
            // Tampilkan hanya angka sebelumnya dan operator
            display.value = `${previousInput} ${operation}`;
        } else if (operation) {
            // Tampilkan angka sebelumnya, operator, dan angka saat ini
            display.value = `${previousInput} ${operation} ${currentInput}`;
        } else {
            // Tampilkan hanya angka saat ini
            display.value = currentInput || '0';
        }
    }

    function clear() {
        currentInput = '';
        previousInput = '';
        operation = null;
        updateDisplay();
    }
});
