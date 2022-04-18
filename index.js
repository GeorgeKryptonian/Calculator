//! A warning! Below is some crappy but partially working code (lots of redundancy and duplication) that needs refactoring...

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

const calcOperations = (numOne, numTwo, operation) => {
    switch (operation) {
        case "+":
            return bigDecimal.add(numOne, numTwo);
        case "-":
            return bigDecimal.subtract(numOne, numTwo);
        case "*":
            return bigDecimal.multiply(numOne, numTwo);
        case "/":
            //! It works crookedly here...
            return bigDecimal.divide(numOne, numTwo, (numOne + numTwo).length);
    }
}

document.querySelector('.buttons').onclick = (event) => {
    let arrClassList = [...event.target.classList];
    let dataSymbol = event.target.getAttribute('data-symbol');

    if (arrClassList.includes('digit')) { //? Digit check

        if (dataSymbol === '.' && '/*-+'.includes(prevSymbol) || dataSymbol === '.' && num === '' || dataSymbol === '.' && num.includes('.') || num[0] === '0' && num.length === 1 && dataSymbol !== '.') {
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
                if (arr[0].includes('.')) {
                    num = arr[0] = arr[0].replace(/0*$/, "");
                    if (arr[0].slice(-1) === '.') num = arr[0] = arr[0].slice(0, -1);
                }
                arr.push(dataSymbol);
            } else if (arr.length === 2) {
                arr[1] = dataSymbol;
            } else if (arr.length === 3) {
                if (arr[2].includes('.')) {
                    num = arr[2] = arr[2].replace(/0*$/, "");
                    if (arr[2].slice(-1) === '.') num = arr[2] = arr[2].slice(0, -1);
                }

                num = calcOperations(arr[0], arr[2], arr[1]);
                arr.length = 0;
                arr.push(num, dataSymbol);

                if (arr[0].includes('.')) {
                    num = arr[0] = arr[0].replace(/0*$/, "");
                    if (arr[0].slice(-1) === '.') num = arr[0] = arr[0].slice(0, -1);
                }

                output.textContent = num;
            }
        } else if (dataSymbol === '=' && arr.length === 3) {
            if (arr[2].includes('.')) {
                num = arr[2] = arr[2].replace(/0*$/, "");
                if (arr[2].slice(-1) === '.') num = arr[2] = arr[2].slice(0, -1);
            }

            num = calcOperations(arr[0], arr[2], arr[1]);
            arr.length = 0;
            arr.push(num);

            if (arr[0].includes('.')) {
                num = arr[0] = arr[0].replace(/0*$/, "");
                if (arr[0].slice(-1) === '.') num = arr[0] = arr[0].slice(0, -1);
            }

            output.textContent = num;
        } else if (dataSymbol === '=' && arr.length !== 3) return;
    } else if (arrClassList.includes('special_action')) { //? Special action check
        if (dataSymbol === 'ac') {
            clearAll();
            return;
        }

        if (arr.length === 1 || arr.length === 3) {
            if (prevSymbol === '.' || +num === 0) return;

            if (dataSymbol === '±') {
                if (arr.length === 1) {
                    num = arr[0] = bigDecimal.negate(arr[0]);
                } else if (arr.length === 3) {
                    num = arr[2] = bigDecimal.negate(arr[2]);
                }
            }

            if (dataSymbol === '%') {
                if (arr.length === 1) {
                    if (arr[0].includes('.')) {
                        num = arr[0] = bigDecimal.divide(arr[0], '100', arr[0].length);
                    } else {
                        num = arr[0] = bigDecimal.divide(arr[0], '100');
                    }
                } else if (arr.length === 3) {
                    if (arr[2].includes('.')) {
                        num = arr[2] = bigDecimal.divide(arr[2], '100', arr[2].length);
                    } else {
                        num = arr[2] = bigDecimal.divide(arr[2], '100');
                    }
                }
            }

            if (arr.length === 1 && arr[0].includes('.')) {
                num = arr[0] = arr[0].replace(/0*$/, "");
                if (arr[0].slice(-1) === '.') num = arr[0] = arr[0].slice(0, -1);
            }

            if (arr.length === 3 && arr[2].includes('.')) {
                num = arr[2] = arr[2].replace(/0*$/, "");
                if (arr[2].slice(-1) === '.') num = arr[2] = arr[2].slice(0, -1);
            }

            if (num !== '') output.textContent = num;
        }
    }

    if (dataSymbol !== null && dataSymbol !== '=' && dataSymbol !== '±' && dataSymbol !== '%') prevSymbol = dataSymbol;

    // console.log(arr);
}

//! A warning! Above is some crappy but partially working code (lots of redundancy and duplication) that needs refactoring...

//TODO Continue testing and entering different operand variants...