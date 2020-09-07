class PotionsController < ApplicationController
    def index
        potions = Potion.all 
        render :json => potions 
    end
end
