# frozen_string_literal: true

class CreateQuoteOfTheDays < ActiveRecord::Migration[6.1]
  def change
    create_table :quote_of_the_days do |t|
      t.string :quote
      t.date :date
      t.boolean :display

      t.timestamps
    end
  end
end
