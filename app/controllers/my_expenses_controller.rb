# frozen_string_literal: true

class MyExpensesController < ApplicationController
  def index
    render json: MyExpense.all
  end

  def show
    category = MyExpense.where(:user_id => [params[:id]])
    category = [
      {
        id: 1,
        title: 'All-day event',
        start: "2022-01-02"
      },
      {
        id: 2,
        title: 'Timed event',
        start: "2022-01-02" + 'T12:00:00'
      }
    ]
    render json: category
  end

end
