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
	'storm',
	'rootNode'
];

Entities.sizes = {
	'squirrel': 64*64,
	'bird': 64*64,
	'tree': 200*400,
	'acorn': 40*40,
	'sprout': 40*60,
	'sapling': 200*300,
	'sun': 75*75,
	'cloud': 250*100,
	'sky_blue': 800*600,
	'sky_dark': 800*600,
	'ground': 800*600,
	'ray': 100*100,
	'roots_01': 100*100,
	'roots_02': 100*100,
	'roots_03': 100*100,
	'rain': 50*50,
	'storm': 250*100,
	'rootNode': 30*30
};

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
	
	Entities.types['rain'] = new Entity({
		id: 5454,
		name: 'rain',
		doKeyPress: function() {},
		updateIdle: rain_updateIdle,
		updateActive: function(){},
		initData: rain_initData
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
		doKeyPress: sun_doKeyPress,
		updateIdle: function(){},
		updateActive: sun_updateActive(),
		initData: sun_initData
	});

    Entities.types['tree'] = new Entity({
	id : 1,
	name : 'tree',
	doKeyPress: tree_doKeyPress,
	updateIdle: function(){},
	updateActive: function(){}
    });

    Entities.types['acorn'] = new Entity({
	id:1,
	name : 'acorn',
	doKeyPress: tree_doKeyPress,
	updateIdle:function(){},
	updateActive:function(){}
    });

    Entities.types['cloud'] = new Entity({
	id: 4,
	name: 'cloud',
	doKeyPress: function() {},
	updateIdle : cloud_updateIdle,
	updateActive: cloud_updateIdle,
	initData: cloud_initData
    });
	
	Entities.types['storm'] = new Entity({
	id: 4,
	name: 'storm',
	doKeyPress: cloud_doKeyPress,
	updateIdle : cloud_updateIdle,
	updateActive: cloud_updateActive,
	initData: cloud_initData
    });
	
    Entities.types['flowers'] = new Entity({
	id:8965,
	name : 'flowers',
	doKeyPress: function(){},
	updateIdle: flowers_updateIdle,
	updateActive: function(){}
    });

	Entities.types['roots_01'] = new Entity({
	id:177,
	name : 'roots_01',
	doKeyPress : function(){},
	updateIdle : function(){},
	updateActive : function(){}
	});

	Entities.types['roots_02'] = new Entity({
	id:177,
	name : 'roots_02',
	doKeyPress : function(){},
	updateIdle : function(){},
	updateActive : function(){}
	});

	Entities.types['roots_03'] = new Entity({
	id:177,
	name : 'roots_03',
	doKeyPress : function(){},
	updateIdle : function(){},
	updateActive : function(){}
	});

	Entities.types['rootNode'] = new Entity({
	id:177,
	name : 'rootNode',
	doKeyPress : function(){},
	updateIdle : rootNode_updateIdle,
	updateActive : function(){}
	});

}
