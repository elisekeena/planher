# frozen_string_literal: true

class MyEventSerializer < ActiveModel::Serializer
  attributes :id, :title, :start, :end, :all_day, :user_id
end
