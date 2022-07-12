# frozen_string_literal: true

class ToDoListsController < ApplicationController
  def index
    render json: ToDoList.all
  end
  
  def show
    category = ToDoList.where(:user_id => [params[:id]])
    render json: category
  end

end
