//! Warning! Below is crappy but partially working code...

let num = '';
let prevSymbol = '';
let arr = [];
const output = document.querySelector('.calc-screen p');
const collectionSpecialActions = document.querySelectorAll('.special_action');
const collectionActions = document.querySelectorAll('.action');

function clearAll() {
    num = '';
    arr.length = 0;
    prevSymbol = '';
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
        if (dataSymbol === '.' && num === '' || dataSymbol === '.' && num.includes('.') || num[0] === '0' && num.length === 1 && dataSymbol !== '.') {
            return;
        } else if (dataSymbol === '.') {
            initialStylingInactivity();
        } else {
            initialStylingActivity();
        }
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
        if (dataSymbol !== '=') {
            if (prevSymbol === '.') return;
            stylingInactive();
            if (arr.length === 1) {
                arr.push(dataSymbol);
                // output.textContent = dataSymbol;
            } else if (arr.length === 2) {
                arr[1] = dataSymbol;
                // output.textContent = dataSymbol;
            } else if (arr.length === 3) {
                if (arr[1] === '/' && arr[2] === '0') {
                    divisionAndZero();
                    return;
                }
                //TODO 1. Fix the problem with negative numbers | FOR ( + - * / ) ====================================
                num = String(eval(arr.join(' ')));
                if (arr.join('').includes('.')) {
                    if (num.includes('.')) {
                        if (arr[0] < 0 && arr[2] < 0) {
                            num = String(+num - Number.EPSILON);
                        } else {
                            num = String(+num + Number.EPSILON);
                        }
                        num = num.slice(0, Math.max(...(arr.map(function (item) {
                            return item.length;
                        }))))
                    }
                }
                output.textContent = num;
                arr.length = 0;
                arr.push(num, dataSymbol);
                //TODO END ====================================
            }
        } else if (dataSymbol === '=' && arr.length === 3) {
            if (arr[1] === '/' && arr[2] === '0') {
                divisionAndZero();
                return;
            }
            //TODO 2. Fix the problem with negative numbers | FOR ( = ) ====================================
            num = String(eval(arr.join(' ')));
            if (arr.join('').includes('.')) {
                if (num.includes('.')) {
                    if (arr[0] < 0 && arr[2] < 0) {
                        num = String(+num - Number.EPSILON);
                    } else {
                        num = String(+num + Number.EPSILON);
                    }
                    num = num.slice(0, Math.max(...(arr.map(function (item) {
                        return item.length;
                    }))))
                }
            }
            output.textContent = num;
            arr.length = 0;
            arr.push(num);
            //TODO END ====================================
        } else if (dataSymbol === '=' && arr.length !== 3) return;
        num = '';
    } else if (arrClassList.includes('special_action')) { //? Special action check
        switch (dataSymbol) {
            case "ac":
                clearAll();
                return;
            case "±":
                if (arr.length === 2) return;
                if (num > 0) {
                    num = String(-num);
                } else  if (num < 0) {
                    num = num.slice(1);
                }
                break;
            case "%":
                if (num === '' || prevSymbol === '.') return;
                num = String(num / 100);
                break;
        }
        if (arr.length === 1) {
            arr[0] = num;
        } else if (arr.length === 3) {
            arr[2] = num;
        }
        output.textContent = num;
    }

    if (dataSymbol !== null && dataSymbol !== '=' && dataSymbol !== '±' && dataSymbol !== '%') prevSymbol = dataSymbol;

    console.log(arr, ' | ', prevSymbol);
}

//! A warning! Above is crappy but partially working code...

//TODO 3. Continue testing and entering different operand variants