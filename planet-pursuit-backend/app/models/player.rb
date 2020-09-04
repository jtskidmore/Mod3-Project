class Player < ApplicationRecord
  belongs_to :type
  belongs_to :weapon
  belongs_to :potion 
end
