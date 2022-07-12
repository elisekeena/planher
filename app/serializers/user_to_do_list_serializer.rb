# frozen_string_literal: true

class UserToDoListSerializer < ActiveModel::Serializer
  attributes :id, :to_do_list_id
end
