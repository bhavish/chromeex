Chromextension::Application.routes.draw do
  

  devise_for :users
  resources :home
  match '/dashboard' => "home#index", :as => :user_root
  root :to => 'home#index'
  
end
