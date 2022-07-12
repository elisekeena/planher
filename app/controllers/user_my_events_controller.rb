# frozen_string_literal: true

class UserMyEventsController < ApplicationController
  def show
    events = MyEvent.find(params[:id])
    render json: events
  end

  def create
    my_event = MyEvent.create!(my_events_params)
    userevent = UserMyEvent.create!(user_id: my_event.user_id, my_event_id: my_event.id)
    render json: my_event, status: :created
  end

  def update
    myevent = MyEvent.find(params[:my_event_id])
    myevent.update!(my_events_params)
    render json: myevent, status: :accepted
  end

  def destroy
    userevent = UserMyEvent.find_by(user_id: params[:user_id], my_event_id: params[:my_event_id])
    userevent&.destroy
    my_event = MyEvent.find_by(id: params[:my_event_id])
    my_event&.destroy

    head :no_content
  end

  private

  def my_events_params
    puts params.permit(:user_id, :title, :start, :end, :all_day)
    params.permit(:user_id, :title, :start, :end, :all_day)
  end
end
