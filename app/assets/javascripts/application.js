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
	pusher.connection.bind('connected', function(){
			var date = new Date;
			console.log (" Connected at " + date);
			var channel = pusher.subscribe('photo-call');	
			channel.bind("show", function(data){
				console.log("Show-photo is called")
				console.log(data);
				$("#upload-image-show").prepend("<img class ='showimage' src='"+data.photourl+"' />")
			});
			channel.bind("startvideo",function(data){
				
			})
			
	});
	pusher.connection.bind('disconnected' , function(){
		var date = new Date;
		console.log ("Disconnected at : " + date);
	});
});
