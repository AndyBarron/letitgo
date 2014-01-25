var canvas = document.getElementById("display");
var context = canvas.getContext("2d");
var test = loadImage('test')

var x = 0;

function update(delta)
{
	x += 50*delta;
}

function draw()
{
	context.fillStyle = "#000000";
	context.fillRect(0,0,canvas.width,canvas.height);
	context.drawImage(test,Input.mouse.x-test.width/2,Input.mouse.y-test.height/2);
}

var last = new Date();
var now = new Date();
var delta = 0;

var entities = [];
var activeEntity = null;

function doGameLoop()
{
	requestAnimationFrame(doGameLoop);

	now = new Date();
	delta = (now.getTime() - last.getTime())/1000;
	last = now;

	update(delta);
	draw();
}

Input.init(document,canvas);

doGameLoop();

var snd = new Audio('snd/zap.wav');

Input.mousePressListeners.push(function(e){var bop = new Audio(snd.src); bop.play();});