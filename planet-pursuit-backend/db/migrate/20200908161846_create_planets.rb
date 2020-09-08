class CreatePlanets < ActiveRecord::Migration[6.0]
  def change
    create_table :planets do |t|
      t.string :name
      t.string :environment
      t.integer :point_value

      t.timestamps
    end
  end
end
