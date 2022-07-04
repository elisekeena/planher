class MyExpensesController < ApplicationController
    def index
        render json: MyExpense.all
    end
    
end
