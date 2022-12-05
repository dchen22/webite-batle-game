var canvas = document.getElementById("cv1")
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

function setup() {
    b1 = new Being(WIDTH/2, HEIGHT/2);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    console.log(b1.id)
    b1.ch_display();

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
        this.hp = 1000;
        this.max_hp = 1000;
        this.atk = 50;
        this.alive = true

    }

    die() {
        this.alive = false;
    }
    attack(target) {
        target.hp = Math.max(target.hp - this.atk, 0);  // damage target; target hp doesn't go below 0
    }

    ch_display() {
        ctx.beginPath();
        ctx.arc(this.px, this.py, 10, 0, 2*Math.PI)
        ctx.stroke();
    }
}

class Divine extends Being {
    constructor(px, py, id='default_divine', atk_cd=2) {
        super(px, py, id);
        this.atk_cd = atk_cd;
    }


}

setup();
setInterval(draw, 16);