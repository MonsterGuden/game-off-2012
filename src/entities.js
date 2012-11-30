var PlayerEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
	this.parent(x, y, settings);

	//set velocity
	this.setVelocity(3, 10);
	this.gravity = 0.3;
	this.jumpVelocity = 5;
	this.direction = 1;
	this.flipx = false;
	
	// follow our position
	me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

	if(settings.left == true)
	    this.rotate();
    },
    update: function() {
        // get all collisions
	var res = me.game.collide(this);

        if(res && res.obj.type == "game_complete")
            me.state.change(me.state.GAME_END);
        if(res && res.obj.type == "lava")
        {
            me.levelDirector.reloadLevel();
        }
	if(res && res.obj.type == "rotator")
	{
            res.obj.collision();
            this.rotate();
	}

	if(me.input.isKeyPressed("jump")) {
	    if(!this.falling && !this.jumping) {
                if (res && res.obj.type == "jumper")
                    this.vel.y = -this.maxVel.y;
                else
		    this.vel.y = -this.jumpVelocity * me.timer.tick;
		this.jumping = true;
	    }
	}
	this.vel.x = this.accel.x * me.timer.tick * this.direction;
	this.updateMovement();
	this.parent(true);
	return true;
    },
    rotate: function() {
	this.direction *= -1;
	this.flipx = !this.flipx;
	this.flipX(this.flipx);
    }
});

var JumperEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
	this.parent(x, y, settings);
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

var RotatorEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
	this.parent(x, y, settings);
	this.collidable = true;
	this.type = "rotator";
	this.ticks = 0;
    },
    update: function() {
        if(!this.collidable)
        {
            if(this.ticks < 100)
                this.ticks += me.timer.tick;
            else
                this.collidable = true;
        }
    },
    collision: function() {
        this.ticks = 0;
        this.collidable = false;
    }
});

var LavaEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
	this.parent(x, y, settings);
        this.objectHeight = settings.height;
        this.objectWidth = settings.width;
	this.collidable = true;
        this.drawHeight = settings.height/2;
        this.drawWidth = settings.width;
        this.maxDrawHeight = this.objectHeight - 6;
        this.minDrawHeight = 10;
        this.drawPosY = this.pos.y + this.drawHeight;
        this.direction = 1;
        this.updateColRect(0, this.objectWidth, 0, this.drawHeight);
        this.type ="lava";
    },
    update: function() {
        if(this.drawHeight == this.maxDrawHeight)
            this.direction = -1;
        else if(this.drawHeight == this.minDrawHeight)
            this.direction = 1;

        this.drawHeight += this.direction;

        this.drawPosY = this.pos.y + (32 - this.drawHeight);
        me.debug.renderHitBox = true;
        this.updateColRect(0, this.objectWidth, 0, this.objectHeight);
        return true;
    },
    draw: function(context) {
        context.fillStyle = "#a20303";
        context.fillRect(this.pos.x, this.drawPosY,
                         this.drawWidth, this.drawHeight);
    },
});
