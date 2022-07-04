class ExpenseCategory < ApplicationRecord
    validates :name, uniqueness: true
    
end
