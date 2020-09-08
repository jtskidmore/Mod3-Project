class Planet < ApplicationRecord
    has_many :player_planets
    has_many :npcs, through: :player_planets
    has_many :players, through: :player_planets
end
