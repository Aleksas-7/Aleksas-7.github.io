
let cols, rows;
let grid;
let cellWidth = 10;
let currentColor = [0, 200, 0, 255];
let backgroundColor = [0, 0, 0, 125];

let gridShow = true;
let gridColor = [25, 25, 25];

let totalCellLimit = true;
let totalCellCount = 16;

function make2DArray(c, r){
    let arr = new Array(c);
    for (let i = 0 ; i < arr.length ; i++){
        arr[i] = new Array(r);
        for(let j = 0 ; j < r ; j++){
            arr[i][j] = new Array(4);
        }
    }
    return arr;
}

function colorCell() {
    let col = floor(mouseX / cellWidth);
    let row = floor(mouseY / cellWidth);
    if (mouseButton === LEFT){
        grid[col][row] = currentColor;
    }
    else if (mouseButton === RIGHT) {
        grid[col][row] = backgroundColor;
    }
}




function setup() {
    colorMode(RGB);
    createCanvas(400, 400);
    if (totalCellLimit){
        cellWidth = floor(width / totalCellCount);
        cols = totalCellCount;
        rows = totalCellCount;
    } else {
        cols = width / cellWidth;
        rows = height / cellWidth;
    }
    grid = make2DArray(cols, rows);
    for(let i = 0 ; i < cols ; i++){
        for(let j = 0 ; j < rows ; j++){
            grid[i][j] = backgroundColor;
        }
    }
    
}

function mousePressed(){
    colorCell();
}
function mouseDragged(){
    colorCell();
}
  
function draw() {
    background(backgroundColor);
    if (totalCellLimit){
        for(let i = 0 ; i < totalCellCount ; i++){
            for(let j = 0 ; j < totalCellCount ; j++){
                if (!gridShow){
                    strokeWeight(0);
                } else {
                    strokeWeight(1);
                }
                stroke(gridColor);
                fill(grid[i][j]);
                let x = i * cellWidth;
                let y = j * cellWidth;
                square(x, y, cellWidth);
            }
        }
    } else {
        for(let i = 0 ; i < cols ; i++){
            for(let j = 0 ; j < rows ; j++){
                if (!gridShow){
                    strokeWeight(0);
                } else {
                    strokeWeight(1);
                }
                stroke(gridColor);
                fill(grid[i][j]);
                let x = i * cellWidth;
                let y = j * cellWidth;
                square(x, y, cellWidth);
            }
        }
    }
}