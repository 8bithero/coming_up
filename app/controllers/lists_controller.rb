class ListsController < ApplicationController

  def index
  @list_item = List.first
  end

  def new
    @list = List.new
  end

  def create
    @list = List.new(params[:list])

    if @list.save
      flash[:success] = "List item '#{@list.title}' added successfully."
      redirect_to '/admin/dashboard'
    else
      flash[:error] = "'Run Time' must be a whole number."
      redirect_to :controller => 'admin', :action => 'dashboard'
    end
  end

  def edit
    @list = List.find(params[:id])
  end

  def update
    @list = List.find(params[:id])

    if @list.update_attributes(params[:list])
      if @list == List.first
        @list.current_time = Time.now
        @list.end_time = Time.now.advance( :minutes => @list.run_time )
        if @list.save
          flash[:success] = "List item updated successfully."
          redirect_to :controller => 'admin', :action => 'dashboard'
        else
          render 'edit'
        end
      else
        flash[:success] = "List item updated successfully."
        redirect_to :controller => 'admin', :action => 'dashboard'
      end
    else
      render 'edit'
    end
  end

  def destroy
    @list = List.find(params[:id])
    if @list.destroy
      flash[:success] = "List item '#{@list.title}' removed."
      redirect_to :controller => 'admin', :action => 'dashboard'
    else
      flash[:error] = "The list item '#{@list.title}' could not be removed."
      redirect_to :controller => 'admin', :action => 'dashboard'
    end
  end

  def start_countdown
    if @list = List.first
      @list.current_time = Time.now
      @list.end_time = Time.now.advance( :minutes => @list.run_time )

      if @list.save
        flash[:success] = "Started: #{@list.title}"
        redirect_to :controller => 'admin', :action => 'dashboard'
      end
    else
      flash[:error] = "There is no item in the list."
      redirect_to :controller => 'admin', :action => 'dashboard'
    end
  end

  def stop_countdown
    if @list = List.first
      @list.current_time = nil
      @list.end_time = nil

      if @list.save
        flash[:success] = "Stopped: #{@list.title}"
        redirect_to :controller => 'admin', :action => 'dashboard'
      end
    
    else
      flash[:error] = "There is no item in the list."
      redirect_to :controller => 'admin', :action => 'dashboard'
    end
  end

  def next
    if @list = List.first
    #@list.update_attribute(@list.current_time, Time.now)
      start_countdown if @list.destroy
    else
      flash[:error] = "There is no item in the list."
      redirect_to :controller => 'admin', :action => 'dashboard', :template => 'admin/dashboard';
    end
  end
end
