class List < ActiveRecord::Base
  attr_accessible :title, :comments, :run_time
  validates_numericality_of :run_time, :only_integer => true, :message => "can only be whole number."

end
