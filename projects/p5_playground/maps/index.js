

class Tile {
    constructor(img, up, right, down, left) {
        this.up = up;
        this.right = right;
        this.down = down;
        this.left = left;
        this.img = img;
    }


    display() {
        image(this.img, 0, 0, 100, 100);
        console.log("(    ", this.up[0], this.up[1], this.up[2]);
        console.log(") ", this.left[2], "        ", this.right[0]);
        console.log("( ", this.left[1], "        ", this.right[1]);
        console.log(") ", this.left[0], "        ", this.right[2]);
        console.log("(    ", this.down[2], this.down[1], this.down[0]);
    }

    put(x, y, w) {
        image(this.img, x, y, w, w);
    }

    getEdges() {
        return [this.up, this.right, this.down, this.left];
    }

    rotat(n) {
        const ww = this.img.width;
        const hh = this.img.height;

        const newImg = createGraphics(ww, hh);
        newImg.imageMode(CENTER);
        newImg.translate(ww / 2, hh / 2);
        newImg.rotate(HALF_PI * n);
        newImg.image(this.img, 0, 0);

        // rotate the edges
        let tu = this.up;
        let tr = this.right;
        let td = this.down;
        let tl = this.left;
        for (let i = 0; i < n; i++) {

            let temp = tu;
            tu = tl;
            tl = td;
            td = tr;
            tr = temp;

        }
        return new Tile(newImg, tu, tr, td, tl);

    }

}

function disArr(arr){
    let st = "";
    for (let i = 0 ; i < arr.length ; i++){
        st += String(arr[i]) + " ";
    }
    return st;
}

let prt = false;
let waterAndLand = true;
let cityBase = false;
let grid;
let DIM;
let cwi, che;
let tile1, tile2, tile3, tile4, tile5;
let img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11;
let tileSet = new Array(14);
let any = ["a", "a", "a"];

let framesDrawn = 0;

function preload() {
    if (waterAndLand){
        img1 = loadImage("tiles/tile_1.png");
        img2 = loadImage("tiles/tile_2.png");
        img3 = loadImage("tiles/tile_3.png");
        img4 = loadImage("tiles/tile_4.png");
        img5 = loadImage("tiles/tile_5.png");
    }
    if (cityBase){
        img1 = loadImage("til/tile_0001.png");
        img2 = loadImage("til/tile_0010.png");
        img3 = loadImage("til/tile_0011.png");
        img4 = loadImage("til/tile_0012.png");
        img5 = loadImage("til/tile_0029.png");

        img6 = loadImage("til/tile_0030.png");
        img7 = loadImage("til/tile_0032.png");
        img8 = loadImage("til/tile_0034.png");
        img9 = loadImage("til/tile_0048.png");
        img10 = loadImage("til/tile_0060.png");

        img11 = loadImage("til/tile_0061.png");
    }

}



function setup() {
    let canvas = createCanvas(400, 400)
    canvas.parent(select("#canvasContainer"));

    DIM = 10;
    cwi = floor(width / DIM);
    che = floor(height / DIM);

    if (waterAndLand){
        // img1 is all land with water i 1 corner
        // t1 and its rotations are correct
        let t1r0 = new Tile(img1, ["la", "la", "wa"], ["wa", "la", "la"], ["la", "la", "la"], ["la", "la", "la"]);
        let t1r1 = t1r0.rotat(1);
        let t1r2 = t1r0.rotat(2);
        let t1r3 = t1r0.rotat(3);
        // bottom right water ? botton left corner

        // img2 is all water
        let t2r0 = new Tile(img2, ["wa", "wa", "wa"], ["wa", "wa", "wa"], ["wa", "wa", "wa"], ["wa", "wa", "wa"]);

        // img3 is wa | la | la
        let t3r0 = new Tile(img3, ["wa", "la", "la"], ["la", "la", "la"], ["la", "la", "wa"], ["wa", "wa", "wa"]);
        let t3r1 = t3r0.rotat(1);
        let t3r2 = t3r0.rotat(2);
        let t3r3 = t3r0.rotat(3);

        // img4 is big corner of land suraunded by water
        let t4r0 = new Tile(img4, ["wa", "wa", "wa"], ["wa", "la", "la"], ["la", "la", "wa"], ["wa", "wa", "wa"]);
        let t4r1 = t4r0.rotat(1);
        let t4r2 = t4r0.rotat(2);
        let t4r3 = t4r0.rotat(3);

        // img5 is all land
        let t5r0 = new Tile(img5, ["la", "la", "la"], ["la", "la", "la"], ["la", "la", "la"], ["la", "la", "la"]);

        tileSet[0] = t1r0;
        tileSet[1] = t1r1;
        tileSet[2] = t1r2;
        tileSet[3] = t1r3;

        tileSet[4] = t2r0;

        tileSet[5] = t3r0;
        tileSet[6] = t3r1;
        tileSet[7] = t3r2;
        tileSet[8] = t3r3;

        tileSet[9] = t4r0;
        tileSet[10] = t4r1;
        tileSet[11] = t4r2;
        tileSet[12] = t4r3; // check

        tileSet[13] = t5r0;
    }

    if (cityBase){
        
        tileSet = new Array(29);

        let l1r0 = new Tile(img1, ["wa", "wa", "wa"], ["wa", "wa", "wa"], ["wa", "wa", "wa"], ["wa", "wa", "wa"]);
        let l2r0 = new Tile(img2, ["wa", "wa", "wa"], ["wa", "sa", "or"], ["or", "or", "or"], ["or", "sa", "wa"]);
        let l2r1 = l2r0.rotat(1);
        let l2r2 = l2r0.rotat(2);
        let l2r3 = l2r0.rotat(3);

        let l3r0 = new Tile(img3, ["wa", "wa", "wa"], ["wa", "wa", "wa"], ["wa", "sa", "or"], ["or", "sa", "wa"]);
        let l3r1 = l3r0.rotat(1);
        let l3r2 = l3r0.rotat(2);
        let l3r3 = l3r0.rotat(3);
  
        let l4r0 = new Tile(img4, ["or", "or", "or"], ["or", "sa", "wa"], ["wa", "sa", "or"], ["or", "or", "or"]);
        let l4r1 = l4r0.rotat(1);
        let l4r2 = l4r0.rotat(2);
        let l4r3 = l4r0.rotat(3);

        let l5r0 = new Tile(img5, ["gr", "gr", "gr"], ["gr", "gr", "gr"], ["gr", "gr", "gr"], ["gr", "gr", "gr"]);
        let l5r1 = l5r0.rotat(1);
        let l5r2 = l5r0.rotat(2);
        let l5r3 = l5r0.rotat(3);
        
        let l6r0 = new Tile(img6, ["gr", "ws", "wa"], ["wa", "wa", "wa"], ["wa", "ws", "gr"], ["gr", "gr", "gr"]);
        let l6r1 = l6r0.rotat(1);
        let l6r2 = l6r0.rotat(2);
        let l6r3 = l6r0.rotat(3);
        
        let l7r0 = new Tile(img7, ["wa", "ws", "gr"], ["gr", "gr", "gr"], ["gr", "gr", "gr"], ["gr", "ws", "wa"]);
        let l7r1 = l7r0.rotat(3);
        let l7r2 = l7r0.rotat(3);
        let l7r3 = l7r0.rotat(3);
        
        let l8r0 = new Tile(img8, ["or", "or", "or"], ["or", "or", "or"], ["or", "or", "or"], ["or", "or", "or"]);
        
        let l9r0 = new Tile(img9, ["gr", "gr", "gr"], ["gr", "gr", "gr"], ["gr", "gr", "gr"], ["gr", "gr", "gr"]);
        
        let l10r0 = new Tile(img10, ["or", "or", "or"], ["or", "or", "or"], ["or", "or", "or"], ["or", "or", "or"]);
        
        let l11r0 = new Tile(img11, ["or", "or", "or"], ["or", "or", "or"], ["or", "or", "or"], ["or", "or", "or"]);
        
        tileSet[0] = l1r0;
        tileSet[1] = l2r0;
        tileSet[2] = l2r1;
        tileSet[3] = l2r2;
        tileSet[4] = l2r3;

        tileSet[5] = l3r0;
        tileSet[6] = l3r1;
        tileSet[7] = l3r2;
        tileSet[8] = l3r3;
        tileSet[9] = l4r0;
    
        tileSet[10] = l4r1;
        tileSet[11] = l4r2;
        tileSet[12] = l4r3;
        tileSet[13] = l5r0;
        tileSet[14] = l5r1;
    
        tileSet[15] = l5r2;
        tileSet[16] = l5r3;
        tileSet[17] = l6r0;
        tileSet[18] = l6r1;
        tileSet[19] = l6r2;
    
        tileSet[20] = l6r3;
        tileSet[21] = l7r0;
        tileSet[22] = l7r1;
        tileSet[23] = l7r2;
        tileSet[24] = l7r3;
    
        tileSet[25] = l8r0;
        tileSet[26] = l9r0;
        tileSet[27] = l1r0;
        tileSet[28] = l11r0;
    }
    gridSetup();
}

function draw() {
    frameRate(25);
    framesDrawn++;
    drawOneFrame();

    framesDrawn >= DIM*DIM ? noLoop() : null;

}


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

function getMinEntropy(){
    let m = 0;
    let pos = new Array(1);
    for (let i = 1 ; i < grid.length ; i++){
        if (grid[i].collapsed){
            continue;
        }
        else if (grid[i].entropy < grid[m].entropy){
            m = i;
            pos = new Array(1);
            pos[0] = m;
        }
        else if (grid[i].entropy == grid[m].entropy){
            pos.push(i);
        }
        
    }
    // smallest entropy is m;
    // gather all m m size entropy's and choose a random one
    
    let choice = pos[getRandomInt(pos.length)]; 
    console.log(`Choice : ${choice} \nPos: ${disArr(pos)}`);
    return choice;
}

function gridSetup(){
    grid = new Array(DIM*DIM);
    for (let i = 0 ; i < grid.length ; i++){
        grid[i] = {
            cellImgId: -1,
            collapsed: false,
            entropy: 4,
            up:    ['a', 'a', 'a'],
            right: ['a', 'a', 'a'],
            down:  ['a', 'a', 'a'],
            left:  ['a', 'a', 'a']
        };
    }
}

function rev3(arr){
    a = new Array(3);
    a[0] = arr[2];
    a[1] = arr[1];
    a[2] = arr[0];
    return a;
}

function dimCon(x, y = -1){
    `A function to convert between 2d array and 1d array`
    
    if (y == -1){
        return [x % DIM, floor(x / DIM)];
    }
    else {
        return (y * DIM) + x;
    }
}

function edgesToMatch(m){
    /* Return array of edges to witch given cords cell needs to match */

    let c = dimCon(m);
    let upM = null;
    let rightM = null;
    let downM = null;
    let leftM = null;
    // Find these sides values

    //up
    if (c[1] != 0){
        // up isn't OOB
        upM = grid[dimCon(c[0], c[1]-1)].down;

    } else {
        // up is OOB
        upM = any;
    }

    //right
    if (c[0] != DIM-1){
        // right isn't OOB
        rightM = grid[dimCon(c[0]+1, c[1])].left;
    } else {
        rightM = any;
    }

    //down
    if (c[1] != DIM-1){
        // down isn't OOB
        downM = grid[dimCon(c[0], c[1]+1)].up;
    } else {
        downM = any;
    }

    //left
    if (c[0] != 0){
        // left isn't OOB
        leftM = grid[dimCon(c[0]-1, c[1])].right;
    } else {
        leftM = any;
    }

    return [rev3(upM), rev3(rightM), rev3(downM), rev3(leftM)];
}

function compareArrays(a, b){
    // Rework so that it doesnt care for a as it can match with anything
    
    for (let edg = 0 ; edg < 4 ; edg++){

        for (let p = 0 ; p < 3 ; p++){
            if (a[edg][p] == "a"){
                // cont
            }
            else if (b[edg][p] == "a"){
                // cont
            }
            else if (a[edg][p] != b[edg][p]) {
                return false;
            }
        }
    }
    return true;
}

function findTileFor(edg){
    let possibleIndex = [];
    for(let i = 0 ; i < tileSet.length ; i++){
        if (compareArrays(tileSet[i].getEdges(), edg)){
            possibleIndex.push(i);
        }
    }
    return possibleIndex[getRandomInt(possibleIndex.length)];
}

function updateSurroundings(){
    // go thourgh the grid if cell is collapsed lower entropy values of neighbour cells
    for (let i = 0 ; i < grid.length ; i++){
        if (grid[i].collapsed){
            let c = dimCon(i);
            //up
            if (c[1] != 0){
                grid[dimCon(c[0], c[1]-1)].entropy--;
            }
            //right
            if (c[0] != DIM-1){
                grid[dimCon(c[0]+1, c[1])].entropy--;
            }
            //down
            if (c[1] != DIM-1){
                grid[dimCon(c[0], c[1]+1)].entropy--;
            }
            //left
            if (c[0] != 0){
                grid[dimCon(c[0]-1, c[1])].entropy--;
            }
        }
    }
}

function mouseClicked(){
    setup();
    framesDrawn = 0;
    loop();
}

function drawWholeFrame() {
    for (let i = 0 ; i < DIM*DIM ; i++){
        drawOneFrame();
    }
}

function drawOneFrame() {
    // Select minimum entropy level and asign cell id, img, sides
    let m = getMinEntropy();

    prt ? console.log(`1| m is: ${m}, \n  Coords x, y: (${dimCon(m)})`) : null;
    
    // Cell m, get what its side should match to, beware of outOfBounds
    // Don't forget sides are mirrored 
    // OOB if x == 0, y == 0, x == DIM-1, y == DIM-1
    let edgesM = edgesToMatch(m);
    prt ? console.log("It needs to conform to edges: ", edgesM) : null;
    // Now find the piece that goes there (m)-asign it, and update suroundings

    let TILEindex = findTileFor(edgesM);
    prt ? console.log(`Index in tileSet is ${TILEindex}\n`) : null;
    grid[m].collapsed = true;
    grid[m].entropy = 500000; // Hot fix 
    grid[m].cellImgId = TILEindex;
    grid[m].up = tileSet[TILEindex].up;
    grid[m].right = tileSet[TILEindex].right;
    grid[m].down = tileSet[TILEindex].down;
    grid[m].left = tileSet[TILEindex].left;

    updateSurroundings();
    
    


    for (let r = 0; r < DIM; r++) {

        for (let c = 0; c < DIM; c++) {

            let x = c * cwi;
            let y = r * che;

            //square(x, y, cwi);

            if (grid[dimCon(c, r)].collapsed){
                tileSet[grid[dimCon(c, r)].cellImgId].put(x, y, cwi);
            }
        }
    }
    prt ? console.table(grid) : null;
    
}



