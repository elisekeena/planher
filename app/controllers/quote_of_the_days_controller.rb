# frozen_string_literal: true

class QuoteOfTheDaysController < ApplicationController
    def get_quote
        # url = "https://zenquotes.io/api/random"
        # response = RestClient.get(url)


        # # response = [
        # #     {
        # #     "q": "Magic is believing in yourself, if you can do that, you can make anything happen.",
        # #     "a": "Johann Wolfgang von Goethe",
        # #     "h": "<blockquote>&ldquo;Magic is believing in yourself, if you can do that, you can make anything happen.&rdquo; &mdash; <footer>Johann Wolfgang von Goethe</footer></blockquote>"
        # #     }
        # # ]
        response = [
            {
            "q": "There's no next time. It's now or never.",
            "a": "Celestine Chua",
            "h": "<blockquote>&ldquo;Magic is believing in yourself, if you can do that, you can make anything happen.&rdquo; &mdash; <footer>Johann Wolfgang von Goethe</footer></blockquote>"
            }
        ]
        render json: response
    end

end
