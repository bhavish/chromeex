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
				$("#slideshow").fadeOut(1000);
				$("#upload-image-show").fadeIn(1000);
				$("#upload-image-show").prepend("<img class ='download-image' src='"+data.photourl+"' />");
			});
			channel.bind("play-video",function(data){
				console.log ("Video should start playing here");
				// play the video here .. in fullscreen mode.
				console.log(data);
				$("#upload-image-show").slideUp(1000);
				$("#slideshow").hide();
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
					var cur = myplayer.currentTime();
					if (data.forward == 1){
					myplayer.currentTime(cur+5);
					}else if (data.forward == 0){
					if (cur > 5){	
					myplayer.currentTime(cur-5);
					}else {
					myplayer.currentTime(0);
					}	
					
					}
				}else {
					myplayer.play();
				}
			});
			
			channel.bind('slideshow',function(data){
				$("#slideshow").show();
				$("#video-section").hide();
				$("#upload-image-show").hide();
				console.log("The slideshow Called");
				if (data.forward == 1 ){
					$("#next").click();
				}else if (data.forward ==0){
					$("#previous").click();
				}
			});
			
			
			channel.bind('show-c',function(data){
				console.log("Download is called");
				console.log(data);
				$("#slideshow").hide();
				$("#upload-image-show").fadeIn(1000);
				$("#upload-image-show").prepend("<img class ='download-image' src='"+data.photourl+"' />");
				
			});
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




$(window).load(function(){
	
	// We are listening to the window.load event, so we can be sure
	// that the images in the slideshow are loaded properly.


	// Testing wether the current browser supports the canvas element:
	var supportCanvas = 'getContext' in document.createElement('canvas');

	// The canvas manipulations of the images are CPU intensive,
	// this is why we are using setTimeout to make them asynchronous
	// and improve the responsiveness of the page.

	var slides = $('#slideshow li'),
		current = 0,
		slideshow = {width:0,height:0};

	setTimeout(function(){
		
		window.console && window.console.time && console.time('Generated In');
		
		if(supportCanvas){
			$('#slideshow img').each(function(){

				if(!slideshow.width){
					// Taking the dimensions of the first image:
					slideshow.width = this.width;
					slideshow.height = this.height;
				}
				
				// Rendering the modified versions of the images:
				createCanvasOverlay(this);
			});
		}
		
		window.console && window.console.timeEnd && console.timeEnd('Generated In');
		
		$('#slideshow .arrow').click(function(){
			var li			= slides.eq(current),
				canvas		= li.find('canvas'),
				nextIndex	= 0;

			// Depending on whether this is the next or previous
			// arrow, calculate the index of the next slide accordingly.
			
			if($(this).hasClass('next')){
				nextIndex = current >= slides.length-1 ? 0 : current+1;
			}
			else {
				nextIndex = current <= 0 ? slides.length-1 : current-1;
			}

			var next = slides.eq(nextIndex);
			
			if(supportCanvas){

				// This browser supports canvas, fade it into view:

				canvas.fadeIn(function(){
					
					// Show the next slide below the current one:
					next.show();
					current = nextIndex;
					
					// Fade the current slide out of view:
					li.fadeOut(function(){
						li.removeClass('slideActive');
						canvas.hide();
						next.addClass('slideActive');
					});
				});
			}
			else {
				
				// This browser does not support canvas.
				// Use the plain version of the slideshow.
				
				current=nextIndex;
				next.addClass('slideActive').show();
				li.removeClass('slideActive').hide();
			}
		});
		
	},100);

	// This function takes an image and renders
	// a version of it similar to the Overlay blending
	// mode in Photoshop.
	
	function createCanvasOverlay(image){

		var canvas			= document.createElement('canvas'),
			canvasContext	= canvas.getContext("2d");
		
		// Make it the same size as the image
		canvas.width = slideshow.width;
		canvas.height = slideshow.height;
		
		// Drawing the default version of the image on the canvas:
		canvasContext.drawImage(image,0,0);
		

		// Taking the image data and storing it in the imageData array:
		var imageData	= canvasContext.getImageData(0,0,canvas.width,canvas.height),
			data		= imageData.data;
		
		// Loop through all the pixels in the imageData array, and modify
		// the red, green, and blue color values.
		
		for(var i = 0,z=data.length;i<z;i++){
			
			// The values for red, green and blue are consecutive elements
			// in the imageData array. We modify the three of them at once:
			
			data[i] = ((data[i] < 128) ? (2*data[i]*data[i] / 255) : (255 - 2 * (255 - data[i]) * (255 - data[i]) / 255));
			data[++i] = ((data[i] < 128) ? (2*data[i]*data[i] / 255) : (255 - 2 * (255 - data[i]) * (255 - data[i]) / 255));
			data[++i] = ((data[i] < 128) ? (2*data[i]*data[i] / 255) : (255 - 2 * (255 - data[i]) * (255 - data[i]) / 255));
			
			// After the RGB elements is the alpha value, but we leave it the same.
			++i;
		}
		
		// Putting the modified imageData back to the canvas.
		canvasContext.putImageData(imageData,0,0);
		
		// Inserting the canvas in the DOM, before the image:
		image.parentNode.insertBefore(canvas,image);
	}
	
});



/*
	this is the section for savethylife
*/

	