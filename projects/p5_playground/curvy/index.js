
let bezierBasic = false;
let followMe = true;

let m;
let cat;
let distance = 100;

const pythagorean = (x_d, y_d) => {
    return Math.sqrt((x_d**2) + (y_d**2));
};

const pythagorean2D = (a, b) => {
    return pythagorean(abs(a.x - b.x), abs(a.y - b.y));
};

function setup(){
    createCanvas(400, 400);
    if (followMe){
        cat = createVector(200, 200);
        m = createVector(mouseX, mouseY);
    }
    
}

function draw(){
    if (bezierBasic){

        let start_p = createVector(25, 200);
        let end_p = createVector(375, 200);
        let mid_p = createVector(200, 100);
        background(0);
        fill(255)
        circle(start_p.x, start_p.y, 10);
        circle(end_p.x, end_p.y, 10);

        mid_p.x = mouseX;
        mid_p.y = mouseY;
        fill(20, 230, 20);
        circle(mid_p.x, mid_p.y, 10);

        let prev = createVector(start_p.x, start_p.y);
        let t = 8;
        for (let i = 0 ; i <= t ; i++){
            let f = p5.Vector.lerp(start_p, mid_p, 1/t*i);
            let s = p5.Vector.lerp(mid_p, end_p, 1/t*i);

            let b = p5.Vector.lerp(f, s, 1/t*i);
            fill(200, 0, 0);
            stroke(100, 0, 0);
            line(prev.x, prev.y, b.x, b.y);
            circle(b.x, b.y, 4);
            prev = b;
        }
    }
    

    if (followMe) {
        background(0);
        m.x = mouseX;
        m.y = mouseY;

        fill(200, 200, 200);
        circle(m.x, m.y, 15);

        fill(0, 200, 0);
        circle(cat.x, cat.y, 25);
        
        text(pythagorean2D(m, cat).toString(), 20, 20);

        if (pythagorean2D(m, cat) > distance){
            stroke(200, 0, 0);
            line(m.x, m.y, cat.x, cat.y);
        } else {
            stroke(0, 255, 0);
            line(m.x, m.y, cat.x, cat.y);
            
        }


    }

}