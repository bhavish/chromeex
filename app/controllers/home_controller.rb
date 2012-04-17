class HomeController < ApplicationController
  protect_from_forgery :except => [:uploadphoto]
  respond_to :json
  #  Index and home landing page of the user.
  def index
    
  end
  
  def uploadphoto
    @photo = Photo.new(params[:image])
    if @photo.save
      respond_to do |format|
        format.js 
      end
    else
      
    end
  end
  
  def downloadphoto
    @photo = Photo.all.descending(:created_at).first
    
    respond_to do |format|
      format.json {render json: @photo}
    end
  end
end
