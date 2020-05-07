//////////////////////////////////// Global constants

const NUM_ROWS = 12;
const NUM_COLS = 4;

//////////////////////////////// Matching Algorithm

// Algo finished, but docs still under construction

// function compareRow: compares two rows and outputs an object containing the number of
// pegs that are the same in color and position, and the number
// of pegs that are the same in color only

const compareRow = (row1, row2) => {
    if (row1.length !== row2.length) {
        console.error('Array error');
        return;
    }
    // Indices where row1[index] has been matched with row2[index] at the same location
    const bothMatchIndices = [];
    // Indices where row2[index] has been matched with a value in a different index in row1.
    const colorOnlyMatches = [];
    // Number of pegs with correct color and position
    let correctColorAndPosition = 0;
    // Number of pegs with correct color but incorrect poistion
    let correctColorNotPosition = 0;

    // Find matching color and position
    for (let i = 0; i < row1.length; i++) {
        if (row1[i] == row2[i]) {
            correctColorAndPosition++;
            bothMatchIndices.push(i);
            continue;
        }
    }
    // Find matching color but not position
    for (let i = 0; i < row1.length; i++) {
        if (bothMatchIndices.includes(i)) {
            continue;
        }
        for (let j = 0; j < row2.length; j++) {
            if (bothMatchIndices.includes(j) || colorOnlyMatches.includes(j)) {
                continue;
            }
            if (row1[i] === row2[j]) {
                colorOnlyMatches.push(j);
                correctColorNotPosition++;
                break;
            }
        }
    }
    if (correctColorAndPosition + correctColorNotPosition > row1.length) {
        console.error('error');
        return;
    }
    return {
        correctColorAndPosition: correctColorAndPosition,
        correctColorNotPosition: correctColorNotPosition
    }
}

/////////////////////////////////// DOM Functions

const convertDomRowsTo2dArray = () => {
    // Get a vanilla JS array of arrays containing the colors on the board.
    return $('#main-row-container').children().get().map((row) => {
        return $(row).children('.cell').get().map((cell) => {
            return $(cell).attr('color');
        });
    });
}

const addColorElement = (color) => {
    const arr = convertDomRowsTo2dArray();
    // Update the DOM with the new color on the correct cell
    outer:
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
            if (arr[i][j] === 'empty') {
                $('#main-row-container').children().eq(i).children('.cell').eq(j).attr('color', color);
                break outer;
            }
        }
    }
}

const getCurrentRow = () => {
    const arr = convertDomRowsTo2dArray();
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].includes('empty') || i === arr.length - 1 || arr[i + 1][0] === 'empty') {
            return [arr[i], i];
        }
    }
    console.error('getCurrentRow error');
}

const revealSecret = () => {
    const $secretRow = $('#secret-row');
    $secretRow.children('.cell').each((index, elem) => {
        $(elem).attr('color', secretRow[index]);
    })
}

const displayResults = (resultsArray, currentRowIndex) => {
    for (let i = 0; i < NUM_COLS; i++) {
        let color = "empty";
        if (i < resultsArray.correctColorAndPosition) {
            color = "red";
        } else if (i < resultsArray.correctColorAndPosition + resultsArray.correctColorNotPosition) {
            color = "white";
        }
        $('#main-row-container').children().eq(currentRowIndex).find('.results-cell').eq(i).attr('color', color);
    }
    if (resultsArray.correctColorAndPosition === NUM_COLS) {
        const $message = $('<h1>').text('You win!');
        $('#message-display').append($message);
        revealSecret();
        return;
    }
    if (currentRowIndex === NUM_ROWS - 1) {
        const $message = $('<h1>').text('You lose!');
        $('#message-display').append($message);
        revealSecret();
        return;
    }
}

////////////////////////// Dynamic cell generation

const generateMainCells = () => {
    for (let i = 0; i < NUM_ROWS; i++) {
        const $row = $('<div>').addClass('row');
        for (let i = 0; i < NUM_COLS; i++) {
            const $cell = $('<div>').addClass('cell').attr('color', 'empty'); // Must add attr color here?
            $row.append($cell);
        }
        const $resultsCellContainer = $('<div>').addClass('results-cell-container');
        const $resultsBox = $('<div>').addClass('results-box')
        for (let i = 0; i < 4; i++) {
            const $resultsCell = $('<div>').addClass('results-cell');
            $resultsBox.append($resultsCell);
        }
        $resultsCellContainer.append($resultsBox);
        $row.append($resultsCellContainer);
        $('#main-row-container').append($row);
    }
}

/////////////////////// Generate secret code

const generateSecretRow = () => {
    const colors = $('.button').get().map((button) => $(button).text());
    const secretRow = [];
    for (let i = 0; i < NUM_COLS; i++) {
        secretRow.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    return secretRow;
}

//////////////////////////////// Initialize game

generateMainCells();
const secretRow = generateSecretRow();

//////////////////////////// Button Event Handler

// Pass in secretRow as data on the event.
$('.button').on('click', null, secretRow, (event) => {
    const secretRow = event.data;
    const color = $(event.target).text();
    addColorElement(color);
    const [currentRow, currentRowIndex] = getCurrentRow();
    if (!currentRow.includes('empty')) {
        const resultsArray = compareRow(currentRow, secretRow);
        console.log(currentRow);
        displayResults(resultsArray, currentRowIndex);
    }
});