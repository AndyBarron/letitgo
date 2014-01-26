function fileExists(filePath)
{
    var http = new XMLHttpRequest();

    http.open('HEAD', filePath, false);
    http.send();

    return (http.status == 200);
}


function loadImage(name)
{
	var img = new Image();
	img.isErrorImage = false;
	var path = 'img/' + name;
	if (!fileExists(path))
	{
		debug('Error: could not find image"' + path + '"');
		path = ERROR_IMAGE_PATH;
		img.isErrorImage = true;
	}
	img.src = path;
	return img;
}
function exists(thing)
{
	return (typeof thing !== "undefined") && (thing !== null);
}

function trimFilename(input)
{
	return input.substr(0, input.lastIndexOf('.')) || input;
}

function debug()
{
	if(DEBUG_MODE && exists(console) && exists(console.log))
	{
		for(var i = 0; i < arguments.length; i++) {
			console.log(arguments[i]);
		}
	}
}