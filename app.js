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

// compareRow: compares two rows and outputs an object containing the number of
// pegs that are the same in color and position, and the the number
// of pegs that are the same in color only

// Algo under construction

/*
const compareRow = (row1, row2) => {
    if (row1.length !== row2.length) {
        console.log('Array error');
        return;
    }
    // Row indices where the pegs are the same color
    const matchingIndices = [];
    // Number of pegs with correct position and color
    let correctColorAndPosition = 0;
    let correctColorNotPosition = 0;
    for (let i = 0; i < row1.length; i++) {
        if (row1[i] == row2[i]) {
            correctColorAndPosition++;
            matchingIndices.push(i);
            continue;
        }
        for (let j = 0; j < row2.length; j++) {
            
        }
    }
  // Doubly commented block begin
    for (let i = 0; i < row1.length; i++) {
        if (matchingIndices.includes(i)) {
            continue;
        }
        if (!matchingIndices.includes(i)) {
            for (let j = 0; j < row2.length; j++) {
                // We know at this point that if i === j, then we do not increment
                // because the arrays do not match at this index
                if (row1[i] === row2[j]) {
                    console.log(`${i} ${j}`)
                    correctColorNotPosition++;
                    // PUT THIS INTO WORDS AND MAKE IT MATCH AS CLOSELY AS POSSIBLE
                }
            }
        }
    }
    // Doubly commented block end
    if (correctColorAndPosition + correctColorNotPosition > 4) {
        console.log('error');
        return;
    }
    return {
        correctColorAndPosition: correctColorAndPosition,
        correctColorNotPosition: correctColorNotPosition
    }
}

*/

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