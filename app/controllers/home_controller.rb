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
      render json: @photo
    end
  end
  
  def downloadphoto
    @photo = Photo.all.descending(:created_at).first
    
    respond_to do |format|
      format.json {render json: @photo}
    end
  end
end
