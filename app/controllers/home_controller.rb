class HomeController < ApplicationController
  
  before_filter :authenticate_user!
  #  Index and home landing page of the user.
  def index
    
  end
  
end
