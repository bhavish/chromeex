Chromextension::Application.routes.draw do
  devise_for :users
  resources :home
  
  # default routes that are need to pass the parameter
  match '/dashboard' => "home#project", :as => :user_root
  match '/playvideo' => "home#playvideo"
  match '/pausevideo' => "home#pausevideo"
  match '/backwardvideo'=> "home#backwardvideo"
  match '/forwardvideo' => "home#forwardvideo"
  match '/addvideotoqueue' => "home#addvideotoqueue"
  root :to => 'home#index'
end
