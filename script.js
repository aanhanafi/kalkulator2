let display = document.getElementById("display");

function appendToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = "Error";
    }
}

// Menambahkan event listener untuk mendeteksi input dari keyboard
document.addEventListener("keydown", function(event) {
    const key = event.key;
    
    // Jika tombol angka atau operator ditekan
    if ((key >= '0' && key <= '9') || key === '+' || key === '-' || key === '*' || key === '/' || key === '.') {
        appendToDisplay(key);
    }
    
    // Jika Enter ditekan, lakukan perhitungan
    if (key === 'Enter') {
        event.preventDefault();  // Mencegah form submit jika ada
        calculate();
    }
    
    // Jika Backspace ditekan, hapus karakter terakhir
    if (key === 'Backspace') {
        deleteLast();
    }
    
    // Jika Escape ditekan, clear display
    if (key === 'Escape') {
        clearDisplay();
    }
});
