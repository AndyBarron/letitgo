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
	Entities.types['squirrel'] = new Entity({
		id: 0,
		name: 'squirrel',
		doKeyPress: squirrel_doKeyPress,
		updateIdle: squirrel_updateIdle,
		updateActive: function(){},
	});

	Entities.types['bird'] = new Entity({
		id: 2,
		name: 'bird',
		doKeyPress: bird_doKeyPress,
		updateIdle: bird_updateIdle,
		updateActive: bird_updateActive,
		initData: bird_initData
	});

	Entities.types['sun'] = new Entity({
		id: 3,
		name: 'sun',
		doKeyPress: function(){},
		updateIdle: function(){},
		updateActive: function(){}
	});

}