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
    photo = Photo.all.descending(:created_at).first
    Pusher['photo-call'].trigger('show-c', {
      photourl: photo.file.url
    })
    render text: "ok"
    
  end
  
  
  def uploadcphoto
    photo = Photo.new
    photo.fromc = true
    photo.file = params[:file]
    if photo.save
      render json: photo
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
    Rails.logger.debug params[:forward]
    Pusher['photo-call'].trigger('slideshow', {
      forward: params[:forward]
    })
    render text: "ok"
  end
  
  
  def downloadphotoaction
    photo = Photo.all.descending(:created_at).first
    Pusher['photo-call'].trigger('show-c', {
      photourl: photo.file.url
    })
    render text: "ok"
    
  end
  
end
