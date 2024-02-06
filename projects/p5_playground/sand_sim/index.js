let originGrid;

let newGrid;

// Individual cell width and height

let w = 8;

let r = 28;
let g = 163;
let b = 236;
let useChangingColor = false;

// Columns and rows of canvas;

let col, row;

function make2Darray(r, c) {
  let arr = new Array(c);

  for (let x = 0; x < c; x++) {
    arr[x] = new Array(r);

    for (let y = 0; y < r; y++) {
      arr[x][y] = 0;
    }
  }

  return arr;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function setup() {
  //createCanvas(400, 400).parent(select("#canvasContainer"));
  //createCanvas(360, 360).parent(select("#canvasContainer"));
  //createCanvas(360, 360);
  createCanvas(360, 360).parent(select("#canvasContainer"));

  col = width / w;

  row = height / w;

  originGrid = make2Darray(col, row);
}

function colorSuroundings(arr, withWhat, i, j){
  
    if (j > 0) {arr[i][j-1] = withWhat;}                    // u
    if (i < col-1 && j > 0) {arr[i+1][j-1] = withWhat;}     // ur
    if (i < col-1) {arr[i+1][j] = withWhat;}                // r
    if (i < col-1 && j < row-1) {arr[i+1][j+1] = withWhat;} // dr
    if (j < row-1) {arr[i][j+1] = withWhat;}                // d
    if (i > 0 && j < row-1) {arr[i-1][j+1] = withWhat;}     // dl
    if (i > 0) {arr[i-1][j] = withWhat;}                    // l
    if (i > 0 && j > 0) {arr[i-1][j-1] = withWhat;}         // ul
    arr[i][j] = withWhat;
  
}

function mousePressed (){

  let i = floor(mouseX / w);
  let j = floor(mouseY / w);
  
  if ((i >= 0 && i < col) && (j >= 0 && j < row)){
    colorSuroundings(originGrid, 1, i, j);
  }

}

function mouseDragged() {
  let i = floor(mouseX / w);
  let j = floor(mouseY / w);
  
  if ((i >= 0 && i < col) && (j >= 0 && j < row)){
    colorSuroundings(originGrid, 1, i, j);
  }
}

function draw() {
  background(220);

  frameRate(60);

  if (mouseIsPressed && useChangingColor) {
    r = r + 6;
  } else if (r > 0) {
    r = r > 255 ? 255 : r;
    r = r - 3;
  }
  
  
  if(mouseIsPressed){
    mousePressed();
  }

  // Draw out the origin grid

  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      if (originGrid[i][j]) {
        fill(r, g, b);
      } else {
        fill(0);
      }

      let x = i * w;

      let y = j * w;

      strokeWeight(0);

      square(x, y, w);
    }
  }

  // Compute the next generation of origin grid

  newGrid = make2Darray(col, row);

  for (let i = col - 1; i >= 0; i--) {
    for (let j = row - 1; j >= 0; j--) {
      if (originGrid[i][j] == 1) {
        //                           0   1   2   3   4   5   6   7

        // Cell i, j neighbours: //  u  ur   r  dr   d  dl   l  ul

        let neighbours = [-1, -1, -1, -1, -1, -1, -1, -1];

        neighbours[0] = j > 0 ? originGrid[i][j - 1] : -1; // u

        neighbours[1] = i < col - 1 && j > 0 ? originGrid[i + 1][j - 1] : -1; // ur

        neighbours[2] = i < col - 1 ? originGrid[i + 1][j] : -1; // r

        neighbours[3] =
          i < col - 1 && j < row - 1 ? originGrid[i + 1][j + 1] : -1; // dr

        neighbours[4] = j < row - 1 ? originGrid[i][j + 1] : -1; // d

        neighbours[5] = i > 0 && j < row - 1 ? originGrid[i - 1][j + 1] : -1; // dl

        neighbours[6] = i > 0 ? originGrid[i - 1][j] : -1; // l

        neighbours[7] = i > 0 && j > 0 ? originGrid[i - 1][j - 1] : -1; // ul

        // if sand can fall - fall

        if (neighbours[4] === 0) {
          newGrid[i][j + 1] = 1;
          originGrid[i][j] = 0;
          originGrid[i][j + 1] = 1;
        }

        // if bellow sand is sand maybe fall to a side?
        else if (neighbours[4] === 1) {
          // Fall to a side if bellow to left or right is not sand

          if (neighbours[3] === 0 && neighbours[5] === 0) {
            // Can fall to either side

            if (getRandomInt(2)) {
              // Fall down right

              newGrid[i + 1][j + 1] = 1;
            } else {
              // Fall down left

              newGrid[i - 1][j + 1] = 1;
            }
          } else if (neighbours[3] === 0) {
            // Can fall only to the down right

            newGrid[i + 1][j + 1] = 1;
          } else if (neighbours[5] === 0) {
            // Can oonly fall to the down left

            newGrid[i - 1][j + 1] = 1;
          } else {
            // Cannot fall to either side so stay

            newGrid[i][j] = 1;
          }
        } else {
          newGrid[i][j] = 1;
        }
      }
    }
  }

  originGrid = newGrid;
}

