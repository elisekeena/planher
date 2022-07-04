class MyExpenseSerializer < ActiveModel::Serializer
  attributes :id, :category, :amount, :date
end
