# frozen_string_literal: true

class MyExpense < ApplicationRecord
  belongs_to :user
  belongs_to :user_my_expense, optional: true

  validate :catergory_exists

  private

  def catergory_exists
    categories = ExpenseCategory.all.pluck(:name)
    errors.add(:catergory, "must be one of #{categories}") unless categories.include?(category)
  end
end
