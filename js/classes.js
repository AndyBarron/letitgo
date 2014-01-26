function Entity ( options )
{
	this.id = options.id; //The index in sprite arrays of this object's viewpoint
	this.name = options.name;
	this.doKeyPress = options.doKeyPress; //doKey (int)
	this.updateIdle = options.updateIdle; //Function that determines idle behavior - takes deltaT
	this.updateActive = options.updateActive; //also takes deltaT
	this.drawPost = options.drawPost; // post-processing if necessary
	this.clickable = (exists(options.clickable) && options.clickable == true);

	this.left = false;
	this.active = false;
	this.position = {x:0,y:0};
	this.data = {};
	this.removed = false;

	this.sprites = []; //Image[]
	for(var i = 0; i < Entities.ids.length; i++)
	{
		var id = Entities.ids[i];
		var spr = Graphics.files[id][this.name];
		this.sprites[id] = spr;
	}

	this.initData = (exists(options.initData)) ? options.initData : function(){};
	this.initData();

	if(exists(options.doCollide))
	{
		this.doCollide = options.doCollide;
	}
	else
	{
		this.doCollide = function(){}
	}
}

Entity.prototype.clone = function()
{
	return new Entity(this);
}

Entity.prototype.collides = function(id,other)
{
	var spr = this.sprites[id];

	var a = spr.anchor;
	var w = spr.getWidth();
	var h = spr.getHeight();
	var hw = w/2;
	var hh = h/2;

	var lx = this.position.x - hw;
	var rx = this.position.x + hw;

	var by = this.position.y - hh;
	var ty = this.position.y + hh;

	var anchorLeft = (a == 0 || a == 3 || a == 6);
	var anchorRight = (a == 2 || a == 5 || a == 8);
	var anchorTop = (a == 0 || a == 1 || a == 2);
	var anchorBottom = (a == 6 || a == 7 || a == 8);

	if (anchorLeft)
	{
		lx += hw;
		rx += hw;
	}
	else if (anchorRight) 
	{
		lx -= hw;
		rx -= hw;
	}

	if (anchorBottom)
	{
		by -= hh;
		ty -= hh;
	}
	else if (anchorTop) 
	{
		by += hh;
		ty += hh;
	}

	return other.hit(id,lx,ty) || other.hit(id,rx,ty) || other.hit(id,rx,by) || other.hit(id,lx,by);
}

Entity.prototype.hit = function(id,x,y)
{

	var spr = this.sprites[id];

	var a = spr.anchor;
	var w = spr.getWidth();
	var h = spr.getHeight();
	var hw = w/2;
	var hh = h/2;

	var lx = this.position.x - hw;
	var rx = this.position.x + hw;

	var by = this.position.y - hh;
	var ty = this.position.y + hh;

	var anchorLeft = (a == 0 || a == 3 || a == 6);
	var anchorRight = (a == 2 || a == 5 || a == 8);
	var anchorTop = (a == 0 || a == 1 || a == 2);
	var anchorBottom = (a == 6 || a == 7 || a == 8);

	if (anchorLeft)
	{
		lx += hw;
		rx += hw;
	}
	else if (anchorRight) 
	{
		lx -= hw;
		rx -= hw;
	}

	if (anchorBottom)
	{
		by -= hh;
		ty -= hh;
	}
	else if (anchorTop) 
	{
		by += hh;
		ty += hh;
	}

	var hit = lx <= x && x <= rx && by <= y && y <= ty;

	return hit;

}

function Sprite ( filename, options )
{
	this.image = loadImage(filename);
	this.scale = 1;

	var hasOptions = exists(options);

	if(hasOptions)
	{
		if (exists(options.anchor)) this.anchor = options.anchor;
		if (exists(options.scale)) this.scale = options.scale;
	}
	else
	{
		this.anchor = 4;
	}
}

Sprite.prototype.getWidth = function()
{
	return this.scale * this.image.width;
}

Sprite.prototype.getHeight = function()
{
	return this.scale * this.image.height;
}

Sprite.prototype.draw = function( context, options )
{

	if(!exists(options)) options = {};
	
	var x = options.x;
	var y = options.y;
	var flipH = options.flipH;

	var a = this.anchor;
	var w = this.getWidth();
	var h = this.getHeight();
	var hw = w/2;
	var hh = h/2;

	var anchorLeft = (a == 0 || a == 3 || a == 6);
	var anchorRight = (a == 2 || a == 5 || a == 8);
	var anchorTop = (a == 0 || a == 1 || a == 2);
	var anchorBottom = (a == 6 || a == 7 || a == 8);

	var offX = -hw;
	if (anchorLeft) offX = 0;
	else if (anchorRight) offX = -w;

	var offY = -hh;
	if (anchorTop) offY = 0;
	else if (anchorBottom) offY = -h;

	if(!exists(x) || !exists(y))
	{
		x = 0;
		y = 0;
	}

	if (!exists(flipH)) flipH = false;
	var flipHMult = flipH ? -1 : 1;

	// TODO actually flip them!!

	context.save();

	context.translate(x+offX*flipHMult,y+offY);
	context.scale(this.scale*flipHMult,this.scale);

	context.drawImage(this.image,0,0,this.image.width,this.image.height);

	context.restore();

}

function Input () {}

Input.init = function(keyObject,mouseObject)
{
	$(keyObject).keydown(Input.keyPress);
	$(keyObject).keyup(Input.keyRelease);
	$(mouseObject).mousedown(Input.mousePress);
	$(mouseObject).mouseup(Input.mouseRelease);
	$(mouseObject).mousemove(Input.mouseMove);
	// $(mouseObject).bind('contextmenu', function(e) { return false; });
}

Input.keysDown = {};
Input.mouse = {x:0,y:0};
Input.keyPressListeners = [];
Input.mousePressListeners = [];

Input.keyPress = function(e) {
	var code = e.which;

	if ( Input.isKeyUp(code) ) 
	{
		Input.keysDown[code] = true;
		debug("key press " + code);

		for(var i = 0; i < Input.keyPressListeners.length; i++)
		{
			Input.keyPressListeners[i].call(null,code);
		}
	}

};

Input.keyRelease = function(e) {
	var code = e.which;

	if ( Input.isKeyDown(code) ) 
	{
		delete Input.keysDown[code];
		debug("key release " + code);
	}
};

Input.mouseMove = function(e){
	Input.mouse.x = e.offsetX;
	Input.mouse.y = e.offsetY;
	// debug("mouse move (" + Input.mouse.x + "," + Input.mouse.y +")");
}

Input.mousePress = function(e) {
	if ( e.which != 1 ) return;

	var coords = {x: e.offsetX, y: e.offsetY};

	debug("mouse press (" + coords.x + "," + coords.y + ")");

	for(var i = 0; i < Input.mousePressListeners.length; i++)
	{
		Input.mousePressListeners[i].call(null,coords);
	}
}

Input.isKeyDown = function(code)
{
	return exists(Input.keysDown[code]);
}

Input.isKeyUp = function(code)
{
	return !Input.isKeyDown(code);
}

function Sounds () {}

Sounds.files = {};

Sounds.init = function() {
	for (var i = 0; i < arguments.length; i++)
	{
		var sndFilename = arguments[i];
		var sndName = trimFilename(sndFilename);
		var snd = new Audio('snd/'+sndFilename);
		Sounds.files[sndName] = snd;
	}
}

Sounds.play = function(name)
{
	var sound = Sounds.files[name];
	if(exists(sound))
	{
		(new Audio(sound.src)).play();
	}
	else
	{
		debug('Sound not found: ' + name);
	}
}

function Graphics () {}

Graphics.files = [];
Graphics.fileCount = 0;
Graphics.filesLoaded = 0;
Graphics.fileList = [];

Graphics.init = function() {
	var ids = Entities.ids;
	var names = Entities.names;

	// load all images

	for(var i = 0; i < ids.length; i++)
	{
		for(var j = 0; j < names.length; j++)
		{
			var id = ids[i];
			var name = names[j];
			var filename = 'spr/'+ id + '_' + name + '.png';
			var spr = new Sprite(filename);
			if(spr.image.isErrorImage)
			{
				fallback = 'spr/0_' + name + '.png';
				debug('could not find image "' + filename + '", using fallback image "' +fallback+ "'");
				spr = new Sprite(fallback);
			}

			if (!exists(Graphics.files[id]))
				Graphics.files[id] = {};

			if (name == 'tree') spr.anchor = 7;

			Graphics.fileCount++;
			Graphics.fileList.push(spr);
			Graphics.files[id][name] = spr;
		}
	}

}

Graphics.scaleSprites = function(){

	var ids = Entities.ids;
	var names = Entities.names;



	for(var n = 0; n < names.length; n++)
	{
		var nm = names[n];
		var targetArea = Entities.sizes[nm];

		if(!exists(targetArea))
		{
			var total = 0;
			for(var k = 0; k < ids.length; k++)
			{
				var spr = Graphics.files[k][nm];
				var area = spr.getWidth()*spr.getHeight();
				total += area;
			}
			var avg = total/ids.length;
			targetArea = avg;
		}

		for(var m = 0; m < ids.length; m++)
		{
			var spr = Graphics.files[m][nm];
			var area = spr.getWidth()*spr.getHeight();
			var ratio = targetArea / area;
			spr.scale = Math.sqrt(ratio);
		}
	}
}