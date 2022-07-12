# frozen_string_literal: true

class CreateMyEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :my_events do |t|
      t.string :title 
      # t.datetime :datetime
      # t.string :location
      t.integer :user_id
      t.string :start
      t.string :end
      t.boolean :all_day

      t.timestamps
    end
  end
end
