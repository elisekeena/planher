# frozen_string_literal: true

class UserMyEvent < ApplicationRecord
  belongs_to :user
  belongs_to :my_event
end
