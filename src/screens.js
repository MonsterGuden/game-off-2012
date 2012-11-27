function bind(name) {
    me.input.bindKey(me.input.KEY.SPACE, name);
    me.input.bindTouch(me.input.KEY.SPACE);
    me.input.bindMouse(me.input.mouse.LEFT, me.input.KEY.SPACE);
}

function unbind(name) {
    me.input.unbindKey(me.input.KEY.SPACE);
    me.input.unbindTouch(me.input.KEY.SPACE);
    me.input.unbindMouse(me.input.mouse.LEFT);
}

var TitleScreen = me.ScreenObject.extend({
    init: function() {
	this.parent(true);
    },
    onResetEvent: function() {
	if (this.bg == null) {
	    this.bg = me.loader.getImage("titlescreen");
	}	
	bind("continue");
    },
    update: function() {
	if (me.input.isKeyPressed("continue")) {
	    me.state.change(me.state.PLAY);
	}
	return true;
    },
    draw: function(context) {
	context.drawImage(this.bg, 0, 0);
    },
    onDestroyEvent: function() {
	unbind();
    }
});

var PlayScreen = me.ScreenObject.extend({
    onResetEvent: function(arguments) {
	//load level 1
	me.levelDirector.loadLevel("Level 6");

	bind("jump");
	me.game.sort();
    },
    onDestroyEvent : function() {
	unbind();
    }
});

var EndScreen = me.ScreenObject.extend({
    init: function() {
	this.parent(true);
    },
    onResetEvent: function() {
	if (this.bg == null) {
	    this.bg = me.loader.getImage("endscreen");
	}
	bind("quit");
    },
    update: function() {
	if (me.input.isKeyPressed("quit")) {
	    me.state.change(me.state.MENU);
	}
	return true;
    },
    draw: function(context) {
	context.drawImage(this.bg, 0, 0);
    },
    onDestroyEvent: function() {
	unbind();
    }
});