Rails.application.routes.draw do
  resources :player_planets
  resources :planets
  resources :npcs
  resources :potions
  resources :weapons
  resources :types
  resources :players
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
