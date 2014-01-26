var canvas = document.getElementById("display");
var context = canvas.getContext("2d");
var test = loadImage('test.png')

function update(delta)
{
	for(var i = 0; i < entities.length; i++)
	{
		var ent = entities[i];
		if (ent == activeEntity) continue;

		ent.updateIdle(delta);
	}

	activeEntity.updateActive(delta);

	for(var i = 0; i < entities.length; i++)
	{
		var ent = entities[i];
		if(ent.removed){
			entities.splice(i,1);
			i--;
		}
	}
}

function draw()
{
	// clear rectangle
	context.fillStyle = "#000000";
	context.fillRect(0,0,canvas.width,canvas.height);

	// draw everybody
	for(var i = 0; i < entities.length; i++)
	{
		var ent = entities[i];
		ent.sprites[activeEntity.id].draw(context,{
			x: ent.position.x,
			y: ent.position.y
		});
	}

	// post process
}

Input.init(document,canvas);
Sounds.init('test.wav','zap.wav');
Graphics.init();
Entities.init();

var last = new Date();
var now = new Date();
var delta = 0;

var tent = Entities.types['squirrel'];
tent.position.x = 400;
tent.position.y = 300;

var entities = [tent];
var activeEntity = tent;

function doGameLoop()
{
	requestAnimationFrame(doGameLoop);

	now = new Date();
	delta = (now.getTime() - last.getTime())/1000;
	last = now;

	update(delta);
	draw();
}

function processKey(code)
{
	activeEntity.doKeyPress(code);
}

///////////////////////

Input.keyPressListeners.push(processKey);
doGameLoop();

///////////////////////


//Input.mousePressListeners.push(function(){Sounds.play('zap')});
//Input.keyPressListeners.push(function(){Sounds.play('zap')});