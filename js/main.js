var canvas = document.getElementById("display");
var context = canvas.getContext("2d");
var test = loadImage('test.png')

function update(delta)
{

	var id = activeEntity.id;

	for(var i = 0; i < entities.length; i++)
	{
		for(var j = i+1; j < entities.length; j++)
		{
			var e1 = entities[i];
			var e2 = entities[j];
			if(e1.collides(id,e2) || e2.collides(id,e1))
			{
				e1.doCollide(e2);
				e2.doCollide(e1);
			}
		}
	}


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
Sounds.init('test.wav','zap.wav', 'bird_sound.wav', 'squirrel_sound.wav', 'sun_sound.wav', 'tree_sound.wav', 'wind_sound.wav', 'tada_sound.wav', 'water_sound.wav');
Graphics.init();
Entities.init();

for(var f = 0; f < Graphics.fileCount; f++)
{
	Graphics.fileList[f].image.onload = function(){
		Graphics.filesLoaded++;
		if(Graphics.filesLoaded >= Graphics.fileCount)
		{

			$('#splash').fadeOut(
				2000,
				function(){
					$("#splash").hide();
					$(canvas).fadeIn(2000);
				}
			);
			main();
		}

	};
}

var last = new Date();
var now = new Date();
var delta = 0;

////////////////////////////////////////

var sn = Entities.types['sun'].clone();
sn.position = {x: 700, y: 100};
var noob = Entities.types ['cloud'].clone();
noob.position = {x: Math.random() * MAX_X, y: 125};
var bird = Entities.types['bird'].clone();
bird.position = {x: 200, y: 200};
var squirrel = Entities.types['squirrel'].clone();
squirrel.position = {x: 400, y: GROUND_Y};
//var tree = Entities.types['tree'].clone();
//tree.position = {x:200, y:TREE_Y};
var acorn = Entities.types['acorn'].clone();
acorn.position = {x:300, y:GROUND_Y+50};
var storm = Entities.types['storm'].clone();
storm.position = {x: Math.random() * MAX_X, y: 170}

/////////////////////////////////////////

var entities = [sn, noob, storm, acorn, bird, squirrel];
var activeEntity = acorn;

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
	for(var j = 0; j < entities.length; j++)
	{
		var i = entities.length - 1 - j;
		var ent = entities[i];
		if (ent.clickable == false || ent == activeEntity) continue;

		var hit = ent.hit(id,coords.x,coords.y);
		if ( hit )
		{
			debug('registered click');
			playSwitchSound(ent.name);
			activeEntity = ent;
			return;
		}
	}
}

function playSwitchSound(name) {
	if( (name == "cloud") || (name == "storm") ) {
		Sounds.play('wind_sound');
	} else if (name == "squirrel") {
		Sounds.play('squirrel_sound');
	} else if ( (name == "tree") || (name == "acorn") || (name == "sprout") || (name == "sapling") ) {
		Sounds.play('tree_sound');
	} else if ( (name == "bird") ) {
		Sounds.play('bird_sound');
	} else if ( (name == "sun") ) {
		Sounds.play('sun_sound');
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
