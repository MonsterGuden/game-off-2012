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
        // get all collisions
	var res = me.game.collide(this);

        if(res && res.obj.type == "game_complete")
            me.state.change(me.state.GAME_END);

	if(me.input.isKeyPressed("jump")) {
	    if(!this.falling && !this.jumping) {
                if (res && res.obj.type == "jumper")
                    this.vel.y = -this.maxVel.y;
                else
		    this.vel.y = -this.jumpVelocity * me.timer.tick;
		this.jumping = true;
	    }
	}
	this.vel.x += this.accel.x * me.timer.tick;
	this.updateMovement();
	this.parent(true);
	return true;
    }
});

var JumperEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
	this.parent(x, y, settings);
	this.yVelocity = 300000;
	this.type = JUMPER;
	this.collidable = true;
	this.type = "jumper";
	this.updateColRect(11, 10, -1, 0);
    },
    update: function() {
    }
});

var GameCompleteEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
	this.parent(x, y, settings);
	this.collidable = true;
	this.type = "game_complete";
    },
    update: function() {
    }
});