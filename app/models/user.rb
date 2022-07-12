# frozen_string_literal: true

class User < ApplicationRecord
  has_many :user_my_events
  has_many :my_events, through: :user_my_events

  has_many :user_my_expenses
  has_many :my_expenses, through: :user_my_expenses

  has_many :user_to_do_lists
  has_many :to_do_lists, through: :user_to_do_lists
end
