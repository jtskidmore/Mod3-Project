class PlayerPlanetsController < ApplicationController
    def index
        playerplanets = PlayerPlanet.all 
        render :json => playerplanets
    end

    def create
        render :json =>
        PlayerPlanet.create(
          player_id: params[:player_id],
          npc_id: params[:npc_id],
          planet_id: params[:planet_id]
        )
      end
end
