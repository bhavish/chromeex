Chromextension::Application.routes.draw do
  

  devise_for :users
  resources :home
  match '/dashboard' => "home#index", :as => :user_root
  
  match '/uploadphoto' , to: "home#uploadphoto"
  match '/downloadphoto', to: "home#downloadphoto"
  
  root :to => 'home#index'
  
end
