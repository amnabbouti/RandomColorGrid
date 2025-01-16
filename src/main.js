import randomColor from 'randomcolor';

document.body.innerHTML = '';
Object.assign(document.body.style, {
    margin: '0 auto',
    fontSize: '25px',
    fontWeight: 'bold',
    padding: '50px',


});

const title = document.createElement('h1');
title.textContent = 'Color Grid Generator';
Object.assign(title.style, {
    textAlign: 'center',
    padding: '20px',
    fontWeight: 'bold',
    fontSize: '40px',
    color: 'white',
    background: 'linear-gradient(to right, black, darkblue)',
    fontFamily: 'Arial, sans-serif',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
    margin: '0 0 50px 0',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    position: 'relative',
    zIndex: 1,
});
document.body.appendChild(title);


// Wrapper
const container = document.createElement('main');
Object.assign(container.style, {
    display: 'grid',
    gridTemplateColumns: '3fr 1fr',
    fontFamily: 'arial, sans-serif',
    border: '2px solid black',
    borderRadius: '10px',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
    overflow: 'hidden',
});
document.body.appendChild(container);

// Left column container
const leftColumn = document.createElement('section');
Object.assign(leftColumn.style, {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
});
container.appendChild(leftColumn);

// Input section
const inputSection = document.createElement('div');
Object.assign(inputSection.style, {
    padding: '20px',
    display: 'flex',
    gap: '40px',
    alignItems: 'center',
});
leftColumn.appendChild(inputSection);

// Input fields container
const inputsContainer = document.createElement('div');
inputSection.appendChild(inputsContainer);
const inputs = [
    {label: 'columns', defaultValue: '2'},
    {label: 'rows', defaultValue: '3'},
    {label: 'colors', defaultValue: '3'},
];

inputs.forEach(({label, defaultValue}) => {
    const container = document.createElement('div');
    Object.assign(container.style, {
        display: 'flex',
        margin: '10px',
        alignItems: 'center',
    });

    const labelElement = document.createElement('span');
    labelElement.textContent = label;
    labelElement.style.width = '100px';

    const input = document.createElement('input');
    input.id = label;
    input.value = defaultValue;
    Object.assign(input.style, {
        borderRadius: '5px',
        padding: '10px',
        backgroundColor: '#fff',
        border: '2px solid #4CAF50',
        marginLeft: '20px',
    });

    container.append(labelElement, input);
    inputsContainer.appendChild(container);
});

// Button
const goButton = document.createElement('button');
goButton.textContent = 'GO';
Object.assign(goButton.style, {
    width: '50%',
    height: '90%',
    backgroundColor: '#4CAF50',
    cursor: 'pointer',
    borderRadius: '5px',
    fontWeight: 'bold',
    fontSize: '25px',
    marginRight: '20px',
    border: 'none',
    textTransform: 'uppercase',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s ease',
    fontFamily: 'Arial, sans-serif',
});

goButton.addEventListener('mouseenter', () => {
    goButton.style.backgroundColor = '#45a049';
    goButton.style.transform = 'scale(1.02)';
    goButton.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
});

goButton.addEventListener('mouseleave', () => {
    goButton.style.backgroundColor = '#4CAF50';
    goButton.style.transform = 'scale(1)';
    goButton.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
});

inputSection.appendChild(goButton);


// Grid container
const gridContainer = document.createElement('div');
Object.assign(gridContainer.style, {
    flex: '1',
    overflowY: 'auto',
    display: 'grid',
    gap: '10px',
});
leftColumn.appendChild(gridContainer);

// count
const statsContainer = document.createElement('section');
Object.assign(statsContainer.style, {
    borderLeft: '2px solid black',
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: '68vh',
});
container.appendChild(statsContainer);

// grid
function generateGrid() {
    const columns = parseInt(document.getElementById('columns').value);
    const rows = parseInt(document.getElementById('rows').value);
    const colorCount = parseInt(document.getElementById('colors').value);
    if (!columns || !rows || !colorCount) {
        alert('you forgot to fill in all fields pippo!');
        return;
    }
    // deleting
    const existingGrid = document.querySelector('.grid');
    if (existingGrid) existingGrid.remove();
    // new
    const grid = document.createElement('div');
    grid.className = 'grid';
    Object.assign(grid.style, {
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
    });
    gridContainer.appendChild(grid);

    // random colors
    const colors = randomColor({count: colorCount});
    const colorCounts = colors.reduce((acc, color) => {
        acc[color] = 0;
        return acc;
    }, {});

    // Populating my grid
    for (let i = 0; i < rows * columns; i++) {
        const cell = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        Object.assign(cell.style, {
            backgroundColor: color,
            border: '1px solid black',
        });
        colorCounts[color]++;
        grid.appendChild(cell);
    }

    // Update
    statsContainer.innerHTML = '';
    Object.entries(colorCounts).forEach(([color, count]) => {
        const statBox = document.createElement('div');
        Object.assign(statBox.style, {
            backgroundColor: color,
            border: '2px solid #333',
            display: 'grid',
            height: '80px',
            width: '80px',
            placeItems: 'center',
            borderRadius: '50%',
            margin: '20px',
            boxShadow: '0 2px 10px black',
        });

        const countText = document.createElement('span');
        countText.textContent = ` ${count}`;
        Object.assign(countText.style, {
            marginLeft: '10px',
            verticalAlign: 'top',
        });

        const statContainer = document.createElement('div');
        Object.assign(statContainer.style, {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
        });

        statContainer.append(statBox, countText);
        statsContainer.appendChild(statContainer);
    });
}

goButton.addEventListener('click', generateGrid);
generateGrid();
