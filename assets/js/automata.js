// Brian's Brain Cellular Automaton with keyword cells

let animationId;
let grid, nextGrid;
let keywordGrid;
let cellSize = 8;
let cols, rows;

const canvas = document.getElementById('automataCanvas');
const ctx = canvas.getContext('2d');

const keywords = [
    'FEEDBACK', 'CONTROL', 'ENTROPY', 'SYSTEM', 'HOMEOSTASIS',
    'RECURSION', 'EMERGE', 'ADAPT', 'REGULATE', 'INFO',
    'COMPLEX', 'NETWORK', 'PATTERN', 'SIGNAL', 'NOISE',
    'LOOP', 'BALANCE', 'CHAOS', 'ORDER', 'FLOW'
];

function initAutomata() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    cols = Math.floor(canvas.width / cellSize);
    rows = Math.floor(canvas.height / cellSize);

    grid = Array(cols).fill().map(() => Array(rows).fill(0));
    nextGrid = Array(cols).fill().map(() => Array(rows).fill(0));
    keywordGrid = Array(cols).fill().map(() => Array(rows).fill(null));

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = Math.random() > 0.85 ? 1 : 0;
        }
    }

    const numKeywords = 25;
    for (let k = 0; k < numKeywords; k++) {
        const i = Math.floor(Math.random() * cols);
        const j = Math.floor(Math.random() * rows);
        keywordGrid[i][j] = keywords[Math.floor(Math.random() * keywords.length)];
    }

    animate();
}

function stopAutomata() {
    if (animationId) cancelAnimationFrame(animationId);
}

function animate() {
    updateGrid();
    drawGrid();
    animationId = requestAnimationFrame(animate);
}

function updateGrid() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const state = grid[i][j];
            const neighbors = countNeighbors(i, j);

            // Brian's Brain rules:
            // dead (0)  → alive (1) if exactly 2 alive neighbors
            // alive (1) → dying (2)
            // dying (2) → dead (0)
            if (state === 0 && neighbors === 2) {
                nextGrid[i][j] = 1;
            } else if (state === 1) {
                nextGrid[i][j] = 2;
            } else if (state === 2) {
                nextGrid[i][j] = 0;
            } else {
                nextGrid[i][j] = state;
            }
        }
    }

    [grid, nextGrid] = [nextGrid, grid];
}

function countNeighbors(x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const col = (x + i + cols) % cols;
            const row = (y + j + rows) % rows;
            if (grid[col][row] === 1) count++;
        }
    }
    return count;
}

function drawGrid() {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            const x = i * cellSize;
            const y = j * cellSize;

            if (keywordGrid[i][j]) {
                const padding = cellSize * 5;
                ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                ctx.fillRect(x - padding, y - padding / 2, padding * 2.5, padding);
                ctx.font = `${cellSize * 1.8}px "Courier New", monospace`;
                ctx.letterSpacing = '2px';
                ctx.fillStyle = '#ffffff';
                ctx.fillText(keywordGrid[i][j], x - padding + cellSize, y + cellSize * 2);
            } else {
                if (grid[i][j] === 1) {
                    ctx.fillStyle = '#00ffff'; // alive — cyan
                    ctx.fillRect(x, y, cellSize, cellSize);
                } else if (grid[i][j] === 2) {
                    ctx.fillStyle = '#ff00ff'; // dying — magenta
                    ctx.fillRect(x, y, cellSize, cellSize);
                }
            }
        }
    }
}
