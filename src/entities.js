var PlayerEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
	this.parent(x, y, settings);

	//set velocity
	this.setVelocity(2, 10);
	this.gravity = 0.2;
	this.jumpVelocity = 5;
	
	// follow our position
	me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    },
    update: function() {
	if(me.input.isKeyPressed("jump")) {
	    if(!this.falling && !this.jumping) {
		this.vel.y = -this.jumpVelocity * me.timer.tick;
		this.jumping = true;
	    }
	}
	this.vel.x += this.accel.x * me.timer.tick;
	this.updateMovement();

	var res = me.game.collide(this);
	if (res) {
	    this.vel.y = -this.maxVel.y;
	    this.jumping = true;
	    this.updateMovement();
	}
	else
	    return true;
	return true;
    }
});

var JumperEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
	this.parent(x, y, settings);
	this.yVelocity = 300000;
	this.type = JUMPER;
	this.collidable = true;
    },
    update: function() {
    }
});