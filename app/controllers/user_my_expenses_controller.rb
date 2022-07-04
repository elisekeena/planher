class UserMyExpensesController < ApplicationController
    def show
        expense = UserMyExpense.find(params[:id])
        render json: expense
    end

    def create
        my_expense = MyExpense.create!(my_expense_params)
        userexpense = UserMyExpense.create!(:user_id => my_expense.user_id, :my_expense_id => my_expense.id)
        render json: my_expense, status: :created
    end

    def update 
        my_expense = MyExpense.find(params[:my_expense_id])
        my_expense.update!(my_expense_params)
        render json: my_expense, status: :accepted
    end

    def destroy
        userexpense = UserMyExpense.find_by(user_id: params[:user_id], my_expense_id: params[:my_expense_id])
        if userexpense
            puts "Deleting #{userexpense}"
            userexpense.destroy
        end
        my_expense= MyExpense.find_by(id: params[:my_expense_id])
        if my_expense
            puts "Delete #{my_expense}"
            my_expense.destroy
        end

        head :no_content
    end
    
    
    private

    def my_expense_params
        params.permit(:user_id, :category, :amount, :date)
    end




end
