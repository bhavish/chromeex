$(function(){
	// this will take care of all the pusher and other activities that take place on the screen.

	console.log(ythandle);
	pusher.connection.bind('connected', function(){
			var date = new Date;
			console.log (" Connected at " + date);
			var channel = pusher.subscribe('photo-call');	
			
			channel.bind("play-video",function(data){
				console.log ("Play Video called");
				// play the video here .. in fullscreen mode.
				// youtubeapi.play
				console.log(data);
				ythandle.playVideo();
			});

			channel.bind("add-video-to-queue", function(data){
				// now  add the video to the queue

			});

			channel.bind("pause-video", function(){
				// pause the current video that is being played
				console.log("Pause video called");
				ythandle.pauseVideo();
			});

			channel.bind("play-next-video-in-queue", function(data){

			})

	// Functions to pause the video, add a video to the url should be done from here. 			
	});


	pusher.connection.bind('disconnected' , function(){
		var date = new Date;
		console.log ("Disconnected at : " + date);
	});
	
});

