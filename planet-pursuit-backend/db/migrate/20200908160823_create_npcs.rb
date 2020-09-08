class CreateNpcs < ActiveRecord::Migration[6.0]
  def change
    create_table :npcs do |t|
      t.boolean :is_friendly
      t.string :name
      t.integer :type_id
      t.integer :health
      t.integer :attack
      t.integer :defense
      t.integer :weapon_id
      t.integer :potion_id

      t.timestamps
    end
  end
end
