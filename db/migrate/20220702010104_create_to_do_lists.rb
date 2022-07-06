class CreateToDoLists < ActiveRecord::Migration[6.1]
  def change
    create_table :to_do_lists do |t|
      t.string :task
      t.string :status
      t.string :note
      t.integer :user_id

      t.timestamps
    end
  end
end
