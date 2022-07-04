Rails.application.routes.draw do
  
  resources :expense_categories
  resources :user_to_do_lists
  resources :user_my_expenses
  resources :user_my_events
  resources :users
  resources :quote_of_the_days
  resources :my_expenses
  resources :my_events
  resources :to_do_lists
  delete "/delete_event", to: "user_my_events#destroy"
  patch "/update_event", to: "user_my_events#update"
  patch "/update_to_do_list", to: "user_to_do_lists#update"
  delete "/delete_to_do_list", to: "user_to_do_lists#destroy"
  patch "/update_expense_category", to: "expense_categories#update"
  delete "/delete_expense_category", to: "expense_categories#destroy"
  patch "/update_user_my_expense", to: "user_my_expenses#update"
  delete "/delete_expense", to: "user_my_expenses#destroy"

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
