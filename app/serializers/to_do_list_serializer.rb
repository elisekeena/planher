class ToDoListSerializer < ActiveModel::Serializer
  attributes :id, :task, :status
end
