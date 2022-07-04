class MyEvent < ApplicationRecord
    belongs_to :user
    belongs_to :user_my_event, optional: true
end
