class UserToDoList < ApplicationRecord
    belongs_to :user
    belongs_to :to_do_list
end
