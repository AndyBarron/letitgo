function Entities () {}

Entities.ids = [0,1,2,3,4];

Entities.names = [
	'squirrel',
	'bird',
	'tree',
	'acorn',
	'sprout',
	'sapling',
	'sun',
	'cloud',
	'sky_blue',
	'sky_dark',
	'ground',
	'ray',
	'roots_01',
	'roots_02',
	'roots_03',
	'rain',
	'storm'
];

Entities.types = {};

Entities.init = function()
{
	Entities.types['squirrel'] = 
		new Entity({
			id: 0,
			name: 'squirrel',
			doKeyPress: squirrel_doKeyPress,
			updateIdle: squirrel_updateIdle,
			updateActive: function(){}
		})
	;
}