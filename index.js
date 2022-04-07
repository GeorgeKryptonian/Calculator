//! Warning! Below is crappy but working code...

let num = '';
let evalFirstNum = '';
let sign = '';
let prevSymbol = '';
let arr = [];
const output = document.querySelector('.calc-screen p');
const arrActions = ['/', '*', '-', '+'];
const collectionSpecialActions = document.querySelectorAll('.special_action');
const collectionActions = document.querySelectorAll('.action');

function clearAll() {
    num = '';
    evalFirstNum = '';
    sign = '';
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
                } else {
                    num = String(eval(arr.join(' ')));
                    if (num.includes('.')) {
                        num = String(+num + Number.EPSILON); //TODO Test with negative numbers.
                        num = num.slice(0, Math.max(...(arr.map(function (item) {
                            return item.length;
                        }))))
                    }

                    output.textContent = num;
                    arr.length = 0;
                    arr.push(num, dataSymbol);
                }
            }
        } else if (dataSymbol === '=' && arr.length === 3) {
            if (arr[1] === '/' && arr[2] === '0') {
                divisionAndZero();
            } else {
                num = String(eval(arr.join(' ')));
                if (num.includes('.')) {
                    num = String(+num + Number.EPSILON); //TODO Test with negative numbers.
                    num = num.slice(0, Math.max(...(arr.map(function (item) {
                        return item.length;
                    }))))
                }

                output.textContent = num;
                arr.length = 0;
                arr.push(num);
            }
        }
    } else if (arrClassList.includes('special_action')) { //? Special action check
        switch (dataSymbol) {
            case "ac":
                clearAll();
                break;
        }

        //! ↓ Rewrite special actions ↓
        // if (arrActions.includes(sign)) return;
        // switch (dataSymbol) {
        //     case "ac":
        //         clearAll();
        //         return;
        //     case "±": //TODO Doesn't work with total(=). Will be fixed.
        //         switch (String(Math.sign(num))) {
        //             case "1":
        //                 num = String(-num);
        //                 output.textContent = num;
        //                 break;
        //             case "-1":
        //                 num = num.slice(1);
        //                 output.textContent = num;
        //                 break;
        //         }
        //         break;
        //     case "%": //TODO Doesn't work with total(=). Will be fixed.
        //         if (num === '') return;
        //         num = String(num / 100);
        //         output.textContent = num;
        //         break;
        // }
    }

    if (dataSymbol !== null && dataSymbol !== '=') prevSymbol = dataSymbol;

    console.log(arr, ' | ', prevSymbol);
}

//! Warning! Above is crappy but working code...