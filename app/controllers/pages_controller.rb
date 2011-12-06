class PagesController < ApplicationController
  def home
    @list_item = List.first
    @lists = List.all
  end
end
