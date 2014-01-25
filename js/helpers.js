function loadImage(name)
{
	var img = new Image();
	img.src = 'img/' + name + '.png';
	return img;
}

function exists(thing)
{
	return (typeof thing !== "undefined") && (thing !== null);
}

var DEBUG_MODE = true;

function debug()
{
	if(DEBUG_MODE && exists(console) && exists(console.log))
	{
		for(var i = 0; i < arguments.length; i++) {
			console.log(arguments[i]);
		}
	}
}