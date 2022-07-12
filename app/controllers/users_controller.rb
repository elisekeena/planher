# frozen_string_literal: true

class UsersController < ApplicationController
  def show
    # puts "ran show in users controller"
    user = User.find_by(id: session[:user_id])
    if user
      render json: user
    else
      render json: { error: 'Not authorized' }, status: :unauthorized
    end
  end

  def create
    user = User.create(user_params)
    if user.valid?
      render json: user, status: :created
    else
      # puts "error in users_controller create function: user not valid"
      # byebug
      render json: {
        errors: user.errors.full_messages
      },
      status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.permit(
      :username,
      :password,
      :first_name,
      :last_name
    )
  end
end
