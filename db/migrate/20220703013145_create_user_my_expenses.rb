class CreateUserMyExpenses < ActiveRecord::Migration[6.1]
  def change
    create_table :user_my_expenses do |t|
      t.integer :user_id
      t.integer :my_expense_id

      t.timestamps
    end
  end
end
