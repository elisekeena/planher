# frozen_string_literal: true

class CreateUserMyEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :user_my_events do |t|
      t.integer :user_id
      t.integer :my_event_id

      t.timestamps
    end
  end
end
