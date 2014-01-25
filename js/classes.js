function Entity ( options )
{
        this.doKeyPress = options.doKeyPress; //doKey (int)
        this.sprites = options.sprites; //Image[]
        this.updateIdle = options.updateIdle; //Function that determines idle behavior - takes deltaT
        this.updateActive = options.updateActive; //also takes deltaT
        this.drawPost = options.drawPost; // post-processing if necessary
        this.active = false;
        this.id = options.id; //The index in sprite arrays of this object's viewpoint
        this.name = options.name;
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
	}

	for(var i = 0; i < Input.keyPressListeners.length; i++)
	{
		Input.keyPressListeners[i].call(null,code);
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