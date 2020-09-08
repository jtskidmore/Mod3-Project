class Player < ApplicationRecord
  belongs_to :type
  belongs_to :weapon
  belongs_to :potion 
  has_many :player_planets
  has_many :planets, through: :player_planets
  has_many :npcs, through: :player_planets
  

end
