//! Warning! Below is crappy but working code...

let num = '';
let evalFirstNum = '';
let sign = '';
let arr = [];
const output = document.querySelector('.calc-screen p');
const arrActions = ['/', '*', '-', '+'];
const collectionSpecialActions = document.querySelectorAll('.special_action');
const collectionActions = document.querySelectorAll('.action');

function clearAll() {
    num = '';
    evalFirstNum = '';
    sign = '';
    arr = [];
    output.textContent = '';
    initialStylingInactivity();
}

function divisionAndZero() {
    output.textContent = 'Error!';
    alert('You cannot divide by 0. Try again.');
    setTimeout(clearAll, 1000);

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
initialStylingInactivity()

function initialStylingActivity() {
    stylingActive();
    collectionActions.forEach((item) => {
        item.classList.remove('brightness-75', 'cursor-not-allowed');
        item.classList.add('hover:brightness-125', 'active:brightness-90', 'cursor-pointer');
    })
}

document.querySelector('.buttons').onclick = (event) => {
    let arrClassList = [...event.target.classList];
    let dataSymbol = event.target.getAttribute('data-symbol');

    if (arrClassList.includes('digit')) {
        if (dataSymbol !== '.' && num !== '' || dataSymbol !== '.' && !num.includes('.') || num[0] !== '0' && num.length !== 1 && dataSymbol === '.') {
            initialStylingActivity();
            if (sign !== '' && arr.length !== 0) {
                arr.push(sign);
                sign = '';
            }
            num += dataSymbol;
            output.textContent = num;
        }
    } else if (arrClassList.includes('action')) {
        if (dataSymbol !== '=') {
            if (num !== '') {
                if (num.slice(-1) === '.') return;
                arr.push(num);
                num = '';
                stylingInactive();
            }
            if (arr.length === 3) {
                if (arr[1] === '/' && arr[2] === '0') {
                    divisionAndZero();
                    return;
                } else {
                    evalFirstNum = String(eval(arr.join(' ')));
                    output.textContent = evalFirstNum;
                    arr.splice(0, arr.length, evalFirstNum);
                }
            }
            sign = dataSymbol;
        } else {
            if (num !== '') {
                arr.push(num);
                num = '';
            }
            if (arr[1] === '/' && arr[2] === '0') {
                divisionAndZero();
                return;
            }
            output.textContent = eval(arr.join(' '));
        }
    } else if (arrClassList.includes('special_action')) {
        if (arrActions.includes(sign)) return;
        switch (dataSymbol) {
            case "ac":
                clearAll();
                return;
            case "±": //TODO Doesn't work with total(=). Will be fixed.
                switch (String(Math.sign(num))) {
                    case "1":
                        num = String(-num);
                        output.textContent = num;
                        break;
                    case "-1":
                        num = num.slice(1);
                        output.textContent = num;
                        break;
                }
                break;
            case "%": //TODO Doesn't work with total(=). Will be fixed.
                if (num === '') return;
                num = String(num / 100);
                output.textContent = num;
                break;
        }
    }
}

//! Warning! Above is crappy but working code...