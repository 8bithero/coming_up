class AdminController < ApplicationController
  def dashboard
    @lists = List.all
    @list = List.new
  end

end
