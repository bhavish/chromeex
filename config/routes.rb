Chromextension::Application.routes.draw do
  devise_for :users
  resources :home
  match '/dashboard' => "home#project", :as => :user_root
  match '/uploadphoto' , to: "home#uploadphoto"
  match '/downloadphoto', to: "home#downloadphoto"
  match '/playvideo', to: "home#playvideo"
  match '/videocontrol', to: "home#videocontrol"
  match '/slideshow', to: "home#slideshow"
  match '/uploadcphoto' , to: "home#uploadcphoto"
  match '/downloadphotoaction', to: "home#downloadphotoaction"
  match '/uploadurl', to: "home#uploadurl"
  match '/downloadurl', to: "home#downloadurl"
  match '/uploadphotototablet', to: "home#uploadphotototablet"
  root :to => 'home#index'
end
