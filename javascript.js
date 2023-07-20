// Dom selectors
let body = document.querySelector('body'),
    gridContainer = document.querySelector('.grid-container'),
    newGrid = document.querySelector('.new-grid'),
    gridColumns = document.querySelector('#grid-columns'),
    gridRows = document.querySelector('#grid-rows');

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

// Invoke on load
initializeGrid ();
makeGrid(columns,rows);

// New grid Button 
newGrid.addEventListener("click", () => {
    deleteGrid();

    columns = +gridColumns.value;
    rows = +gridRows.value;

    if ( columns > 64 || rows > 64 ) {
        columns = 64;
        rows = 64;
    }
    initializeGrid();
    makeGrid(columns,rows);
})


