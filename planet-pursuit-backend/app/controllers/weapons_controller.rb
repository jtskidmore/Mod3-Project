class WeaponsController < ApplicationController
    def index
        weapons = Weapon.all 
        render :json => weapons
    end
end
