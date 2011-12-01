class CreateLists < ActiveRecord::Migration
  def change
    create_table :lists do |t|
      t.string :title
      t.text :comments
      t.datetime :current_time
      t.datetime :end_time
      t.integer :run_time

      t.timestamps
    end
  end
end
