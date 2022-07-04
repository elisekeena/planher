class UserMyExpense < ApplicationRecord
    belongs_to :user
    belongs_to :my_expense

end
