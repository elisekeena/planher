# frozen_string_literal: true

class ToDoListSerializer < ActiveModel::Serializer
  attributes :id, :task, :note, :status, :user_id
end
