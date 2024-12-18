class WidgetsController < ApplicationController
  def boom_search
    data = BoomService.fetch(search_filters)
    render json: data
  end


  private

  def search_filters
    params.permit(:location, :adults)
  end
end
