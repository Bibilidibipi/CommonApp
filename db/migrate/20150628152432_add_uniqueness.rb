class AddUniqueness < ActiveRecord::Migration
  def change
    remove_index :users, :email
    remove_index :users, :session_token
    add_index :users, :email, unique: true
    add_index :users, :session_token, unique: true
  end
end
