console.log("hello world");

const debug = true;
const debugVars = {}

let secretRow;

if (debug) {
    secretRow = ['red', 'orange', 'blue', 'red'];
    debugVars.abbr = {
        r: 'red',
        o: 'orange',
        y: 'yellow',
        g: 'green',
        b: 'blue',
        x: 'black'
    }
}

const rows = [];

// Arrays must be same size
const compareArray = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
        console.log('Array error');
        return;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

// The board has 12 rows
let i = 0
// to be replaced with while
for (let i = 0; i < 20; i++) {
    const colorString = prompt('Select four colors:');
    let row;
    if (debug) {
        row = colorString.split('').map((x) => debugVars.abbr[x]);
    }
    let sameArray = compareArray(row, secretRow);
    if (sameArray) {
        console.log('you win');
        break;
    }
    if (i === 12) {
        console.log('you lose');
        break;
    }
    i++;
}