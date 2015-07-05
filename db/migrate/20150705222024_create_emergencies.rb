class CreateEmergencies < ActiveRecord::Migration
  def change
    create_table :emergencies do |t|
      t.string :name
      t.string :address
      t.string :relationship
      t.string :phone

      t.integer :application_id
      t.timestamps null: false
    end
  end
end
