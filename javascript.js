// Dom selectors
let body = document.querySelector('body'),
    gridContainer = document.querySelector('.grid-container'),
    newGrid = document.querySelector('.new-grid'),
    gridColumns = document.querySelector('#grid-columns'),
    gridRows = document.querySelector('#grid-rows'),
    colorPick = document.querySelector('#new-color-pick'),
    erasePick = document.querySelector('#erase-color-pick'),
    all = document.querySelector('.all'),
    colorValue = colorPick.value,
    eraseValue = erasePick.value,
    clickToggle = false,
    altClickToggle = false;

// Variables
let columns = 16, rows = 16, grid = [];

// Color pick change 
colorPick.addEventListener("input", (e) => {
    colorValue = colorPick.value;
    newGrid.style.background = `linear-gradient(${colorValue} 50%, ${eraseValue})`;
})

erasePick.addEventListener("input", (e) => {
    eraseValue = erasePick.value;
    newGrid.style.background = `linear-gradient(${colorValue}, ${eraseValue})`;
})

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
        if (e.buttons == 2) {
            altClickToggle = true;
        }
        else {
            clickToggle = true;
        }
    })
    square.addEventListener("mouseup", (e) => {
        altClickToggle = false;
        clickToggle = false;
    })
    square.addEventListener("dragstart", (e) => {
        e.preventDefault();
    })
    square.addEventListener("drop", (e) => {
        e.preventDefault();
    })

    square.addEventListener("click", (e) => {
        e.target.style.backgroundColor = colorValue;
    })
    square.addEventListener("mousemove", (e) => {
        if (clickToggle == true) {
            e.target.style.backgroundColor = colorValue;
        }
        else if (altClickToggle == true) {
            e.target.style.backgroundColor = eraseValue;
        }
    });

    square.addEventListener("contextmenu", (e) => {
        e.target.style.backgroundColor = eraseValue;
        e.preventDefault();
    })

    gridContainer.addEventListener("mouseleave", (e) => {
        clickToggle = false;
        altClickToggle = false;
    })
}

// Invoke on load
initializeGrid ();
makeGrid(columns,rows);
makeGridHover();

// New grid Button 
newGrid.addEventListener("click", () => {
    deleteGrid();

    columns = gridColumns.value;
    rows = gridRows.value;

    // console.log(typeof columns);
    // console.log(typeof rows);

    if ( columns > 64 || rows > 64 ) {
        columns = 64;
        rows = 64;
    }

    if (columns <= 0 || rows <= 0 ) {
        columns = 16;
        rows = 16;
    }

    initializeGrid();
    makeGrid(columns,rows);
    makeGridHover();
})

// Make Undraggable and Un-contextmenu-able
all.addEventListener("dragstart", (e) => {
    e.preventDefault();
})
all.addEventListener("drop", (e) => {
    e.preventDefault();
})

all.addEventListener("contextmenu", (e) => {
    e.preventDefault();
})
