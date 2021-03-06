var g_resources = [{name: "tiles",
		    type: "image",
		    src:  "priv/images/tiles.png"},
		   {name: "Level 1",
		    type: "tmx",
		    src:  "priv/levels/level1.tmx"},
		   {name: "Level 2",
		    type: "tmx",
		    src:  "priv/levels/level2.tmx"},
		   {name: "Level 3",
		    type: "tmx",
		    src:  "priv/levels/level3.tmx"},
		   {name: "Level 4",
		    type: "tmx",
		    src:  "priv/levels/level4.tmx"},
		   {name: "Level 5",
		    type: "tmx",
		    src:  "priv/levels/level5.tmx"},
		   {name: "Level 6",
		    type: "tmx",
		    src:  "priv/levels/level6.tmx"},
		   {name: "Level 7",
		    type: "tmx",
		    src:  "priv/levels/level7.tmx"},
		   {name: "Level 8",
		    type: "tmx",
		    src:  "priv/levels/level8.tmx"},
		   {name: "Level 9",
		    type: "tmx",
		    src:  "priv/levels/level9.tmx"},
		   {name: "Level 10",
		    type: "tmx",
		    src:  "priv/levels/level10.tmx"},
		   {name: "Level 11",
		    type: "tmx",
		    src:  "priv/levels/level11.tmx"},
		   {name: "Level 12",
		    type: "tmx",
		    src:  "priv/levels/level12.tmx"},
		   {name: "Level 13",
		    type: "tmx",
		    src:  "priv/levels/level13.tmx"},
		   {name: "Level 14",
		    type: "tmx",
		    src:  "priv/levels/level14.tmx"},
		   {name: "Level 15",
		    type: "tmx",
		    src:  "priv/levels/level15.tmx"},
		   {name: "Level 16",
		    type: "tmx",
		    src:  "priv/levels/level16.tmx"},
		   {name: "player",
		    type: "image",
		    src:  "priv/images/player.png"},
		   {name: "goal",
		    type: "image",
		    src:  "priv/images/goal.png"},
		   {name: "metatiles",
		    type: "image",
		    src:  "priv/images/metatiles.png"},
		   {name: "jumper",
		    type: "image",
		    src:  "priv/images/jumper.png"},
		   {name: "rotator",
		    type: "image",
		    src:  "priv/images/rotator.png"},
		   {name: "titlescreen",
		    type: "image",
		    src:  "priv/images/titlescreen.png"},
		   {name: "endscreen",
		    type: "image",
		    src:  "priv/images/endscreen.png"},
		   {name: "background",
		    type: "image",
		    src:  "priv/images/background.png"},
		  ];

var levelCounter = {
    onload: function() {
	this.text = document.getElementById("level");
	this.reset();
    },
    reset: function() {
	this.text.innerHTML = "level 0";
    },
    set: function(level) {
	this.text.innerHTML = level;
    }
};

var deathCounter = {
    onload: function() {
	this.text = document.getElementById("deathcounter");
	this.nrOfDeaths = 0;
	this.reset();
    },
    reset: function() {
	this.nrOfDeaths = 0;
	this.update();
    },
    update: function() {
	this.text.innerHTML = this.nrOfDeaths;
    },
    increase: function() {
	this.nrOfDeaths += 1;
	this.update();
    }
};

var jsApp = {
    onload: function() {
	if(!me.video.init('jsapp', 640, 480, false, 1.0)) {
	    alert("Need HTML 5.0 supported browser!");
	    return;
	}
        me.sys.fps = 30;
	me.loader.onload = this.loaded.bind(this);
	me.loader.preload(g_resources);
	me.state.change(me.state.LOADING);
    },
    loaded: function() {
	me.state.set(me.state.MENU, new TitleScreen());
	me.state.set(me.state.PLAY, new PlayScreen());
	me.state.set(me.state.GAME_END, new EndScreen());
	me.entityPool.add("player", PlayerEntity);
	me.entityPool.add("jumper", JumperEntity);
	me.entityPool.add("game_complete", GameCompleteEntity);
	me.entityPool.add("rotator", RotatorEntity);
	me.entityPool.add("lava", LavaEntity);

	me.state.change(me.state.MENU);
    }
};

window.onReady(function() {
    levelCounter.onload();
    deathCounter.onload();
    jsApp.onload();
});