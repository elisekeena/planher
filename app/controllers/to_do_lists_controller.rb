class ToDoListsController < ApplicationController
    def index
        render json: ToDoList.all
    end
    

end
