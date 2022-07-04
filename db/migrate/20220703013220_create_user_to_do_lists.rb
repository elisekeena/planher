class CreateUserToDoLists < ActiveRecord::Migration[6.1]
  def change
    create_table :user_to_do_lists do |t|
      t.integer :user_id
      t.integer :to_do_list_id

      t.timestamps
    end
  end
end
