let centerX, centerY;


const mercurySpeed = 0.000000824;
const venusSpeed =   0.000000299;
const earthSpeed =   0.000000199;
const marsSpeed =    0.000000154;
const jupiterSpeed = 0.000000012;
const saturnSpeed =  0.000000009;
const uranusSpeed =  0.000000006;
const neptuneSpeed = 0.000000005;

const speedScale = 18000;

const RockSpeeds = [mercurySpeed, venusSpeed, earthSpeed, marsSpeed, jupiterSpeed, saturnSpeed, uranusSpeed, neptuneSpeed];
//const RockSpeeds = [5, 10, 15, 20, 25, 30, 35, 40];

const RockSize =   [5, 10, 12, 8, 40, 35, 20, 18];

//const RockDistance = [58, 108, 150, 228, 779, 1434, 2873, 4495];
//const RockDistance = [28, 31, 34, 39, 73, 114, 204, 305];
const RockDistance = [40, 80, 120, 160, 200, 240, 280, 320];

//                           Moon
const SmallerRockDistance = [15,  20, 25, 30, 33, 35, 37, 39, 41, 45, 50];
const SmallerRockSize =     [3, 4, 5, 6, 8, 11];
//    SmallerRockSize

function getSpeed(n){
  return RockSpeeds[n] * speedScale;
}

function rndSpeed(t, b = 0){
  return (random(t) * 1.0 / 1000000) + b;
}

let certerX = 0;
let certerY = 0;

let angleMercury = 0;



class Planet {
  constructor(baseV, headV, col, size, angleSpeed){
    this._v0 = baseV;
    this._v1 = headV;
    
    this._col = [...col];
    
    this._size = size;
    this._angleSpeed = angleSpeed;
    this._angle = 0;
    //console.log(this);
    
    this._v1.rotate(random(50));
  }
  
  drawSelf(){
    push();
    fill(this._col[0], this._col[1], this._col[2]);
    stroke(0);
    strokeWeight(0);
    translate(this._v0.x, this._v0.y);  // Center of rotation point
    
    circle(this._v1.x, this._v1.y, this._size);   // Draw self
    
    //line(0, 0, this._v1.x, this._v1.y);
    pop();
    
    this._v1.rotate(this._angleSpeed);// Rotate from the point
  
  }
  
  changeRotationPoint(vec) {
    this._v0 = vec;
  }
  
  get pos(){
    var nV = createVector(0, 0);
    nV.add(this._v0);
    nV.add(this._v1);
    return nV;
  }
  
}

let jupMoons = new Array(95);
let satMoons = new Array(146)

function setup() {
  createCanvas(800, 800).parent(select("#canvasContainer"));
  centerX = width / 2;
  centerY = height / 2;

  Mercury =    new Planet(createVector(centerX, centerY), createVector(0, RockDistance[0]),   [200, 0, 100],    RockSize[0],  getSpeed(0));
  Venus =      new Planet(createVector(centerX, centerY), createVector(0, RockDistance[1]),   [255, 165, 0],    RockSize[1],  getSpeed(1));
  Earth =      new Planet(createVector(centerX, centerY), createVector(0, RockDistance[2]),   [0, 0, 255],      RockSize[2],  getSpeed(2));
  Mars =       new Planet(createVector(centerX, centerY), createVector(0, RockDistance[3]),   [255, 0, 0],      RockSize[3],  getSpeed(3));
  Jupiter =    new Planet(createVector(centerX, centerY), createVector(0, RockDistance[4]),   [255, 215, 0],    RockSize[4],  getSpeed(4));
  Saturn =     new Planet(createVector(centerX, centerY), createVector(0, RockDistance[5]),   [210, 180, 140],  RockSize[5],  getSpeed(5));
  Uranus =     new Planet(createVector(centerX, centerY), createVector(0, RockDistance[6]),   [135, 206, 235],  RockSize[6],  getSpeed(6));
  Neptune =    new Planet(createVector(centerX, centerY), createVector(0, RockDistance[7]),   [0, 0, 128],      RockSize[7],  getSpeed(7));

  // Moons 
  // earth 1
  let toSp = 20;
  let bsSp = 0.05;
  let fr = 0.004;
  let to = 0.008;
  Moon = new Planet(Earth.pos, createVector(0, 15),   [100, 100, 100],      SmallerRockSize[0],  rndSpeed(toSp, bsSp));

  // mars 2
  
  Fobas = new Planet(Mars.pos, createVector(0, 15),   [200, 100, 100],      SmallerRockSize[1],  random(fr, to));
  Deimas = new Planet(Mars.pos, createVector(0, 18),   [100, 220, 100],      SmallerRockSize[0],  random(fr, to));

  // jupiter 95
  to = 0.06
  for (let i = 0 ; i < 95 ; i++){
    jupMoons[i] = new Planet(Jupiter.pos, 
                             createVector(0, random(SmallerRockDistance)+12),
                             [random(150), random(150), random(150)],
                             random(SmallerRockSize),  
                             random(fr, to));

  }
  
  
  // saturn 146
  
  
  
  
}

function draw() {
  background(0);
  frameRate(30);
  
  fill(250, 250, 0, 50);
  circle(centerX, centerY, 50);
  
  //Mercury.drawSelf();
  //Merc.changeRotationPoint(Mercury.pos);
  //Merc.drawSelf();
  Mercury.drawSelf();
  Venus.drawSelf();
  Earth.drawSelf();
  Mars.drawSelf();
  Jupiter.drawSelf();
  Saturn.drawSelf();
  Uranus.drawSelf();
  Neptune.drawSelf();
  
  // Moons
  Moon.changeRotationPoint(Earth.pos);
  Moon.drawSelf();
  
  //   Mars:
  Fobas.changeRotationPoint(Mars.pos);
  Fobas.drawSelf();
  
  Deimas.changeRotationPoint(Mars.pos);
  Deimas.drawSelf();
  
  // Jupiter
  
  for (let i = 0 ; i < 95 ; i++){
    jupMoons[i].changeRotationPoint(Jupiter.pos);
    jupMoons[i].drawSelf();
  }
  
}




