class ToDoListSerializer < ActiveModel::Serializer
  attributes :id, :task, :note, :status
end
