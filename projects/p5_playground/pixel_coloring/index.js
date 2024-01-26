
let cols, rows;
let grid;
let cellWidth = 20;
let currentColor = color(0, 200, 0);

function make2DArray(c, r){
    let arr = new Array(c);
    for (let i = 0 ; i < arr.length ; i++){
        arr[i] = new Array(r)
    }
    return arr;
}




function setup() {
    colorMode(RGB);
    let canvasContainer = select("#canvasContainer");
    let canvas = createCanvas(400, 400);
    canvas.parent(canvasContainer);

    cols = width / cellWidth;
    rows = height / cellWidth;
    grid = make2DArray(cols, rows);
    for(let i = 0 ; i < cols ; i++){
        for(let j = 0 ; j < rows ; j++){
            grid[i][j] = color(0, 0, 0);
        }
    }
}

function mousePressed(){
    let col = floor(mouseX / cellWidth);
    let row = floor(mouseY / cellWidth);
    grid[col][row] = currentColor;
}
  
function draw() {
    background(0);
    let mouseCol = floor()
    for(let i = 0 ; i < cols ; i++){
        for(let j = 0 ; j < rows ; j++){
            fill(grid[i][j]);
            let x = i * cellWidth;
            let y = j * cellWidth;
            square(x, y, cellWidth);
        }
    }
    mousePressed();
    /*
    if (mouseIsPressed){
      fill(0);
    } else {
      fill(255);
    }
    ellipse(mouseX, mouseY, 100, 100);*/
}