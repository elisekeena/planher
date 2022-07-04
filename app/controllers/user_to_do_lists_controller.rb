class UserToDoListsController < ApplicationController

    def show
        todo = ToDoList.find(params[:id])
        render json: todo
    end
    
    def create
        to_do_list = ToDoList.create!(to_do_list_params)
        usertodo = UserToDoList.create!(:user_id => to_do_list.user_id, :to_do_list_id => to_do_list.id)
        render json: to_do_list, status: :created
    end

    def update 
        todolist = ToDoList.find(params[:to_do_list_id])
        todolist.update!(to_do_list_params)
        render json: todolist, status: :accepted
    end


    def destroy
        usertodolist = UserToDoList.find_by(user_id: params[:user_id], to_do_list_id: params[:to_do_list_id])
        if usertodolist
            usertodolist.destroy
        end
        todolist= ToDoList.find_by(id: params[:to_do_list_id])
        if todolist
            todolist.destroy
        end

        head :no_content
    end

    private

    def to_do_list_params
        params.permit(:user_id, :task, :status)
    end

end
