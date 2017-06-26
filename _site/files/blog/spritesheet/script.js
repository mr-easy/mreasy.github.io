var canvas1, canvas2, canvas3, context1, context2, context3;

//GameObject constructor
function GameObject(spritesheet, x, y, width, height, timePerFrame, numberOfFrames) {
    this.spritesheet = spritesheet;             //the spritesheet image
    this.x = x;                                 //the x coordinate of the object
    this.y = y;                                 //the y coordinate of the object
    this.width = width;                         //width of spritesheet
    this.height = height;                       //height of spritesheet
    this.timePerFrame = timePerFrame;           //time in(ms) given to each frame
    this.numberOfFrames = numberOfFrames || 1;  //number of frames(sprites) in the spritesheet, default 1

    //current frame index pointer
    this.frameIndex = 0;

    //time the frame index was last updated
    this.lastUpdate = Date.now();

    //to update
    this.update = function() {
        if(Date.now() - this.lastUpdate >= this.timePerFrame) {
            this.frameIndex++;
            if(this.frameIndex >= this.numberOfFrames) {
                this.frameIndex = 0;
            }
            this.lastUpdate = Date.now();
        }
    }

    //to draw on the canvas, parameter is the context of the canvas to be drawn on
    this.draw = function(context) {
        context.drawImage(this.spritesheet,
                          this.frameIndex*this.width/this.numberOfFrames,
                          0,
                          this.width/this.numberOfFrames,
                          this.height,
                          x,
                          y,
                          this.width/this.numberOfFrames,
                          this.height);
    }
}

//our hero
var hero;
var heroSpritesheet = new Image();
heroSpritesheet.src = imgSrc;

window.onload = function() {
    canvas1 = document.getElementById("canvas1");
    context1 = canvas1.getContext("2d");
    canvas2 = document.getElementById("canvas2");
    context2 = canvas2.getContext("2d");

    hero = new GameObject(heroSpritesheet,
                              0,
                              0,
                              1536,
                              256,
                              90,
                              6);

    //call the game loop
    loop();
}

//The Game Loop
function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

//update function to update all the GameObjects
function update() {
    hero.update();
}

//draw method for drawing everything on canvas
function draw() {
    context1.clearRect(0,0,canvas1.width, canvas1.height);
    hero.draw(context1);
    hero.draw(context2);
}
