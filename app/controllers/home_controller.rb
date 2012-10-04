class HomeController < ApplicationController
  protect_from_forgery :except => [:uploadphoto]
  respond_to :json , :js
  
  
  def index 
    
  end
  
  
 
    #play the given video that is currently being played
  def playvideo
    Pusher['photo-call'].trigger('play-video' , {
      control: "1"
    })
    render text: "ok"
  end
 
  #call the pusher to pause the video
  def pausevideo
    Pusher['photo-call'].trigger('pause-video' , {
      control: "1"
    })
    render text: "ok"
  end 
 
 #call  pusher to play the previous video in the list
 def backwardvideo
  Pusher['photo-call'].trigger('previous-video' , {
      control: "1"
    })
    render text: "ok"
 end
 
 #call pusher to play the next video in the list
 def forwardvideo
  Pusher['photo-call'].trigger('next-video' , {
      control: "1"
    })
    render text: "ok"
 end
  

  #add the given video url to the queue or based on the ID
def addvideotoqueue
end

end
