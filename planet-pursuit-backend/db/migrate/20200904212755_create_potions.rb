class CreatePotions < ActiveRecord::Migration[6.0]
  def change
    create_table :potions do |t|
      t.string :name
      t.integer :health_points

      t.timestamps
    end
  end
end
