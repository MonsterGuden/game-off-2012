var PlayerEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
	this.parent(x, y, settings);

	//set velocity
	this.setVelocity(3, 15);
	
	// follow our position
	me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
    },
    update: function() {
	if (me.input.isKeyPressed("left")) {
	    this.vel.x -= this.accel.x * me.timer.tick;
	}
	else if (me.input.isKeyPressed("right")) {
	    this.vel.x += this.accel.x * me.timer.tick;
	}
	else {
	    this.vel.x = 0;
	}
	this.updateMovement();
	return true;
    }
});