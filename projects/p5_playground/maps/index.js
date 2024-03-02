

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

let prt = false;
let grid;
let DIM;
let cwi, che;
let tile1, tile2, tile3, tile4, tile5;
let img1, img2, img3, img4, img5;
let tileSet = new Array(14);
let any = ["a", "a", "a"];

function preload() {
    img1 = loadImage("tiles/tile_1.png");
    img2 = loadImage("tiles/tile_2.png");
    img3 = loadImage("tiles/tile_3.png");
    img4 = loadImage("tiles/tile_4.png");
    img5 = loadImage("tiles/tile_5.png");
}



function setup() {
    let canvas = createCanvas(400, 400)
    canvas.parent(select("#canvasContainer"));

    DIM = 16;
    cwi = floor(width / DIM);
    che = floor(height / DIM);

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

    gridSetup();
    noLoop();
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
    for (let i = 1 ; i < grid.length ; i++){
        if (grid[i].collapsed){
            continue;
        }
        else if (grid[i].entropy < grid[m].entropy){
            m = i;
        }
    }
    // smallest entropy is m;
    // gather all m m size entropy's and choose a random one
    let mEnt = grid[m].entropy;
    let pos = [m];
    for (let i = 0 ; i < grid.lenth ; i++){
        if (grid[i].entropy == mEnt){
            console.log("gme push");
            pos.push(i);
        }
    }
    return pos[getRandomInt(pos.length)];
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
    //drawOneFrame();
    setup();
    drawWholeFrame();
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
    grid[m].entropy = 500000;
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

            square(x, y, cwi);

            if (grid[dimCon(c, r)].collapsed){
                tileSet[grid[dimCon(c, r)].cellImgId].put(x, y, cwi);
            }
        }
    }
    prt ? console.table(grid) : null;
    
}


