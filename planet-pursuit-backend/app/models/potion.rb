class Potion < ApplicationRecord
  has_many :players
  has_many :npcs
end
