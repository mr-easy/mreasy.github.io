---
layout: post
title: "Creating Spritesheet Animation in HTML5 canvas using Javascript"
date: 2017-06-25
---

<h3>Introduction</h3>
<p>In this article, I am going to tell you how to create spritesheet animations in HTML5 canvas using javascript. You can use these for creating animations in your HTML5 game. I will be using javascript(as the title says), but you can use this concept in other canvas, like canvas in Android(java).</p>

<h3>What are we creating?</h3>
<p>It's better if we know what we are going to create. So here you go:<br>

</p>

<h3>Prerequisites</h3>
<ul>
<li>Javascript</li>
</ul>

<h3>What are sprites, spritesheet and spritesheet animation?</h3>
<p>Animations consist of a series of images(or frames) which are shown very quickly so the viewer perceive it as moving(instead of still image). Each of the image(or frame) in an animation is known as <b>sprite</b>. It can be something like this: <br><img src="{{ site.url }}/files/blog/spritesheet/sprite1.png" width="17%"> or <img src="{{ site.url }}/files/blog/spritesheet/sprite2.png" width="17%"></p>
<p>A series of these sprites laid down in a single sheet is what we say as <b>spritesheet</b>, like this: <img src="{{ site.url }}/files/blog/spritesheet/heroSpritesheet.png" width="100%"> Just Google "spritesheet", and you gonna get a lot of them.</p>
<p>Animation created using a spritesheet is called <b>spritesheet animation</b>, this is what we are gonna acheive.</p>
<p>Why to use a single image for all the sprites? Why not we just have different images and display them one by one? Hmm... We can do that, but using spritesheets have their own advantages. Having multiple images requires handling each of them individually and requires more memeory, and more images need to be loaded. While in spritesheet we need to load a single image, and can use it multiple times. Spritesheets have been in games since a long time, one classic example is pacman.</p>

<h3>Concept</h3>
<p>We will draw a single sprite at a time. Which will be pointed by some index pointer.</p>
<img src="{{ site.url }}/files/blog/spritesheet/explain.png" width="100%">
<p>And after a certain duration, we will increment our index pointer. And keep doing this, untill we reach the last frame, or in the case of a looping animation we will set the index back to 0.(indexing starts from 0).</p>
<p>The <b>drawImage()</b> method of context allows us to draw an image cropped(clipped) and resized and at any (x, y) coordinate on the canvas. It takes the following parameters:<br>
<pre>context.drawImage(img, sx, sy, swidth, sheight, x, y, width, height)</pre>
<table>
<tr><td>img</td><td>The image to be drawn</td></tr>
<tr><td>sx</td><td>The x coordinate where to start clipping</td></tr>
<tr><td>sy</td><td>The y coordinate where to start clipping</td></tr>
<tr><td>swidth</td><td>The width of image to be draw(clipping)</td></tr>
<tr><td>sheight</td><td>The height of image to be draw(clipping)</td></tr>
<tr><td>x</td><td>The x coordinate on the canvas where the image to be drawn</td></tr>
<tr><td>y</td><td>The y coordinate on the canvas where the image to be drawn</td></tr>
<tr><td>width</td><td>The width of the image(resizing it)</td></tr>
<tr><td>height</td><td>The height of the image(resizing it)</td></tr>
</table>
</p>

<h3>Implementation</h3>
<p>Let's start coding it. Create an HTML file and add a canvas to it. Like this:</p>
<pre>
&lt;!doctype HTML&gt;&#10;&lt;Head&gt;&#10;    &lt;title&gt;Spritesheet Animation&lt;/title&gt;&#10;&lt;/Head&gt;&#10;&lt;Body&gt;&#10;    &lt;canvas id=&#34;canvasHolder&#34; height=&#34;250px&#34; width=&#34;300px&#34; style=&#34;border: 2px solid black&#34;&gt;&lt;/canvas&gt;&#10;    &lt;script src=&#34;game.js&#34;&gt;&lt;/script&gt;&#10;&lt;/Body&gt;&#10;&lt;/HTML&gt;&#10;
</pre>
<p>You can adjust the size of canvas by changing the width and height attributes. If you dont's specify these attributes, the browser by default creates the canvas with a width of 300 pixels and a height of 150 pixels.</p>
<p>Let's create the script file. Create a new game.js file in the same directory as your html file. First we need to get the canvas element and it's context to draw something on the canvas.</p>
<pre>
var canvas, context;
window.onload = function() {
    canvas = document.getElementById("canvasHolder");
    context = canvas.getContext("2d");
}
</pre>
<p>Note that I am getting the canvas in the onload method. This will make sure that the canvas is loaded before being getting it.</p>
<p>Now let's create an object which represents an object inside the game. I am going to call it <b>GameObject</b>. Think of a GameObject as <em>anything</em> that is in your game. Everything in your game is considered as a single GameObject. It is your player, the enemies, the trees, pickups, etc. All these GameObjects will be updated and drawn on the canvas in every frame refresh, in a continous loop <b>"THE GAME LOOP"</b>. The game loop is a continous cycle that keeps on looping untill the game ends. Think of it like this, in animated movies a loop is there which keeps drawing the frames on the screen. In games, other than just drawing frames on screen, we also have to do some(a lot) of calculations depending on player's behaviour. So, we have two things in our loop, update and draw. i.e. update all the GameObjects and draw them all.</p>
<pre>
loop {
    ...
    update()
    draw()
    ...
}
</pre>
<p>All of these GameObjects will have an image(the Spritesheet)which will be used for drawing, a coordinate representing the position on the canvas(or in the game world), size, and some other attributes that will help in drawing its sprite. You will need to add a lot of attributes once your game starts getting complex. For now, I am keeping it simple enough to acheive our goal. Here's the GameObject constructor:</p>
<pre>
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
</pre>
<p>And here's the game loop code with update and draw methods:</p>
<pre>
//The Game Loop
function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

//update function to update all the GameObjects
function update() {

}

//draw method for drawing everything on canvas
function draw() {

}
</pre>
<p>Currently the update and draw methods are empty. Since we do not have any game object. So let's create one.</p>
<pre>
//our hero
var hero;
var heroSpritesheet = new Image();
heroSpritesheet.src = "heroSpritesheet.png";

window.onload = function() {
    canvas = document.getElementById("canvasHolder");
    context = canvas.getContext("2d");

    hero = new GameObject(heroSpritesheet,
                              0,
                              0,
                              1536,
                              256,
                              90,
                              6);
}
</pre>
<p>What next? Add the first loop call in the onload method, just before the end of it.</p>
<pre>
window.onload = function() {
    ...
    //call the game loop
    loop();
}
</pre>
<p>Hmm.. I dont see anything. Oh! remember we need to update and draw all the gameobjects. Add call to hero's update and draw methods at update() and draw() respectivily.</p>
<pre>
//update function to update all the GameObjects
function update() {
    hero.update();
}

//draw method for drawing everything on canvas
function draw() {
    hero.draw(context);
}
</pre>
<p>Great! Open the HTML page in your favourite browser and see the action.</p>
<h3>What's that?</h3>
<p>That's not exactly what I showed at the beginning. Something's not right.</p>
<h3>A note on HTML5 canvas</h3>
<p>The HTML5 canvas is just a drawing canvas. It draws the pixels where you said it to, but don't remember anything. It draws the image, and keeps drawing over it again and again. So, we see the remainng part of the previous images when new image is drawn over it.</p>

<h3>How to fix it?</h3>
<p>Fixing it is very simple. All we need to do is, before drawing the image, we have to clear the canvas. It can be done by context.clearRect() method. It clears the ractangular area defined by the parameters (x, y, width, height). Add the following in the draw method:</p>
<pre>
function draw() {
    context.clearRect(0,0,canvas.width, canvas.height);
    ...
}
</pre>
<p>In case you are drawing a backgroundbefore the character, them you don't need to clear the canvas. Since, the background image covers the whole canvas and overdraws on all the previous images.</p>

<h3>Final note</h3>
<p>Hope this article helped you. I encourage you to try and experiment yourself. You can do a lot using sprites. Like this:</p>
<p>I used spritesheet animations in <a href="https://ekshikha-gamificationframework.github.io/Pac-Man-Maths-Game/">this game</a>.</p>
<h3>References</h3>
