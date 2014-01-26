function squirrel_doKeyPress ( code ){
    if( code == KEY_LEFT || code == KEY_A){
    this.left = true;
	this.position.x -= 10;
	if (this.position.x < MIN_X)
	    x += 10;
	else if(this.data.hasAcorn)
	    this.data.acorn.position.x -= 10;
    }else if( code == KEY_RIGHT || code == KEY_D){
    this.left = false;
	this.position.x += 10;
	if(this.position.x > MAX_X)
	    x -= 10;
	else if(this.data.hasAcorn)
	    this.data.acorn.position.x += 10;
    }else if ( code == KEY_SPACE){
	//squirrel drops acorn or else tries to pick one up
	if ( this.data.hasAcorn){
	    this.data.hasAcorn = false;
	    this.data.acorn.position.y += 40;
	    this.data.acorn = null;
	}else{
	    for( var i = 0 ; i < entities.length ; i++){
		if(entities[i].name == "acorn" && distance(entities[i], this) <= 27){
		    this.data.hasAcorn = true;
		    this.data.acorn = entities[i];
		    break;
		} 
	    }
	}
    }
    
}


function tree_doKeyPress ( code ) {
    if(this.name == "acorn"){
	if(code == KEY_SPACE){
	    if(this.position.y > GROUND_Y){
		this.position.y -= 1;
		this.position.x += (Math.random()-1)*0.01;
	    }else{
		 var t = new Enitity({doKeyPress : tree_doKeyPress,  updateIdle:this.updateIdle, updateActive: this.updateActive, drawPost:this.drawPost, active:true, id:this.id, name:"sprout"});
	    t.position.x = this.position.x;
	    t.position.y = this.position.y;
	    for(var i = 0; i < entities.length; i++){
		if(entities[i] == this)
		    entities.splice(i,1,t);
		
	    }
	    }
	}
    
    }else if (this.name == "sprout"){
	if(code == KEY_SPACE && this.data.nodesWatered == 4){
	    var t = new Enitity({doKeyPress : tree_doKeyPress,  updateIdle:this.updateIdle, updateActive: this.updateActive, drawPost:this.drawPost, active:true, id:this.id, name:"sapling"});
	    t.position.x = this.position.x;
	    t.position.y = this.position.y;
	    for(var i = 0; i < entities.length; i++){
		if(entities[i] == this)
		    entities.splice(i,1,t);
		
	    }
	}
    }else if (this.name == "sapling"){
	if(this.data.havingBeenShined){
	    if(code == KEY_LEFT || code == KEY_A)
		if(this.data.left_count - this.data.right_count < 2)
		    this.data.left_count++;
	     if(code == KEY_RIGHT || code == KEY_D)
		if(this.data.right_count - this.data.left_count < 2)
		    this.data.right_count++;
	    if(this.data.right_count > 10 && this.data.left_count > 10){
		var t = new Enitity({doKeyPress : tree_doKeyPress, updateIdle:this.updateIdle, updateActive: this.updateActive, drawPost:this.drawPost, active:true, id:this.id, name:"tree"});
	    t.position.x = this.position.x;
	    t.position.y = this.position.y;
	    for(var i = 0; i < entities.length; i++){
		if(entities[i] == this)
		    entities.splice(i,1,t);
		
	    }
	    }
	}
	
    }else if (this.name == "tree"){
	if(code == KEY_SPACE){
	    if(this.data.hasAcorn){
		if(this.data.acorn.data.size < 100){
		    this.data.acorn.data.size++;
		    this.data.acorn.position.x += 1;
		}
	    }else{
		var t = new Entity({doKeyPress : tree_doKeyPress, updateIdle:this.updateIdle, updateActive: this.updateActive, drawPost:this.drawPost, active:false, id:this.id, name:"acorn"});
		t.position.x = this.position.x;
		t.position.y = this.position.y - 200; // MAGIC NUMBER!!!
		entities.push(t);
		this.data.hasAcorn = true;
		this.data.acorn = t;
	    }
	}else if (code == KEY_DOWN || code == KEY_S){
	    if(this.data.acorn.size >= 100){
		this.data.acorn.dropped = true;
		this.data.acorn.position.y += 27;
	    }
	}
    }
}

function sun_doKeyPress( code ){
    if ( code == KEY_LEFT || code == KEY_A ){
		this.data.target.position.x -= 10;
    }else  if ( code == KEY_RIGHT || code == KEY_D ){
		this.data.target.position.x += 10;
    }else  if ( code == KEY_UP || code == KEY_W ){
		this.data.target.position.y -= 10;
    }else  if ( code == KEY_DOWN || code == KEY_S ){
		this.data.target.position.y += 10;
    }else if  (code == KEY_SPACE){
		for(var i = 0; i < entities.length; i++){
	    	if(entities[i].name == "sapling" && distance(entities[i], this) < 27){
			entities[i].data.havingBeenShined = true;
		    }
		}
    }
}

function squirrel_updateIdle(){
    var r = Math.random();
    if(r < 0.05){
	this.position.x += 5;
    }
    else if(r < 0.1){
	this.position.x -= 5;
    }

}




function bird_initData ( code ) {
	this.data.velocity_x = 0;
	this.data.velocity_y = 0;
}

function bird_doKeyPress ( code ) {
    if( code == KEY_UP|| code == KEY_W ) {
	this.data.velocity_y -= BIRD_FLAP_STRENGTH;
    }else if (code == KEY_DOWN || code == KEY_S){
	//this.data.velocity_y += 3;
    }

    if(this.data.velocity_x > BIRD_MAX_VEL_X)
	this.data.velocity_x = BIRD_MAX_VEL_X;
    
    if(this.data.velocity_x < -BIRD_MAX_VEL_X)
	this.data.velocity_x = -BIRD_MAX_VEL_X;
    
    if(this.data.velocity_y > BIRD_MAX_VEL_Y)
	this.data.velocity_y = BIRD_MAX_VEL_Y;
    
    if(this.data.velocity_y < -BIRD_MAX_VEL_Y)
	this.data.velocity_y = -BIRD_MAX_VEL_Y;
    

    
}

function bird_updatePhysics(delta)
{
	this.position.x += this.data.velocity_x*delta;
	this.position.y += this.data.velocity_y*delta;

	var decay = BIRD_HORIZ_DECAY*delta;
	if(Math.abs(this.data.velocity_x) < decay)
		this.data.velocity_x = 0;

	else if(this.data.velocity_x > 0)
		this.data.velocity_x -= decay;

	else if(this.data.velocity_x < 0)
	this.data.velocity_x += decay;

	this.data.velocity_y += BIRD_GRAVITY*delta;

	if(this.position.x > MAX_X)
	{
		this.position.x = MAX_X;
		this.data.velocity_x = 0;
	}
	else if(this.position.x < MIN_X)
	{
		this.position.x = MIN_X;
		this.data.velocity_x = 0;
	}

	if(this.position.y > GROUND_Y-BIRD_HEIGHT/2)
	{
		this.position.y = GROUND_Y-BIRD_HEIGHT/2
		this.data.velocity_y = -BIRD_FLAP_STRENGTH;
	}
	else if(this.position.y < MIN_Y)
	{
		this.position.y = MIN_Y;
		this.data.velocity_y = 0;
	}

}

function bird_updateActive(delta){

	bird_updatePhysics.call(this,delta);

    var hAccel = BIRD_HORIZ_ACCEL * delta;

    if(Input.isKeyDown(KEY_LEFT) || Input.isKeyDown(KEY_A))
    {
    	this.left = true;
    	this.data.velocity_x -= hAccel;
    }

    if(Input.isKeyDown(KEY_RIGHT) || Input.isKeyDown(KEY_D))
    {
    	this.left = false;
    	this.data.velocity_x += hAccel;
    }

}

function bird_updateIdle(){
    bird_updatePhysics.call(this,delta);
}

function distance ( a, b ){ // a and b are Entities!
    return Math.sqrt( Math.pow(a.position.x - b.position.x,2)+Math.pow(a.position.y - b.position.y,2));
}


function cloud_doKeyPress(code) {
		var mySpeed = CLOUD_MOVE_SPEED;
		
		if(code === KEY_LEFT || code === KEY_A) {
			this.data.velocity_x = -1*mySpeed;
			/*if((this.position.x - mySpeed) > MIN_X)
				this.position.x -= mySpeed;*/
		}
		if(code === KEY_RIGHT || code === KEY_D) {
			this.data.velocity_x = mySpeed;
			/*if(this.position.x + mySpeed < MAX_X)
				this.position.x += mySpeed;*/
		}
		
		if(code === KEY_SPACE) {
			var myHeight = 30;
			var rainHeight = 10;
			
			var rainEnt = Entities.types['rain'].clone();							
			rainEnt.position.x = this.position.x;
			rainEnt.position.y = this.position.y + this.sprites[activeEntity.id].getHeight()/2 + rainHeight/2;
			rainEnt.data.startingY = rainEnt.position.y;
			rainEnt.data.makeRainAbove = true;
			entities.push(rainEnt);
		}
		
}

function cloud_updateIdle() {
	this.timeToSwitch -= delta;
	if(this.timeToSwitch <= 0)
	{
		this.timeToSwitch += 5+(Math.random()*5);
		var rand = Math.random();
		var chanceToMove = .75;
		if(rand < chanceToMove/2 )
		{
			this.moving = -1;
		}
		else if (rand < chanceToMove)
		{
			this.moving = 1;
		}
		else
		{
			this.moving = 0;
		}
	}
	else
	{
		this.position.x += CLOUD_MOVE_SPEED*delta*this.moving;
	}
	if(this.position.x < MIN_X) this.position.x = MIN_X;
	if(this.position.x > MAX_X) this.position.x = MAX_X;
}

function cloud_updateActive() {
	if ( !(Input.isKeyDown(KEY_LEFT) || Input.isKeyDown(KEY_RIGHT) || Input.isKeyDown(KEY_A) || Input.isKeyDown(KEY_D)) ) {
		this.updateIdle();
	}
}

function cloud_initData() {
	this.moving = 0;
	this.timeToSwitch = 0;
}

function emptyFunction() {}

function rain_updateIdle() {
	
	debug(this.sprites.length);
	var myHeight = this.sprites[activeEntity.id].getHeight();
	var heightDiff = (this.position.y  - this.data.startingY);
	
	if(!input.isKeyDown(KEY_SPACE)) {
		this.data.makeRainAbove = false;
	} else if( makeRainAbove && activeEntity.name == "cloud" && (heightDiff % myHeight) == 0 ) {
		var rainEnt = Entities.types['rain'].clone();					
		rainEnt.position.x = this.position.x;
		rainEnt.position.y = this.position.y - myHeight;
		rainEnt.data.startingY = rainEnt.position.y;
		rainEnt.data.makeRainAbove = true;
		entities.push(rainEnt);
	}
	
	if(this.position.x < MIN_X || this.position.y < MIN_Y || this.position.x > MAX_X || this.position.y > MAX_Y) {
		this.removed = true;
	}
}

function rain_initData() {
	this.data.makeRainAbove = true;
	this.data.startingY = -1;
}

function flowers_updateIdle() {
	var activationDistance = 5;
	var growthRate = 0.5;
	
	var sun = findEntityWithName("sun");
	
	if(sun != null && this.data.size <= 10) {
		if( (Math.abs( sun.data.target.position.x - this.position.x) <= activationDistance) 
		&& (Math.abs( sun.data.target.position.y - this.position.y) <= activationDistance)) {
			this.data.size+=growthRate;
		}
	}
}

function flowers_initDate() {
	this.data.size = 1;
}

function rootNode_updateIdle() {
	var neededRain = 100;
	if(!this.data.active) {
		rainEnts = [];
		
		for(var i = 0; i < entities.length; i++) {
			if(entities[i].name == "rain") {
				rainEnts.push(entities[i]);
			}
		}
		
		var activationDistance = 5;
		for(var i=0; i<rainEnts.length; i++) {
			if( (Math.Abs(rainEnts[i].position.x - this.position.x) < activationDistance ) &&
				( Math.Abs(rainEnts[i].position.y - this.position.y) < activationDistance ) ) {
					this.data.rainAmt++;
			}
		}
		
		if(this.data.rainAmt >= neededRain) {
			this.data.activated = true;
			var sprout = findEntityWithName("sprout");
			if(sprout != null) {
				sprout.data.nodesWatered++;
			}
		}
	}
}

function findEntityWithName(name) {
	for(var i=0; i<entities.length; i++) {
		if(entities[i].name == name)
			return entities[i];
	}
	return null;
}

function rootNode_initData() {
	this.data.rainAmt = 0;
	this.data.active = false;
}
