# frozen_string_literal: true

class SessionsController < ApplicationController
  # def create
  #   # puts "ran create in sessions controller"
  #   user = User.find_by(username: params[:username])
  #   session[:user_id] = user.id
  #   render json: user
  # end

  def create
    user = User.find_by(username: params[:username])
    # find a better wat to store password
    # hash256 maybe
    if user && user.password == params[:password]
      session[:user_id] = user.id
      render json: user, status: :created
    else
      render json: {
        error: 'Invalid username or password'
      },
      status: :unauthorized
    end
  end

  def destroy
    session.delete :user_id
    head :no_content
  end
end
