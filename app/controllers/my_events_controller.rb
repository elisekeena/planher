class MyEventsController < ApplicationController
    def index
        render json: MyEvent.all
    end

    
end
