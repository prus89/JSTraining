// Code by Piotr Pruski <pio.prus at gmail dot com>
// This simple test code in js.
// To implement some fancy features.

window.onload = function()
{
//get a reference to the canvas
var ctx = $('#canvas')[0].getContext("2d");
var x = 0;
var y = 0;
var r = 14;
var WIDTH;
var HEIGHT;
var canvasMinX = 0;
var canvasMaxX = 0;
var intervalId = 0;
var mousePos =0 ;
var easing = 0.05;

var max_distance;

var frameCount = 0;
var num = 30;
var mx = new Array(num);
var my = new Array(num);

function circle(x,y,r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();
}

function rect(x,y,w,h) {
  ctx.beginPath();
  ctx.rect(x,y,w,h);
  ctx.closePath();
  ctx.fill();
}

function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function init() {
  ctx = $('#canvas')[0].getContext("2d");
  WIDTH = $("#canvas").width()
  HEIGHT = $("#canvas").height()
  paddlex = WIDTH / 2;
  canvasMinX = $("#canvas").offset().left;
  canvasMaxX = canvasMinX + WIDTH;
  max_distance = dist(0,0,WIDTH,HEIGHT);
  // intervalId = setInterval(draw, 10);
  // draw();
  // console.log("ga");
}
 
var canvasMinX;
var canvasMaxX;
function stop(){
  // console.log( 'Circle position: ' +x + ',' +y);
  intervalId=window.clearInterval(intervalId);
  intervalId=0;

}

function dist(x1,y1,x2,y2) {
  dx = x2 - x1;
  dy = y2 - y1;
  dz = Math.sqrt(Math.pow(Math.abs(dx), 2)+Math.pow(Math.abs(dy), 2));
  return dz;
}

function draw() {

// TODO
  clear();
 
  //// This part stay something like shodows
  //////////////////////////////////////////////////////////////
  // Cycle through the array, using a different entry on each frame. 
  // Using modulo (%) like this is faster than moving all the values over.
  frameCount++;
  var which = frameCount % num;
  mx[which] = mousePos.x;
  my[which] = mousePos.y;
  
  for (i = 0; i < num; i++) {
    // which+1 is the smallest (the oldest in the array)
    index = (which+1 + i) % num;
    circle(mx[index], my[index], i);
  }

  // This part will draw many many fancy circle
  ////////////////////////////////////////////////////////////
   for(i = 0; i <= WIDTH; i += 40) {
    for(j = 0; j <= HEIGHT; j += 40) {
      size = dist(mousePos.x, mousePos.y, i, j);
      // console.log("SIZE "+size );
      // size and add += ? sa najlepszymi parametrami do ustawien.
      // Przykladowo wartosci 2,2,1 daja efekt refleksji swiatla, ala gradient
      // Najlepsza to +20, 20 ,66
      size = size/max_distance *66; 
      circle(i, j, size);
    }
  }


//// ATTENTION GRZANIE PROCA
//////////////////////////////////////////////////////////////
//   frameCount++;
//   var which = frameCount % num;
//   mx[which] = mousePos.x;
//   my[which] = mousePos.y;
  
//   // for (i = 0; i < num; i++) {
//   //   // which+1 is the smallest (the oldest in the array)
//   //   index = (which+1 + i) % num;
//   //   circle(mx[index], my[index], i);
//   // }

//   //// This part will draw many many fancy circle
//   //////////////////////////////////////////////////////////////
//   for (i = 0; i < num; i++) {
//    for(i = 0; i <= WIDTH; i += 20) {
//     for(j = 0; j <= HEIGHT; j += 20) {
//       var size = dist(mousePos.x, mousePos.y, i, j);
//       console.log("SIZE "+size );
//       size = size/max_distance * 66;
//       index = (which+1 + i) % num;
//       circle(mx[index], my[index], size);
//       // circle(i, j, size);
//     }
//   }
// }
//////////////////////////////////////////////////////////////

  //// This part will allow ball to follow your mouse
  // targetX = mousePos.x; // mouseX;
  // dx = targetX - x;
  // if(Math.abs(dx) > 1) {
  //   x += dx * easing;
  // }
  
  // targetY = mousePos.x; // mouseY;
  // dy = targetY - y;
  // if(Math.abs(dy) > 1) {
  //   y += dy * easing;
  // }

  // circle(x, y, r);
  // ellipse(x, y, 66, 66);
  //////////////////////////////////////////////////////////////

  mysza.drawHead();

}

function getMousePos(canvas, evt) {
var rect = canvas.getBoundingClientRect();
return {
  x: evt.clientX - rect.left,
  y: evt.clientY - rect.top
};
}
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

canvas.addEventListener('mousemove', function(evt) {
mousePos = getMousePos(canvas, evt);
// console.log( 'Mouse position: ' + mousePos.x + ',' + mousePos.y);

if(intervalId <=0)
{
intervalId = setInterval(draw, 2);  
}


}, false);

///////////////////////////
// Function to draw body //
///////////////////////////
(function() {
      
    // @constructor
    Mysza = function() {
    }
        
    
    // prototyp value of lefeted moves
    Mysza.prototype = {
      
    };
  
    Mysza.prototype.drawHead = function drawHead() {
  var which = frameCount % num;
  mx[which] = mousePos.x;
  my[which] = mousePos.y;
  
  for (i = 0; i < num; i++) {
    // which+1 is the smallest (the oldest in the array)
    index = (which+1 + i) % num;

    circle(mx[index], my[index], i);
    ctx.fillStyle = '#228B22';
      ctx.fill();
      ctx.lineWidth =4;
      ctx.strokeStyle = '#F13310';
      ctx.stroke();
  }
    };

    mysza = new Mysza();
    }());

init();

};
