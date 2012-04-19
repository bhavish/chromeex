class HomeController < ApplicationController
  protect_from_forgery :except => [:uploadphoto]
  respond_to :json , :js
  #  Index and home landing page of the user.
  def index 
  end
  
  def uploadphoto
    @photo = Photo.new
    @photo.file = params[:file]
    if @photo.save
      Pusher['photo-call'].trigger('show', {
                    photourl: @photo.file.url
                  })
      render json: @photo
    end
  end
  
  def downloadphoto
    @photo = Photo.all.descending(:created_at).first
    respond_to do |format|
      format.json {render json: @photo}
    end
  end
  
  
  def project    
    # this was for the projet page.
  end
  
  def playvideo
    Pusher['photo-call'].trigger('play-video' , {
      control: "1"
    })
    render text: "ok"
  end
  
  def videocontrol
    Pusher['photo-call'].trigger('controller' , {
      forward: params[:forward]
    })
    render text: "ok"
  end
  
  def slideshow 
    Pusher['photo-call'].trigger('slideshow', {
      control: params[:value]
    })
    render text: "ok"
  end
  
end
