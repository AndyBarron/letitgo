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

	// get id of viewer
	var id = activeEntity.id;

	// draw background
	var gnd = Graphics.files[id]['ground'];
	var sky = Graphics.files[id]['sky_blue'];

	context.drawImage(sky.image,0,0);
	context.drawImage(gnd.image,0,canvas.height-gnd.image.height);

	// draw everybody
	for(var i = 0; i < entities.length; i++)
	{
		var ent = entities[i];
		ent.sprites[id].draw(context,{
			x: ent.position.x,
			y: ent.position.y,
			flipH: ent.left
		});
	}

	// post process
}

Input.init(document,canvas);
Sounds.init('test.wav','zap.wav');
Graphics.init();
Entities.init();

for(var f = 0; f < Graphics.fileCount; f++)
{
	Graphics.fileList[f].image.onload = function(){
		Graphics.filesLoaded++;
		if(Graphics.filesLoaded >= Graphics.fileCount)
		{
			main();
		}

	};
}

var last = new Date();
var now = new Date();
var delta = 0;

////////////////////////////////////////

var sn = Entities.types['sun'].clone();
sn.position = {x: 700, y: 100}
var bird = Entities.types['bird'].clone();
bird.position = {x: 200, y: 200};
var squirrel = Entities.types['squirrel'].clone();
squirrel.position = {x: 400, y: GROUND_Y};

/////////////////////////////////////////

var entities = [bird,squirrel,sn];
var activeEntity = squirrel;

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

function processClick(coords)
{
	var id = activeEntity.id;
	for(var i = 0; i < entities.length; i++)
	{
		var ent = entities[i];
		if (ent == activeEntity) continue;

		var hit = ent.hit(id,coords.x,coords.y);
		if ( hit )
		{
			Sounds.play('zap');
			activeEntity = ent;
			return;
		}
	}
}

///////////////////////

function main()
{
	Input.keyPressListeners.push(processKey);
	Input.mousePressListeners.push(processClick);
	doGameLoop();
	Graphics.scaleSprites();
}

///////////////////////


//Input.mousePressListeners.push(function(){Sounds.play('zap')});
//Input.keyPressListeners.push(function(){Sounds.play('zap')});