class PagesController < ApplicationController
  def home
    @list_item = List.first
  end

#  def dashboard
#    @lists = List.all
#    @list = List.new
#    @the_time = Hash.new
#  end

end
