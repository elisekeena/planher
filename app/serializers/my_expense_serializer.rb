# frozen_string_literal: true

class MyExpenseSerializer < ActiveModel::Serializer
  attributes :id, :category, :amount, :date
end
