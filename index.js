//! Warning! Below is crappy but partially working code...

let num = '';
let prevSymbol = '';
let arr = [];
const output = document.querySelector('.calc-screen p');
const collectionSpecialActions = document.querySelectorAll('.special_action');
const collectionActions = document.querySelectorAll('.action');
const tumbleweeds = document.querySelector('.tumbleweeds');

function clearAll() {
    num = '';
    arr.length = 0;
    prevSymbol = '';
    output.textContent = '';
    tumbleweeds.classList.remove('hidden');
    initialStylingInactivity();
}

function stylingInactive() {
    collectionSpecialActions.forEach((item, index) => {
        if (index !== 0) {
            item.classList.remove('hover:brightness-125', 'active:brightness-90', 'cursor-pointer');
            item.classList.add('brightness-75', 'cursor-not-allowed');
        }
    })
}

function stylingActive() {
    collectionSpecialActions.forEach((item, index) => {
        if (index !== 0) {
            item.classList.remove('brightness-75', 'cursor-not-allowed');
            item.classList.add('hover:brightness-125', 'active:brightness-90', 'cursor-pointer');
        }
    })
}

function initialStylingInactivity() {
    stylingInactive();
    collectionActions.forEach((item) => {
        item.classList.remove('hover:brightness-125', 'active:brightness-90', 'cursor-pointer');
        item.classList.add('brightness-75', 'cursor-not-allowed');
    })
}

function initialStylingActivity() {
    stylingActive();
    collectionActions.forEach((item) => {
        item.classList.remove('brightness-75', 'cursor-not-allowed');
        item.classList.add('hover:brightness-125', 'active:brightness-90', 'cursor-pointer');
    })
}

initialStylingInactivity();

//!

const calcOperations = (numOne, numTwo, operation) => {
    switch (operation) {
        case "+":
            return bigDecimal.add(numOne, numTwo);
        case "-":
            return bigDecimal.subtract(numOne, numTwo);
        case "*":
            return bigDecimal.multiply(numOne, numTwo);
        case "/":
            return bigDecimal.divide(numOne, numTwo);
    }
}

//!

document.querySelector('.buttons').onclick = (event) => {
    let arrClassList = [...event.target.classList];
    let dataSymbol = event.target.getAttribute('data-symbol');

    if (arrClassList.includes('digit')) { //? Digit check

        if (dataSymbol === '.' && '/*-+'.includes(prevSymbol) || dataSymbol === '.' && num === '' || dataSymbol === '.' && num.includes('.') || num[0] === '0' && num.length === 1 && dataSymbol !== '.') {
            return;
        } else if (dataSymbol === '.') {
            console.log('if (dataSymbol === \'.\')');
            initialStylingInactivity();
        } else {
            console.log('else');
            initialStylingActivity();
        }

        tumbleweeds.classList.add('hidden');

        if (arr.length === 0) {
            num = dataSymbol;
            arr.push(num);
            output.textContent = num;
        } else if (arr.length === 1) {
            num += dataSymbol;
            arr[0] = num;
            output.textContent = num;
        } else if (arr.length === 2) {
            num = dataSymbol;
            arr.push(num);
            output.textContent = num;
        } else if (arr.length === 3) {
            num += dataSymbol;
            arr[2] = num;
            output.textContent = num;
        }
    } else if (arrClassList.includes('action')) { //? Action check

        if (arr.length === 3 && arr[1] === '/' && arr[2].match(/[1-9]/) === null) {
            output.textContent = 'Error!';
            alert('You cannot divide by 0. Try again.');
            setTimeout(clearAll, 1000);
            return;
        }

        if (prevSymbol === '.' || arr.length === 0) return;

        if (dataSymbol !== '=') {
            stylingInactive();
            if (arr.length === 1) {
                arr.push(dataSymbol);
            } else if (arr.length === 2) {
                arr[1] = dataSymbol;
            } else if (arr.length === 3) {
                num = String(Number(calcOperations(arr[0], arr[2], arr[1])));
                output.textContent = num;
                arr.length = 0;
                arr.push(num, dataSymbol);
            }
        } else if (dataSymbol === '=' && arr.length === 3) {
            num = String(Number(calcOperations(arr[0], arr[2], arr[1])));
            output.textContent = num;
            arr.length = 0;
            arr.push(num);
        } else if (dataSymbol === '=' && arr.length !== 3) return;
        num = '';
    } else if (arrClassList.includes('special_action')) { //? Special action check
        if (dataSymbol === 'ac') {
            clearAll();
            return;
        }
        if (arr.length === 1 || arr.length === 3) {
            if (prevSymbol === '.' || +num === 0) return;
            if (dataSymbol === '±') {
                num = bigDecimal.negate(num);
            } else if (dataSymbol === '%') { //TODO 1. Solve the problem with a final result of 0
                num = String(Number(bigDecimal.divide(num, '100')));
            }
            if (arr.length === 1) {
                arr[0] = num;
            } else if (arr.length === 3) {
                arr[2] = num;
            }
        }
        if (num !== '') output.textContent = num;
    }

    if (dataSymbol !== null && dataSymbol !== '=' && dataSymbol !== '±' && dataSymbol !== '%') prevSymbol = dataSymbol;

    console.log(arr, ' | ', prevSymbol);
}

//! A warning! Above is crappy but partially working code...

//TODO 2. Continue testing and entering different operand variants