Chromextension::Application.routes.draw do
  devise_for :users
  resources :home
  
  # default routes that are need to pass the parameter
  match '/dashboard' => "home#project", :as => :user_root
  match '/playvideo' => "home#playvideo"
  match '/pausevideo' => "home#pausevideo"
  match '/previousvideo'=> "home#backwardvideo"
  match '/nextvideo' => "home#forwardvideo"
  match '/addvideotoqueue' => "home#addvideotoqueue"
  root :to => 'home#index'
end
