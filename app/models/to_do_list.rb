# frozen_string_literal: true

class ToDoList < ApplicationRecord
  belongs_to :user
  belongs_to :user_to_do_list, optional: true
end
