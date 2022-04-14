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

const mathNum = (number) => parseFloat(number.toPrecision(15));

const numDigitsLength = () => num.split('').filter(item => item !== '.' && item !== '-').length;

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

document.querySelector('.buttons').onclick = (event) => {
    let arrClassList = [...event.target.classList];
    let dataSymbol = event.target.getAttribute('data-symbol');

    if (arrClassList.includes('digit')) { //? Digit check
        if (dataSymbol === '.' && '/*-+'.includes(prevSymbol) || dataSymbol === '.' && num === '' || dataSymbol === '.' && num.includes('.') || num[0] === '0' && num.length === 1 && dataSymbol !== '.') {
            return;
        } else if ('/*-+'.includes(prevSymbol)) {
            num = '';
        } else if (numDigitsLength() === 16) {
            alert('The limit of 16 digits has been reached. Try to select an operation.');
            return;
        } else if (dataSymbol === '.') {
            initialStylingInactivity();
        } else {
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
        if (arr[1] === '/' && arr[2].match(/[1-9]/) === null) {
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
                if (arr[0].includes('.') && arr[2].includes('.')) { //TODO 1. Fix code duplication (if it is possible)
                    num = String(mathNum(eval(arr.join(' '))));
                    //
                } else {
                    num = String(eval(arr.join(' ')));
                }
                output.textContent = num;
                arr.length = 0;
                arr.push(num, dataSymbol);
            }
        } else if (dataSymbol === '=' && arr.length === 3) {
            if (arr[0].includes('.') && arr[2].includes('.')) { //TODO 1. Fix code duplication (if it is possible)
                num = String(mathNum(eval(arr.join(' '))));

            } else {
                num = String(eval(arr.join(' ')));
            }
            output.textContent = num;
            arr.length = 0;
            arr.push(num);
        } else if (dataSymbol === '=' && arr.length !== 3) return;
        // num = '';
    } else if (arrClassList.includes('special_action')) { //? Special action check
        switch (dataSymbol) {
            case "ac":
                clearAll();
                return;
            case "±":
                if (arr.length === 2) return;
                if (num > 0) {
                    num = String(-num);
                } else if (num < 0) {
                    num = num.slice(1);
                }
                break;
            case "%":
                if (num === '' || prevSymbol === '.' || '/*-+'.includes(prevSymbol)) return;
                num = String(num / 100);
                break;
        }
        if (numDigitsLength() >= 16) {
            num = String(mathNum(Number(num)));
        }
        if (arr.length === 1) {
            arr[0] = num;
        } else if (arr.length === 3) {
            arr[2] = num;
        }
        if (num !== '') output.textContent = num;
    }

    if (dataSymbol !== null && dataSymbol !== '=' && dataSymbol !== '±' && dataSymbol !== '%') prevSymbol = dataSymbol;

    console.log(arr, ' | ', prevSymbol);
}

//! A warning! Above is crappy but partially working code...

//TODO 3. Continue testing and entering different operand variants