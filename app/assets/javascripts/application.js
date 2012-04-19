// This is a manifest file that'll be compiled into including all the files listed below.
// Add new JavaScript/Coffee code in separate files in this directory and they'll automatically
// be included in the compiled file accessible from http://example.com/assets/application.js
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

$(function(){
	// this will take care of all the pusher and other activities that take place on the screen.
	var myplayer = _V_("my_video_1");
	var playeractive = false;
	pusher.connection.bind('connected', function(){
			var date = new Date;
			console.log (" Connected at " + date);
			var channel = pusher.subscribe('photo-call');	
			channel.bind("show", function(data){
				console.log("Show-photo is called");
				console.log(data);
				$("#upload-image-show").prepend("<img class ='download-image' src='"+data.photourl+"' />");
			});
			channel.bind("play-video",function(data){
				console.log ("Video should start playing here");
				// play the video here .. in fullscreen mode.
				console.log(data);
				$("#upload-image-show").slideUp(1000);
				$("#video-section").fadeIn(1000);	
				myplayer.size(1000,1000);
				myplayer.play();				
  				myplayer.requestFullScreen();
				playeractive = true;
			});
			channel.bind('controller',function(data){
				console.log("The video controller is done in this secion of the page");
				console.log(data);
				if (playeractive){
					if (data.forward == 1){
					myplayer.currentTime(5);
					}else{
					myplayer.currentTime(-5);
					}
				}else {
					myplayer.play();
				}
			});
			
			channel.bind('slideshow',function(){
				console.log("The slideshow functions are on this");
			});
	});
	pusher.connection.bind('disconnected' , function(){
		var date = new Date;
		console.log ("Disconnected at : " + date);
	});
	
	var stopplayer = function(){
	      var myPlayer = this;
	      playeractive = false;
	    };
	 myPlayer.addEvent("ended", stopplayer);
});
