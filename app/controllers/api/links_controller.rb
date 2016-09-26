class Api::LinksController < ApiController
  def create

  end

  def show
    uuid = params[:id]
    if uuid.length == 36
      @link = Link.friendly.find(params[:id])
      render json: @link
    else
      raise ActiveRecord::RecordNotFound
    end
  end

  def destroy

  end
end
