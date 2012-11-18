var g_resources = [{name: "tiles",
		    type: "image",
		    src:  "priv/images/tiles.png"},
		   {name: "level1",
		    type: "tmx",
		    src:  "priv/levels/level1.tmx"},
		   {name: "player",
		    type: "image",
		    src:  "priv/images/player.png"},
		   {name: "metatiles",
		    type: "image",
		    src:  "priv/images/metatiles.png"}
		  ];

var jsApp = {
    onload: function() {
	if(!me.video.init('jsapp', 640, 480, false, 1.0)) {
	    alert("Need HTML 5.0 supported browser!");
	    return;
	}
	me.loader.onload = this.loaded.bind(this);
	me.loader.preload(g_resources);
	me.state.change(me.state.LOADING);
    },
    loaded: function() {
	me.state.set(me.state.PLAY, new PlayScreen());
	me.entityPool.add("player", PlayerEntity);

	// set key input
	me.input.bindKey(me.input.KEY.LEFT, "left");
	me.input.bindKey(me.input.KEY.RIGHT, "right");

	me.state.change(me.state.PLAY);	
    }
};

var PlayScreen = me.ScreenObject.extend({
    onResetEvent: function() {
	//load level 1
	me.levelDirector.loadLevel("level1");
    },
    onDestroyEvent : function() {
    }
});

window.onReady(function() {
    jsApp.onload();
});