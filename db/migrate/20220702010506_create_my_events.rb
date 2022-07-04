class CreateMyEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :my_events do |t|
      t.string :name
      t.datetime :datetime
      t.string :location
      t.integer :user_id

      t.timestamps
    end
  end
end
