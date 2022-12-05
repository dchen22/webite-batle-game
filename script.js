var canvas = document.getElementById("cv1")
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

function setup() {
    d1 = new Divine(WIDTH/2, HEIGHT/2);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    d1.ch_display();
    document.addEventListener('keydown', controls);
    document.addEventListener('keyup', controls);
    console.log('hello')


}

function controls(e) {
    if (e.key.toLowerCase() == 'w') {
        d1.py -= 4.0;
    }
}

// movement code (need to make it smooth (i.e. pressing w and a moves you up and left together))
var velY = 0,
    velX = 0,
    friction = 0.78, // friction
    keys = [];

function update() {
    requestAnimationFrame(update);

    // check the keys and do the movement.
    if (keys['w']) {
        if (velY > -d1.stat.vel) {
            velY--;
        }
    }

    if (keys['s']) {
        if (velY < d1.stat.vel) {
            velY++;
        }
    }
    if (keys['d']) {
        if (velX < d1.stat.vel) {
            velX++;
        }
    }
    if (keys['a']) {
        if (velX > -d1.stat.vel) {
            velX--;
        }
    }

    // apply some friction to y velocity.
    velY *= friction;
    d1.py += velY;

    // apply some friction to x velocity.
    velX *= friction;
    d1.px += velX;

    // bounds checking
    if (d1.px >= WIDTH-5) {
        d1.px = WIDTH-5;
    } else if (d1.px <= 5) {
        d1.px = 5;
    }

    if (d1.py > WIDTH-5) {
        d1.py = WIDTH-5;
    } else if (d1.py <= 5) {
        d1.py = 5;
    }
}






class Entity {
    constructor(px, py, id='default_entity') {
        this.px = px;
        this.py = py;
        this.id = id;
    }

}

class Being extends Entity {
    constructor(px, py, id='default_being') {
        super(px, py, id);
        this.stat = {
            hp: 1000,
            max_hp: 1000,
            atk: 50,
            alive: true,
            vel: 5
        }
        this.rtx = {
            'fill':'rgb(0,0,0)'
        }
    }

    die() {
        this.alive = false;  // die :(
    }
    attack(target) {
        target.hp = Math.max(target.hp - this.atk, 0);  // damage target; target hp doesn't go below 0
    }

    ch_display() {
        ctx.beginPath();
        ctx.fillStyle = this.rtx.fill;
        ctx.arc(this.px, this.py, 10, 0, 2*Math.PI)
        ctx.stroke();
        ctx.fill();
    }
}

class Divine extends Being {
    constructor(px, py, id='default_divine', atk_cd=2) {
        super(px, py, id);
        this.stat.atk_cd = atk_cd;
        this.rtx = {
            'fill1': 'rgb(255,220,0)',
            'fill2': 'rgb(255,240,100)',
            'linewidth1': 15,
            'linewidth2': 8,
            'stroke1': 'rgb(255,220,0)',
            'stroke2': 'rgb(255,240,100)',
            'r': 20
        };
    }

    ch_display() {
        sungodgraphics(this);
    }

}



function sungodgraphics(divine) {
    ctx.beginPath();
    ctx.fillStyle = divine.rtx.fill1;
    ctx.lineWidth = divine.rtx.linewidth1;
    ctx.strokeStyle = divine.rtx.stroke1;
    ctx.arc(divine.px, divine.py, divine.rtx.r, 0, 1/3*Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = divine.rtx.fill1;
    ctx.lineWidth = divine.rtx.linewidth1;
    ctx.strokeStyle = divine.rtx.stroke1;
    ctx.arc(divine.px, divine.py, divine.rtx.r, 2/3*Math.PI, 3/3*Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = divine.rtx.fill1;
    ctx.lineWidth = divine.rtx.linewidth1;
    ctx.strokeStyle = divine.rtx.stroke1;
    ctx.arc(divine.px, divine.py, divine.rtx.r, 4/3*Math.PI, 5/3*Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = divine.rtx.fill2;
    ctx.lineWidth = divine.rtx.linewidth2;
    ctx.strokeStyle = divine.rtx.stroke2;
    ctx.arc(divine.px, divine.py, divine.rtx.r, 1/3*Math.PI, 2/3*Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = divine.rtx.fill2;
    ctx.lineWidth = divine.rtx.linewidth2;
    ctx.strokeStyle = divine.rtx.stroke2;
    ctx.arc(divine.px, divine.py, divine.rtx.r, 3/3*Math.PI, 4/3*Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = divine.rtx.fill2;
    ctx.lineWidth = divine.rtx.linewidth2;
    ctx.strokeStyle = divine.rtx.stroke2;
    ctx.arc(divine.px, divine.py, divine.rtx.r, 5/3*Math.PI, 6/3*Math.PI);
    ctx.stroke();
    ctx.fill();
}

setup();
setInterval(draw, 16);
update();

// key events
document.body.addEventListener("keydown", function (e) {
    keys[e.key] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.key] = false;
});







// smooth movement https://stackoverflow.com/questions/15344104/smooth-character-movement-in-canvas-game-using-keyboard-controls