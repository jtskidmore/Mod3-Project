class NpcsController < ApplicationController
    def index
        npcs = Npc.all 
        render :json => npcs
    end
end
