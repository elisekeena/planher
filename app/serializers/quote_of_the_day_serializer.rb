class QuoteOfTheDaySerializer < ActiveModel::Serializer
  attributes :id, :quote, :date, :display
end
