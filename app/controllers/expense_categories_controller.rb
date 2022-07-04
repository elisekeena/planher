class ExpenseCategoriesController < ApplicationController

    def index
        render json: ExpenseCategory.all
    end

    def show
        category = ExpenseCategory.find(params[:id])
        render json: category
    end

    def create
        category = ExpenseCategory.create!(name: params[:name])
        render json: category, status: :created
    end

    def update 
        category = ExpenseCategory.find(params[:expense_category_id])
        category.update!(name: params[:name])
        render json: category, status: :accepted
    end


    def destroy
        category = ExpenseCategory.find_by(name: params[:name])
        if category
            category.destroy
        end
        head :no_content
    end



end
