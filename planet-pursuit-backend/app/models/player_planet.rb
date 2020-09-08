class PlayerPlanet < ApplicationRecord
    belongs_to :player 
    belongs_to :planet 
    belongs_to :npc 
end
