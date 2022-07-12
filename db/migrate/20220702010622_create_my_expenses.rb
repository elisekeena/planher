# frozen_string_literal: true

class CreateMyExpenses < ActiveRecord::Migration[6.1]
  def change
    create_table :my_expenses do |t|
      t.string :category
      t.float :amount
      t.date :date
      t.integer :user_id

      t.timestamps
    end
  end
end
