var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.bgColor = "#111";
var ctx = canvas.getContext("2d");

var A = canvas.width;
var B = canvas.height;

var stepCount = 20.11111113;
var DELTA     = 90.12;   // delta per round
var exponent  = 100;
var ROTATIONS = Math.log(Math.PI*9.9999999999999999999999);
var theta    = 0;
var delta    = 0;
var oldPoint = { x : A/2,
               y : B/2 };
var point, t;

ctx.strokeStyle = "rgba(64, 64, 64, 0.3)";
ctx.lineWidth = 1;
ctx.beginPath();

function RGB2Color(r, g, b) {
    //return '#000'
    return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

function byte2Hex(n) {
    var nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F, 1)) + nybHexString.substr(n & 0x0F, 1);
}
var rainbow = [];
var frequency = .0015;
for (var i = 0; i < 7000; ++i) {
    red = Math.sin(frequency * i + 0) * 127 + 128;
    green = Math.sin(frequency * i + 2) * 127 + 128;
    blue = Math.sin(frequency * i + 4) * 127 + 128;
    rainbow.push(RGB2Color(red, green, blue));
}
var olx, oly;
var step = 0;
var t3 = 0;
var drawInt = setInterval(function(){
    if(step < stepCount) {
        if(t3 < rainbow.length){
            t3++
        } else {
            t3 = 0;
            rainbow.reverse();
        }
        var center    =  { x : A/2.0,
        		       y : B/2.0
        };
        ctx.strokeStyle = rainbow[t3];
        	t = step/(stepCount-1);
        	point = { x : center.x + Math.cos(theta)*delta,
        		  y : center.y + Math.sin(theta)*delta
            };
        	ctx.beginPath();
        	ctx.moveTo( oldPoint.x, oldPoint.y );
        	ctx.lineTo( point.x, point.y );
        	ctx.stroke();
        	theta -= ROTATIONS*(Math.PI*2)/stepCount;
        	//delta = Math.log( (step)*(DELTA/(stepCount/ROTATIONS) ) ) * Math.log(100000);
        	delta = step*(DELTA/(stepCount/ROTATIONS))^exponent;
        	oldPoint.x = point.x;
        	oldPoint.y = point.y;
        step += 1;
    } else {
      step = 0;
      rainbow.reverse();
    }
}, .1);



//https://i.boring.host/N484EPm.png
/*
ctx.beginPath();
ctx.strokeStyle = rainbow[t3];
if(!olx){
  olx = A * Math.sin(a * t2 + h) + canvas.width / 2;
  oly = B * Math.sin(b * t2) + canvas.height / 2;
  x = A * Math.sin(a * t2 + h) + canvas.width / 2;
  y = B * Math.sin(b * t2) + canvas.height / 2;
} else {
x = A * Math.sin(a * t2 + h) + canvas.width / 2;
y = B * Math.sin(b * t2) + canvas.height / 2;
}
ctx.moveTo(olx, oly);
ctx.lineTo(x, y);
ctx.closePath();
ctx.stroke();
*/
