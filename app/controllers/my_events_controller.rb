# frozen_string_literal: true

class MyEventsController < ApplicationController
  def index
    render json: MyEvent.all
  end

  def show
    category = MyEvent.where(:user_id => [params[:id]])
    render json: category
  end
end
