# frozen_string_literal: true

class QuoteOfTheDaySerializer < ActiveModel::Serializer
  attributes :id, :quote, :date, :display
end
