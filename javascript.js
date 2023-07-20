// Dom selectors
let body = document.querySelector('body'),
    gridContainer = document.querySelector('.grid-container'),
    newGrid = document.querySelector('.new-grid'),
    gridColumns = document.querySelector('#grid-columns'),
    gridRows = document.querySelector('#grid-rows'),
    colorPck = document.querySelector('#color-pick'),
    clickToggle = false;

// Variables
let columns = 16, rows = 16, grid = [];

// Initialize Array for grid
function initializeGrid () {
    for (let i = 0; i < rows; i++) {
        grid[i] = [];
}
}

// Delete Grid and Grid Array 
function deleteGrid () {
    gridContainer.innerHTML = '';
}

// Make Grid 
function makeGrid (columns, rows) {
    for (let i = 0; i < rows; i++) {
        let divContainer = document.createElement("div");
        divContainer.classList.add('div-container');
        gridContainer.appendChild(divContainer);
        for (let j = 0; j < columns; j++) {
            grid[i][j] = document.createElement('div');
            let newDiv = grid[i][j];
            newDiv.classList.add('square');
            divContainer.appendChild(newDiv);
        }
    }
}

function makeGridHover () {
    let squares = document.querySelectorAll('.square')
    squares.forEach(addGridHover);
}

function addGridHover (square) {
    square.addEventListener("mousedown", (e) => {
        clickToggle = true;
    })
    square.addEventListener("mouseup", (e) => {
        clickToggle = false;
    })
    square.addEventListener("dragstart", (e) => {
        e.preventDefault();
    })
    square.addEventListener("drop", (e) => {
        e.preventDefault();
    })

    square.addEventListener("click", (e) => {
        e.target.style.backgroundColor = "red";
    })
    square.addEventListener("mousemove", (e) => {
        if (clickToggle == true) {
            e.target.style.backgroundColor = "red";
        }
    })
    square.addEventListener("contextmenu", (e) => {
        e.target.style.backgroundColor = "white";
        e.preventDefault();
    })
}

// Invoke on load
initializeGrid ();
makeGrid(columns,rows);
makeGridHover();

// New grid Button 
newGrid.addEventListener("click", () => {
    deleteGrid();

    columns = +gridColumns.value;
    rows = +gridRows.value;

    if ( columns > 64 || rows > 64 ) {
        columns = 64;
        rows = 64;
    }

    if (columns == 0 || rows == 0) {
        columns = 16;
        rows = 16;
    }

    initializeGrid();
    makeGrid(columns,rows);
    makeGridHover();
})


