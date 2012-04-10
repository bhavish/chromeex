class HomeController < ApplicationController
  protect_from_forgery :except => [:uploadphoto]
  respond_to :json
  #  Index and home landing page of the user.
  def index
    
  end
  
  def uploadphoto
    @photo = Photo.new(params[:photo])
    if @photo.save
      @photo.status = "ok"
      respond_to do |format|
        format.json {render json: @photo}
      end
    else
      @photo.status = "error"
      respond_to do |format|
        format.json {render json: @photo}
      end
    end
  end
  
  def downloadphoto
    @photo = Photo.all.descending(:created_at).first
    
    respond_to do |format|
      format.json {render json: @photo}
    end
  end
end
