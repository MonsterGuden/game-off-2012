var jsApp = {
    onload: function() {
	if(!me.video.init('jsapp', 640, 480, false, 1.0)) {
	    alert("Need HTML 5.0 supported browser!");
	    return;
	}
	me.loader.onload = this.loaded.bind(this);
	me.state.change(me.state.LOADING);
    },
    loaded: function() {
	me.state.set(me.state.PLAY, new PlayScreen());
	me.state.change(me.state.PLAY);
    }
};

var PlayScreen = me.ScreenObject.extend({
    onResetEvent: function() {
    },
    onDestroyEvent : function() {
    }
});

window.onReady(function() {
    jsApp.onload();
});