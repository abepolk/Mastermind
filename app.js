
///////// Debug

const debug = false;

// This is not used right now
const debugVars = {}
if (debug) {
    debugVars.secretRow = ['red', 'orange', 'blue', 'red'];
    debugVars.abbr = {
        r: 'red',
        o: 'orange',
        y: 'yellow',
        g: 'green',
        b: 'blue',
        x: 'black'
    }
}



// const rows = [];

///////////////// Matching algorithm

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

///////////////// DOM Functions

const addColorElement = (color) => {
    // Get a vanilla JS array of arrays containing the colors on the board.
    // This needs to be changed or made into a function
    const rows = $('#main-row-container').children().get().map((row) => {
        return $(row).children().get().map((cell) => {
            return $(cell).attr('color');
        });
    });
    // Update the DOM with the new color on the correct cell
    outer:
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[0].length; j++) {
            if (rows[i][j] === 'empty') {
                $('#main-row-container').children().eq(i).children().eq(j).attr('color', color);
                break outer;
            }
        }
    }
}

const getCurrentRow = () => {
    // Get a vanilla JS array of arrays containing the colors on the board.
    // This needs to be changed or made into a function
    const rows = $('#main-row-container').children().get().map((row) => {
        return $(row).children().get().map((cell) => {
            return $(cell).attr('color');
        });
    });
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].includes('empty') || i === rows.length - 1 || rows[i + 1][0] === 'empty') {
            return [rows[i], i];
        }
    }
    console.log('getCurrentRow error');
}

const revealSecret = () => {
    const $secretRow = $('#secret-row');
    $secretRow.children().each((index, $elem) => {
        $elem.attr('color', secretRow[index]);
    })
}

const displayResults = (resultsArray, currentRowIndex) => {
        const NUM_ROWS = 12;
        const NUM_COLS = 4;
        if (resultsArray.correctColorAndPosition === NUM_COLS) {
            $('#message-display').text('You win!');
            revealSecret();
            return;
        }
        if (currentRowIndex === NUM_ROWS - 1) {
            $('#message-display').text('You lose!');
            revealSecret();
            return;
        }
    console.log(resultsArray)
}

///////////////////
// TODO make this random
const secretRow = ['red', 'orange', 'blue', 'red'];

////////////////// Button Event Handler

$('.button').on('click', null, secretRow, (event) => {
    const secretRow = event.data;
    const color = $(event.target).text();
    // This function must update the DOM board and DOM "choice display"
    addColorElement(color);
    const [currentRow, currentRowIndex] = getCurrentRow();
    // length probably needs to be changed for jQuery
    if (!currentRow.includes('empty')) {
        const resultsArray = compareRow(currentRow, secretRow);
        console.log(currentRow);
        displayResults(resultsArray, currentRowIndex);
    }
});

// TODO empty -> no color
// TODO set function at line 91 for add color to dom elem