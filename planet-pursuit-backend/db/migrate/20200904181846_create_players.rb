class CreatePlayers < ActiveRecord::Migration[6.0]
  def change
    create_table :players do |t|
      t.string :name
      t.integer :health
      t.integer :defense
      t.integer :attack
      t.integer :score
      t.integer :type_id
      t.integer :weapon_id
      t.integer :potion_id
      t.timestamps
    end
  end
end
