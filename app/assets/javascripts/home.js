$(function(){
	// this will take care of all the pusher and other activities that take place on the screen.
	var myplayer = _V_("my_video_1");
	var playeractive = false;
	pusher.connection.bind('connected', function(){
			var date = new Date;
			console.log (" Connected at " + date);
			var channel = pusher.subscribe('photo-call');	
			
			channel.bind("play-video",function(data){
				console.log ("Video should start playing here");
				// play the video here .. in fullscreen mode.
				console.log(data);
				myplayer.size(1000,1000);
				myplayer.play();				
  				myplayer.requestFullScreen();
				playeractive = true;
			});

			channel.bind("add-video-to-queue", function(data){
				// now  add the video to the queue
			});

			channel.bind("pause-video", function(){
				// pause the current video that is being played
			});

			channel.bind("play-next-video-in-queue", function(data){
				// here play the next video in queue
			});
			
	// Functions to pause the video, add a video to the url should be done from here. 			
	});


	pusher.connection.bind('disconnected' , function(){
		var date = new Date;
		console.log ("Disconnected at : " + date);
	});
	
	var stopplayer = function(){
	      var myplayer = this;
	      playeractive = false;
	    };
	 myPlayer.addEvent("ended", stopplayer);
});

