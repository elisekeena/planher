class MyExpense < ApplicationRecord
    belongs_to :user
    belongs_to :user_my_expense, optional: true

    validate :catergory_exists

    private
    def catergory_exists
        categories = ExpenseCategory.all.pluck(:name)
        unless categories.include?(self.category)
            errors.add(:catergory, "must be one of #{categories}")
        end
    end

end
