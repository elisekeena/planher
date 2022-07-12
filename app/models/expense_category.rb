# frozen_string_literal: true

class ExpenseCategory < ApplicationRecord
  validates :name, uniqueness: true
end
