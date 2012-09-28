class HomeController < ApplicationController
  protect_from_forgery :except => [:uploadphoto]
  respond_to :json , :js
  
  
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
  
  
  def uploadurl
    paramurl = params[:url]
    #clean the url 
    url = Url.new
    url.website_url = paramurl
    
    if url.save
      render json: url
    end    
  end

  def downloadurl
    url = Url.all.descending(:created_at).first
    Pusher['photo-call'].trigger('url-show', {
      weburl: url.website_url
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
  
  def uploadphotototablet
     @photo = Photo.new
     @photo.file = params[:file]
     if @photo.save
       Pusher['publish-photo'].trigger('show', {
                     photourl: @photo.file.url
                   })
       render json: @photo
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
  
  
  def savethylife
    
  end
  
end
