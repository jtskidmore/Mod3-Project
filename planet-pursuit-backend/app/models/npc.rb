class Npc < ApplicationRecord
    belongs_to :type
    belongs_to :weapon 
    belongs_to :potion
    has_many :player_planets
    has_many :planets, through: :player_planets
    has_many :players, through: :player_planets
end
