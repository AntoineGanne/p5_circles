
// This is a template for creating a looping animation in p5.js (JavaScript). 
// When you press the 'F' key, this program will export a series of images into
// your default Downloads folder. These can then be made into an animated gif. 
// This code is known to work with p5.js version 0.6.0
// Prof. Golan Levin, 28 January 2018

// INSTRUCTIONS FOR EXPORTING FRAMES (from which to make a GIF): 
// 1. Run a local server, using instructions from here:
//    https://github.com/processing/p5.js/wiki/Local-server
// 2. Set the bEnableExport variable to true.
// 3. Set the myNickname variable to your name.
// 4. Run the program from Chrome, press 'f'. 
//    Look in your 'Downloads' folder for the generated frames.
// 5. Note: Retina screens may export frames at twice the resolution.


//===================================================
// User-modifiable global variables. 
var myNickname = "AG";
var nFramesInLoop = 30*2;
var bEnableExport = true;

// Other global variables you don't need to touch.
var nElapsedFrames;
var bRecording;
var theCanvas;


// const palette_values=['#0c056d','#590d82','#b61aae','#f25d9c']
const palette_values=['#08d9d6','#252a34','#ff2e63','#eaeaea']
let colors = []
let canvas_size =500
let horizon = canvas_size/4
let nb_lines = 12
let circles = []

//===================================================
function setup() {
  
  theCanvas = createCanvas(window.innerWidth , window.innerWidth);
  // var canvas = document.getElementById("canvas");
  // canvas.width  = window.innerWidth;
  // canvas.height = window.innerHeight;
  bRecording = false;
  nElapsedFrames = 0;
  
  colorMode(HSB,300)
  frameRate(30)
  background(75);
  
  palette_values.forEach(
    (colorValue, index, array) => { 
      colors.push(color(colorValue))
    }
  )
  
  for(let i=1;i<=5;i++){
    let pos = p5.Vector.random2D().mult(width*0.3).add(width/2,height/2)
    let fancy_circle = new FancyCircle(pos.x,pos.y,i*10,random(palette_values))
    circles.push(fancy_circle)
  }
  
  
  
}

//===================================================
function keyTyped() {
  if (bEnableExport) {
    if ((key === 'f') || (key === 'F')) {
      bRecording = true;
      nElapsedFrames = 0;
      print("mouseX:",mouseX,"; mouseY:",mouseY)
    }
  }
}

function mousePressed(){
  if(circles.length > 30) return
  let fancy_circle = new FancyCircle(mouseX,mouseY,100,random(palette_values))
    circles.push(fancy_circle)
}

//===================================================
function draw() {

  // Compute a percentage (0...1) representing where we are in the loop.
  var percentCompleteFraction = 0;
  if (bRecording) {
    percentCompleteFraction = float(nElapsedFrames) / float(nFramesInLoop);
  } else {
    percentCompleteFraction = float(frameCount % nFramesInLoop) / float(nFramesInLoop);
  }

  // Render the design, based on that percentage. 
  // This function renderMyDesign() is the one for you to change. 
  renderMyDesign (percentCompleteFraction);

  // If we're recording the output, save the frame to a file. 
  // Note that the output images may be 2x large if you have a Retina mac. 
  // You can compile these frames into an animated GIF using a tool like: 
  if (bRecording && bEnableExport) {
    var frameOutputFilename = myNickname + "_frame_" + nf(nElapsedFrames, 4) + ".png";
    print("Saving output image: " + frameOutputFilename);
    saveCanvas(theCanvas, frameOutputFilename, 'png');
    nElapsedFrames++;

    if (nElapsedFrames >= nFramesInLoop) {
      bRecording = false;
    }
  }
}

//===================================================
function renderMyDesign (percent) {
  //
  // THIS IS WHERE YOUR ART GOES. 
  // This is an example of a function that renders a temporally looping design. 
  // It takes a "percent", between 0 and 1, indicating where we are in the loop. 
  // Use, modify, or delete whatever you prefer from this example. 
  // This example uses several different graphical techniques. 
  // Remember to SKETCH FIRST!

  //----------------------
  background(75,3);
  smooth();
  stroke(colors[3]);
  strokeWeight(2);
  noiseDetail(2, 0.2);
  console.log(frameRate())

  //----------------------
  let start_cy = 200
  let step = 2
  let offy = 10
  circles.forEach( function(item) {
    item.draw()
    item.update()
    if(item.alpha==200){
      let newCircle = new FancyCircle(item.mx,item.my,item.r*0.35,random(palette_values))
      circles.push(newCircle)
    }
  })
  circles = circles.filter(function(item){
    return item.alpha>1
  })
  // console.log(circles.length)
  
  //----------------------
  // Include some visual feedback. 
  // fill(255, 0, 0);
  // noStroke();
  // textAlign(CENTER);
  // var percentDisplayString = "" + nf(percent, 1, 3);
  // text(percentDisplayString, 200, 200 - 15);
}



function percent_decal(percent,decal){
  
}




