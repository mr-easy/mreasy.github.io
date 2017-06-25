---
layout: post
title: "Creating Spritesheet Animation in HTML5 canvas using Javascript"
date: 2017-06-25
---

<h5>Introduction</h5>
<p>In this article, I am going to tell you how to create spritesheet animations in HTML5 canvas using javascript. You can use these for creating animations in your HTML5 game. I will be using javascript(as the title says), but you can use this concept in other canvas, like canvas in Android(java).</p>

<h5>What are we creating?</h5>
<p>It's better if we know what we are going to create. So here you go:<br>

</p>

<h5>Prerequisites</h5>
<ul>
<li>Javascript</li>
</ul>

<h5>What are sprites, spritesheet and spritesheet animation?</h5>
<p>Animations consist of a series of images(or frames) which are shown very quickly so the viewer perceive it as moving(instead of still image). So each of the image(or frame) in an animation is known as <b>sprite</b>. It  can be something like this <img></img> or like this <img></img><br>
A series of these sprites laid down in a single sheet is what we say as <b>spritesheet</b>, like this <img></img>. Just Google "spritesheet", and you gonna get a lot of them.<br>
Animation created using a spritesheet is called <b>spritesheet animation</b>, this is what we are gonna acheive.<br>
Why to use a single image for all the sprites? Why not we just have different images and display them one by one? Hmm... We can do that also, but using spritesheets have their own advantages. Having multiple images requires handling each of them individually and requires more memeory, and more images need to be loaded. While in spritesheet we need to load a single image, and can use it multiple times. Spritesheets have been in games since a long time, one classic example is pacman.</p>

<h5>Concept</h5>
We will draw a single sprite at a time. Which will be pointed by some index pointer.<br>
<img>
And after a certain duration, we will increment our index pointer. And keep doing this, untill we reach the last frame, or in the case of a looping animation we will set the index back to 0.(indexing starts from 0).<br>
The <b>drawImage()</b> method of context allows us to draw an image cropped(clipped) and resized and at any (x, y) coordinate on the canvas. It takes the following parameters:<br>context.drawImage(img, sx, sy, swidth, sheight, x, y, width, height)<br>
<table>
<tr><td>img</td><td>the image to be drawn</td></tr>
<tr><td>sx</td><td>the x coordinate where to start clipping</td></tr>
<tr><td>sy</td><td>the y coordinate where to start clipping</td></tr>
<tr><td>x</td><td>The x coordinate on the canvas where the image to be drawn</td></tr>
<tr><td>y</td><td>The y coordinate on the canvas where the image to be drawn</td></tr>
<tr><td>width</td><td>The width of the  image(resizing it)</td></tr>
<tr><td>height</td><td>The height of the  image(resizing it)</td></tr>



</table>

<h5>Implementation</h5>

<h5>What's that?</h5>

<h5>A note on HTML5 canvas</h5>

<h5>How to fix it?</h5>

<h5>Final note</h5>

<h5>References</h5>
