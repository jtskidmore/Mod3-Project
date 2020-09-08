class CreatePlayerPlanets < ActiveRecord::Migration[6.0]
  def change
    create_table :player_planets do |t|
      t.integer :player_id
      t.integer :npc_id
      t.integer :planet_id

      t.timestamps
    end
  end
end
