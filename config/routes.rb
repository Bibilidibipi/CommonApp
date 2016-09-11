Rails.application.routes.draw do
  root 'static_pages#root'

  resources :users, only: [:new, :create, :destroy]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :applications, only: [:index, :update, :destroy]
    resources :banks, only: [:create, :show, :destroy]
    resources :cars, only: [:create, :show, :destroy]
    resources :debts, only: [:create, :show, :destroy]
    resources :emergencies, only: [:create, :show, :destroy]
    resources :employers, only: [:create, :show, :destroy]
    resources :previous_addresses, only: [:create, :show, :destroy]
    resources :references, only: [:create, :show, :destroy]
  end
end
