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

// Algo finished, but docs still under construction

// function compareRow: compares two rows and outputs an object containing the number of
// pegs that are the same in color and position, and the number
// of pegs that are the same in color only

const compareRow = (row1, row2) => {
    if (row1.length !== row2.length) {
        console.log('Array error');
        return;
    }
    // Indices where row1[index] has been matched, with the only exceptions at
    // locations which will not be accessed again because the outer loop has
    // passed them
    const a = [];
    // Indices where row2[index] has been matched with a value in a different index
    // in row 1
    const b = [];
    // Number of pegs with correct color and position
    let correctColorAndPosition = 0;
    // Number of pegs with correct color but incorrect poistion
    let correctColorNotPosition = 0;

    // Find matching color and position
    for (let i = 0; i < row1.length; i++) {
        if (row1[i] == row2[i]) {
            correctColorAndPosition++;
            a.push(i);
            continue;
        }
    }

    // Find matching color but not position
    for (let i = 0; i < row1.length; i++) {
        if (a.includes(i)) {
            continue;
        }
            for (let j = 0; j < row2.length; j++) {
                if (a.includes(j) || b.includes(j)) {
                    continue;
                }
                if (row1[i] === row2[j]) {
                    b.push(j);
                    correctColorNotPosition++;
                    break;
                }
            }
    }

    if (correctColorAndPosition + correctColorNotPosition > row1.length) {
        console.log('error');
        return;
    }
    return {
        correctColorAndPosition: correctColorAndPosition,
        correctColorNotPosition: correctColorNotPosition
    }
}

// to be replaced with while
// The main loop
for (let i = 0; i < 20; i++) {
    const colorString = prompt('Select four colors:');
    let row;
    if (debug) {
        row = colorString.split('').map((x) => debugVars.abbr[x]);
    }
    let sameArray = compareRow(row, secretRow);
    if (debug) {
        console.log(sameArray);
    }
    if (sameArray.correctColorAndPosition === 4) {
        console.log('you win');
        break;
    }

    // The board has 12 rows
    if (i === 12) {
        console.log('you lose');
        break;
    }
    i++;
}