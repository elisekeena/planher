class MyEventSerializer < ActiveModel::Serializer
  attributes :id, :name, :datetime, :location, :user_id
end
