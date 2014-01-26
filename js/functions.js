function squirrel_doKeyPress ( code ){
    if( code == KEY_LEFT || code == KEY_A){
	this.position.x -= 10;
	if (this.position.x < MIN_X)
	    x += 10;
	else if(this.data.hasAcorn)
	    this.data.acorn.position.x -= 10;
    }else if( code == KEY_RIGHT || code == KEY_D){
	this.position.x += 10;
	if(this.position.x > MAX_X)
	    x -= 10;
	else if(this.data.hasAcorn)
	    this.data.acorn.position.x += 10;
    }else if ( code == KEY_SPACE){
	//squirrel drops acorn or else tries to pick one up
	if ( this.data.hasAcorn){
	    this.data.hasAcorn = false;
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
    if (this.name == "sprout"){
	if(code == KEY_SPACE && this.data.nodesWatered == 4){
	    var t = new Enitity({doKeyPress : tree_doKeyPress, sprites:Sprites.TreeSprites, updateIdle:this.updateIdle, updateActive: this.updateActive, drawPost:this.drawPost, active:true, id:this.id, name:"sapling"});
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
		var t = new Enitity({doKeyPress : tree_doKeyPress, sprites:Sprites.TreeSprites, updateIdle:this.updateIdle, updateActive: this.updateActive, drawPost:this.drawPost, active:true, id:this.id, name:"tree"});
	    t.position.x = this.position.x;
	    t.position.y = this.position.y;
	    for(var i = 0; i < entities.length; i++){
		if(entities[i] == this)
		    entities.splice(i,1,t);
		
	    }
	    }
	}
	
    }else if (this.name == "tree"){
	
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
    if(Math.random() < 0.05){
	this.position.x += 5;
    }
    else if(Math.random() < 0.1){
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

function bird_updateActive(delta){
    this.position.x += this.data.velocity_x*delta;
    this.position.y += this.data.velocity_y*delta;

    var hAccel = BIRD_HORIZ_ACCEL * delta;

    var decay = BIRD_HORIZ_DECAY*delta;
    if(Math.abs(this.data.velocity_x) < decay)
    	this.data.velocity_x = 0;

    else if(this.data.velocity_x > 0)
		this.data.velocity_x -= decay;

    else if(this.data.velocity_x < 0)
	this.data.velocity_x += decay;

    if(Input.isKeyDown(KEY_LEFT) || Input.isKeyDown(KEY_A))
    {
    	this.data.velocity_x -= hAccel;
    }

    if(Input.isKeyDown(KEY_RIGHT) || Input.isKeyDown(KEY_D))
    {
    	this.data.velocity_x += hAccel;
    }

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

function bird_updateIdle(){
    this.data.velocity_x += (Math.random() - 0.5)/100;
    if(Math.random() < 0.01)
	this.data.velocity_x *= -1;
    else if(Math.random() < 0.03)
	this.data.velocity_y -= 0.2;
     this.position.x += this.data.velocity_x;
    this.position.y += this.data.velocity_y;
    if(this.data.velocity_x > 0)
	this.data.velocity_x -= 0.01;
    if(this.data.velocity_x < 0)
	this.data.velocity_x += 0.01;
    this.data.velocity_y += 0.006;
    if(this.position.x > MAX_X)
	this.position.x = MAX_X;
    if(this.position.x < MIN_X)
	this.position.x = MIN_X;
    if(this.position.y > GROUND_Y)
	this.position.y = GROUND_Y;
    if(this.position.y < MIN_Y)
	this.position.y = MIN_Y;
}

function distance ( a, b ){ // a and b are Entities!
    return Math.sqrt( Math.pow(a.position.x - b.position.x,2)+Math.pow(a.position.y - b.position.y,2));
}