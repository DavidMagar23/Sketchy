// Dom selectors
let body = document.querySelector('body'),
    gridContainer = document.querySelector('.grid-container'),
    newGrid = document.querySelector('.new-grid'),
    gridColumns = document.querySelector('#grid-columns'),
    gridRows = document.querySelector('#grid-rows'),
    colorPick = document.querySelector('#new-color-pick'),
    erasePick = document.querySelector('#erase-color-pick'),
    rainbowPick = document.querySelector('.rainbow-container'),
    all = document.querySelector('.all'),
    colorValue = colorPick.value,
    eraseValue = erasePick.value,
    clickToggle = false,
    altClickToggle = false,
    rainbowToggle = false,
    rainbowClicked = false,
    rainbowPressed = false;


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
    // Rainbow input 
    rainbowPick.addEventListener("click", (e) => {
        rainbowPressed = true;
        rainbowToggle = true;
    })

    square.addEventListener("mousedown", (e) => {
        if (rainbowToggle == true) {
            rainbowClicked = true;
            e.target.style.backgroundColor = `hsla(${Math.random() * 361}, ${Math.floor(Math.random() * (100 - 50) ) + 50}%, ${Math.floor(Math.random() * (100))}%)`;
        }
        else if (e.buttons == 2) {
            altClickToggle = true;
        }
        else {
            clickToggle = true;
        }
    })
 
    square.addEventListener("dragstart", (e) => {
        e.preventDefault();
    })
    square.addEventListener("drop", (e) => {
        e.preventDefault();
    })

    square.addEventListener("click", (e) => {
        if (!rainbowPressed) {
            e.target.style.backgroundColor = colorValue;
        }
       else {
        rainbowPressed = false;
       }
    })

    square.addEventListener("mouseup", (e) => {
        altClickToggle = false;
        clickToggle = false;
        rainbowToggle = false;
        rainbowClicked = false;
    })

    square.addEventListener("mousemove", (e) => {
        if (rainbowToggle == true) {
        }
        else if (clickToggle == true) {
            e.target.style.backgroundColor = colorValue;
        }
        else if (altClickToggle == true) {
            e.target.style.backgroundColor = eraseValue;
        }
    });

    square.addEventListener("mouseover", (e) => {
        if (rainbowToggle == true && rainbowClicked == true) {
            e.target.style.backgroundColor = `hsl(${Math.random() * 361}, ${Math.floor(Math.random() * (100 - 30) ) + 30}%, ${Math.floor(Math.random() * (90 - 10) ) + 10}%)`;
        }
    })

    square.addEventListener("contextmenu", (e) => {
        e.target.style.backgroundColor = eraseValue;
        e.preventDefault();
    })

    gridContainer.addEventListener("mouseleave", (e) => {
        clickToggle = false;
        altClickToggle = false;
        rainbowToggle = false;
        rainbowClicked = false;
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