class CreateLinks < ActiveRecord::Migration
  def change
    create_table :links do |t|
      t.string :uuid, index: true, null: false
      t.belongs_to :application, foreign_key: true, index: true, null: false

      t.timestamps null: false
    end
  end
end
